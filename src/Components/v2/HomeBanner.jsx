import React from 'react'
import styled from 'styled-components'
const Container=styled.div`
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-style: oblique;
    font-family: math;
    color: thistle;
    background: linear-gradient(45deg, rgba(61,88,230,1) 0%, rgba(111,179,228,1) 33%);
`
const HomeBanner = () => {

  return (
    <Container>
      Welcome to Prudent Pinnacle
    </Container>
  )
}

export default HomeBanner