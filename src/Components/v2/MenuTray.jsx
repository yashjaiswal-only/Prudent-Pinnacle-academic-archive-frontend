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
      <Dropdown baseUrl="/research" buttonHeader={"Research Papers"} dropdownList={['Books', 'Book Chapter','Journals','Conference Papers']}/>
      <Dropdown baseUrl="/students" buttonHeader={"Student Projects/Scholars"} dropdownList={['M.Tech. Projects','B.Tech. Projects','Phd.Scholars']}/>
      <Dropdown baseUrl="/programs" buttonHeader={"Programs/Courses"} dropdownList={['Faculty Development Program','Short Term Courses']}/>
      <Dropdown baseUrl="/projects" buttonHeader={"Projects"} dropdownList={['Project Grants','Consultancy Projects','Patents']}/>
      <Dropdown baseUrl="/activities" buttonHeader={"Activities"} dropdownList={['Invited Talk','Society Membership']}/>
      <Dropdown baseUrl="/teaching" buttonHeader={"Events and resources"} dropdownList={['Teaching Duty','Material Consulted','Academic Excellence']}/>
    </Container>
  )
}

export default MenuTray
