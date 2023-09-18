import React from 'react'
import Navbar from '../Components/Navbar'
import styled from 'styled-components'
const Wrapper=styled.div`
    width:100vw;
    height:100vh;
    position: relative;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const MyPapers = () => {
  return (
    <Wrapper>
        <Navbar/>
        <Sidebar/>
        my research papers
    </Wrapper>
  )
}

export default MyPapers
