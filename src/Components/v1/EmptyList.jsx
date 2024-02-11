import React from 'react'
import styled from 'styled-components'
import nothing from '../../images/nothing.png'

const Container=styled.div`
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    font-size: 2.5rem;
    font-weight: 700;
    justify-content: space-around;
    >img{
        height:80vh;
        width:60%;
    }
`
const EmptyList = ({qoute}) => {
  return (
    <Container>
      <img src={nothing} alt="an image" />
      {qoute}
    </Container>
  )
}

export default EmptyList
