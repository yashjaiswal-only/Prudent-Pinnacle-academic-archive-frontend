import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../api_calls/Auth'
import { CircularProgress, Tooltip } from "@mui/material"
import { authStarts } from '../redux/userRedux'



const Container=styled.div`
  width:100vw;
  height:100vh;   
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/15372902/pexels-photo-15372902/free-photo-of-premium-computer-setup-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
    center;
  background-size:cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper=styled.div`
    padding: 20px;
    width:25%;
    min-width:15rem;
    background-color:white;
`
const New=styled.span`
  font-size: 1rem;
  color:blue;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;

`
const Form=styled.form`
    display: flex;
    flex-direction:column;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 10px 0px;
    padding: 10px;
`
const Bottom=styled.div`
  width: 100%;
  display: flex;
`
const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    margin-right:2rem;
    &:disabled{
      color:green;
      cursor:not-allowed;
    }
`
const URL=styled.a`
    margin: 10px 0px;
    font-size: 12px;
    text-decoration:underline;
    cursor:pointer;
`
const Error=styled.span`
    color:red;
`
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const {isFetching ,error} =useSelector(state=>state.user) ;

  const handleClick= async e=>{
    dispatch(authStarts());
    e.preventDefault();
    const res=await login(dispatch,{username,password});
    console.log(res);
    if(res.status)  navigate('/');
  }
  const newlyRegister=location.state?location.state.newlyRegister:null;
  return ( 
    <Container>
      <Wrapper>
            <Title >SIGN IN</Title>
            {newlyRegister && <New>You are successfully registered . Please Login to continue</New>}
            <Form>
                <Input placeholder="username"  onChange={e=>setUsername(e.target.value)}/>
                <Input placeholder="password" onChange={e=>setPassword(e.target.value)} type='password'/>
                <Bottom>
                  <Button onClick={handleClick} >LOGIN</Button>
                  {isFetching && <CircularProgress />}
                </Bottom>
                {error && <Error>Something went wrong....</Error>}
                <Link to='/register' className='link'><URL>CREATE A NEW ACCOUNT</URL></Link>
                <Tooltip title='Contact Admin'><URL>DO NOT YOU REMEMBER THE PASSWORD?</URL></Tooltip>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;
