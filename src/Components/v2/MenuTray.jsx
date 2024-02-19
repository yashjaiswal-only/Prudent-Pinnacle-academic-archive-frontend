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
      <Dropdown baseUrl="/v2/home/research/" buttonHeader={"Research Papers"} dropdownList={['Books', 'Book Chapter','Journals','Conference Papers']}/>
      <Dropdown baseUrl="/v2/home/students" buttonHeader={"Student Projects/Scholars"} dropdownList={['M.Tech. Projects','B.Tech. Projects','Phd.Scholars']}/>
      <Dropdown baseUrl="/v2/home/programs" buttonHeader={"Programs/Courses"} dropdownList={['Faculty Development Program','Short Term Courses']}/>
      <Dropdown baseUrl="/v2/home/projects" buttonHeader={"Projects"} dropdownList={['Project Grants','Consultancy Projects','Patents']}/>
      <Dropdown baseUrl="/v2/home/activities" buttonHeader={"Activities"} dropdownList={['Invited Talk','Society Membership']}/>
    </Container>
  )
}

export default MenuTray