import React from 'react'
import './app.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../../api_calls/Auth'
import { CircularProgress, Tooltip } from "@mui/material"


const Login2 = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const newlyRegister=location.state?location.state.newlyRegister:null;
    
    const handleClick= async e=>{
        e.preventDefault();
        setLoading(true)
        setError(false)
        const res=await login(dispatch,{username,password});
        console.log(res);
        if(res.status===200)  navigate('/');
        else if(res.response && res.response.status===401) setError(res.response.data) 
        else setError('Something went wrong. Unable to login..')
        setLoading(false)
    }
  return (
    <div className="frame">
            <div className="main">
                <div className="welcome">
                    <span> Welcome To</span>
                    <span>Prudent Pinnacle</span>
                </div>
                <div className="login">
                    <span>Login</span>
                    {newlyRegister && <section>You are successfully registered . Please Login to continue</section>}
                    <form action="" className='form'>
                        <p>User Name</p>
                        <input placeholder="username"  onChange={e=>setUsername(e.target.value)} />
                        <p>Password</p>
                        <input placeholder="password" onChange={e=>setPassword(e.target.value)} type='password' />
                    </form>
                    <p>New User? <Link to="/v2/register">SignUp</Link></p>
                    <div className='warn'>{error}</div>
                    <button onClick={handleClick} disabled={loading}><span>Login</span>{loading && <CircularProgress />}</button> 
                </div>
            </div>
        </div>
  );
}

export default Login2