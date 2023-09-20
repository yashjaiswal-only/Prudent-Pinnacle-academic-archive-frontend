import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logoutSuccess } from '../redux/userRedux'

const Container=styled.div`
    position: absolute;
    height:100%;
    width: 20%;
    top:0;
    left:0;
    background-color:#176B87;
    box-sizing:border-box;
    padding:4rem 0;
    display: flex;
    flex-direction: column; 
    align-items: center;
`
const Item=styled.div`
    width:80%;
    padding:0.5rem 1rem;
    box-sizing:border-box;
    color:floralwhite;
    margin:0.5rem 1rem;
    cursor: pointer;
    border-radius:0.4rem;
    font-size:1.2rem;
    font-weight: 600;
    text-align:left;
    &:hover{
        background-color:#e1f2f7;
        color:black;
    }
    >a{
        color:inherit;
        font-weight:inherit;
    }
`
const Drop=styled.span`
  width:80%;
  padding:0rem 1rem;
  margin:0rem 1rem;
  box-sizing:border-box;
  cursor: pointer;
  border-radius:1.2rem;
  font-size:1rem;
  font-weight: 600;
  text-align:left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow:hidden;
  height:${props=>props.drop?'400px':'0'};
  transition:height 0.5s ease;
  span{
    color:floralwhite;
    width:90%;
    margin:0.5rem;
    padding:0.2rem 1rem;
    border-radius:0.4rem;
    &:hover{
        background-color:#e1f2f7;
        color:black;
    }
  }
`


const Sidebar = () => {
    const [researchDrop,setResearchDrop]=useState(1);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
      dispatch(logoutSuccess());
      navigate('/login')
    }
  return (
    <Container>
      <Item onClick={()=>navigate('/')}>
        My Profile
      </Item>
      <Item onClick={()=>setResearchDrop((prev)=>prev?false:true)}>
          Research Papers
      </Item>
      <Drop drop={researchDrop}>
          <span onClick={()=>navigate('/researchpaper/chapter')}> Book Chapters</span>
          <span onClick={()=>navigate('/researchpaper/book')}>Books</span>
          <span onClick={()=>navigate('/researchpaper/journal')}>Journal papers</span>
          <span onClick={()=>navigate('/researchpaper/conference')}>Conference papers</span>
      </Drop>
      <Item  onClick={handleLogout}> Logout </Item>
    </Container>
  )
}

export default Sidebar
