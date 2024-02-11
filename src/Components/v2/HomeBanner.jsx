import React from 'react'
import styled from 'styled-components'
const Container=styled.div`
    width:100%;
    height:100vh;
    background-color: #113B50;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-style: oblique;
    font-family: math;
    color: thistle;
`
const HomeBanner = () => {

  return (
    <Container>
      Welcome to Prudent Pinnacle
    </Container>
  )
}

export default HomeBanner