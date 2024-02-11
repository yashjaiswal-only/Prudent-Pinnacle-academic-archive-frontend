import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Topbar from '../../../Components/v2/Topbar'
import MenuTray from '../../../Components/v2/MenuTray'
const Wrapper=styled.div`
    width:100vw;
    height:100vh;
    position: relative;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
`
const Home2 = () => {
  return (
    <Wrapper>
      <Topbar/>
      <MenuTray/>
      <Outlet/>
    </Wrapper>
  )
}

export default Home2