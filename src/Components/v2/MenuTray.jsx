import React from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown'
const Container=styled.div`
    z-index:5000;
    width:100%;
    height:2.5rem;
    background-color: #e0e8fd;
    display: flex;
    align-items: center;
    color:#E77EEE;
    flex-direction:row;
    justify-content:space-around;
    /* overflow-x:scroll;
    scrollbar-width: none;
    overflow-y:visible; */
    
`
const MenuTray = () => {
  return (
    <Container>
      <Dropdown buttonHeader={"Research Papers"} dropdownList={['Books', 'Book Chapter','Jounals','Conference Papers']}/>
      <Dropdown buttonHeader={"Student Projects"} dropdownList={['M.Tech. Projects','B.Tech. Projects']}/>
      <Dropdown buttonHeader={"Phd. Scholars"} dropdownList={[]}/>
      <Dropdown buttonHeader={"Programs/Courses"} dropdownList={['Faculty Development Program','Short Term Courses']}/>
      <Dropdown buttonHeader={"Projects"} dropdownList={['Project Grants','Consultancy Projects','Patents']}/>
      <Dropdown buttonHeader={"Activities"} dropdownList={['Invited Talk','Society Membership']}/>
    </Container>
  )
}

export default MenuTray