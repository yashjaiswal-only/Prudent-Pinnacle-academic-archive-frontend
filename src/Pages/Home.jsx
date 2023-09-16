import React, { useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import {useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import Profie from '../Components/Profie';

const Wrapper=styled.div`
    width:100vw;
    height:100vh;
    position: relative;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
`

const Container=styled.div`
  margin:4rem 0 0 22%;
  height:90%;
  overflow:scroll;
  display: flex;
  flex-direction: column;
`

const Home = () => {
  const user=useSelector(state=>state.user.currentUser);
  const navigate=useNavigate();
  console.log(user);

  useEffect(()=>{
    console.log(user)
    if(user==null)  navigate('/login');
  })
  return (
    <Wrapper>
      <Navbar/>
      <Sidebar/>  
      <Container>
        {/* <Outlet/> */}
        <Profie user={user}/>

      </Container>

    </Wrapper>
  )
}

export default Home
