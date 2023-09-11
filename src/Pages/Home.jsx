import React, { useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import {useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Wrapper=styled.div`
    width:100vw;
    height:100vh;
    position: relative;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Profile=styled.div`
  /* margin:5rem auto; */
  background-color: #176B87;
    width:80%;
  display: flex;
  justify-content: space-around;
  img{
    width:30%;
  } 
  div{
    width:50%;
    display: flex;
    flex-direction: column; 
    font-size:1.5rem;
    align-items: flex-start;
    color:#EEEEEE;
    font-family: "Great Vibes", cursive; 
    span{
      margin:1rem;
    }
  }
    
` 
const Home = () => {
  const user=useSelector(state=>state.user.currentUser);
  const navigate=useNavigate();
  console.log(user);

  useEffect(()=>{
    if(user==null)  navigate('/login');
  })
  return (
    <Wrapper>
      <Navbar/>
      <Profile>
        <img src={user.avatar}/>
        <div>
          <span>Name : {user.name}</span>
          <span>Email : {user.email}</span>
          <span>Username : {user.username}</span>
          <span>Contact No. : {user.ph}</span>
          <span>qualification : {user.qualification}</span>
        </div>
      </Profile>

    </Wrapper>
  )
}

export default Home
