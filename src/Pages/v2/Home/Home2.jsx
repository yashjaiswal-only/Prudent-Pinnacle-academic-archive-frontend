import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Topbar from '../../../Components/v2/Topbar'
import MenuTray from '../../../Components/v2/MenuTray'
import { useSelector } from 'react-redux'
const Wrapper=styled.div`
    width:100%;
    height:100vh;
    position: relative;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
`
const Home2 = () => {
  const user=useSelector(state=>state.user.currentUser)
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null) navigate('/login');
  },[])
  return (
    <Wrapper>
      <Topbar/>
      <MenuTray/>
      <Outlet/>
    </Wrapper>
  )
}

export default Home2