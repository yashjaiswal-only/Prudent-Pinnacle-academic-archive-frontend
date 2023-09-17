import React from 'react'
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
    justify-content: center;
    align-items: center;
    color:#EEEEEE;
`

const Left=styled.div`

  text-shadow: 0 1px 1px #fff; 
  width:50%;
  color: #d54d7b;
  font-size: 2rem; 
  font-weight: normal;  
`
const Navbar = () => {
    
  return (
    <Container>
    <Left>Academic Archive</Left>
    
  </Container>
  )
}

export default Navbar
