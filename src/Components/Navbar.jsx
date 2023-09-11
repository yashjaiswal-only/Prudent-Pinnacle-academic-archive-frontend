import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Container=styled.div`
    position: absolute;
    top:0;
    left:0;
    z-index:1000;
    width:100%;
    height:3rem;
    background-color: #053B50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#EEEEEE;
    font-family: "Great Vibes", cursive; 
`
const Right=styled.div`
  width:60%;
  >ul{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
    li{
      cursor: pointer;
      color:white;
    }
  }
`
const Left=styled.div`

  text-shadow: 0 1px 1px #fff; 
  width:30%;
  color: #d54d7b;
  font-size: 2rem; 
  font-weight: normal;  
`
const Navbar = () => {
    
  return (
    <Container>
    <Left>Academic Archive</Left>
    <Right>
      <ul>
        <Link to="/">
            <li>My Profile</li>
        </Link>
        <Link to="/papers">
            <li>My Papers</li>
        </Link>
      </ul>
    </Right>
  </Container>
  )
}

export default Navbar
