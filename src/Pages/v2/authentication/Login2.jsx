import React from 'react'
import { Link } from 'react-router-dom';
import './app.scss'

const Login2 = () => {
  return (
    <div className="frame">
            <div className="main">
                <div className="welcome">
                    <span> Welcome To</span>
                    <span>Prudent Pinnacle</span>
                </div>
                <div className="registration">
                    <span>Login</span>
                    <form action="" className='form'>
                        <p>User Name</p>
                        <input type="email" name="" id="email" />
                        <p>Password</p>
                        <input type="password" name="" id="password" />
                    </form>
                    <p>New User? <Link to="/v2/register">SignUp</Link></p>
                    {/* <div className='warn'>{errorMsg}</div> */}
                    <button><span>Login</span></button>
                </div>
            </div>
        </div>
  );
}

export default Login2