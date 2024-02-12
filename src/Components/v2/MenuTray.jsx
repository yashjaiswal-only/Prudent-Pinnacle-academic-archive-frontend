import React from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown'
const Container=styled.div`
    z-index:1000;
    width:100%;
    height:2.5rem;
    background-color: #e0e8fd;
    display: flex;
    align-items: center;
    color:#E77EEE;
    flex-direction:row;
    justify-content:space-around;

`
const MenuTray = () => {
  return (
    <Container>
      <Dropdown buttonHeader={"Research Papers"} dropdownList={['Books', 'Book Chapter','Jounals','Conference Papers']}/>
      <Dropdown buttonHeader={"Student Projects"} dropdownList={['M.Tech. Projects','B.Tech. Projects']}/>
      <Dropdown buttonHeader={"Activities"} dropdownList={[]}/>
    </Container>
  )
}

export default MenuTray