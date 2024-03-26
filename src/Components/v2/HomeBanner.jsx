import React from 'react'
import styled from 'styled-components'
const Container=styled.div`
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    font-size: 3rem;
    font-style: oblique;
    font-family: math;
    font-weight:800;
    color:#352c84;
    background: linear-gradient(45deg, rgba(61,88,230,1) 0%, rgba(111,179,228,1) 33%);
    span{
      font-size: 2rem;
      font-weight:900;
    }
`
const HomeBanner = () => {
  return (
    <Container>
      Welcome to Prudent Pinnacle
      <span>Apex of Scholarly Prudence</span>
      <span style={{fontSize:'1.5rem'}}>- an academic archive</span>
    </Container>
  )
}

export default HomeBanner