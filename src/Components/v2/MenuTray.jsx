import React from 'react'
import styled from 'styled-components'
const Container=styled.div`
    position: absolute;
    top:3rem;
    left:0;
    z-index:1000;
    width:100%;
    height:3rem;
    background-color: #053B11;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#E77EEE;
`
const MenuTray = () => {
  return (
    <Container>Topbar</Container>
  )
}

export default MenuTray