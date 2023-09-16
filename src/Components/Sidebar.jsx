import React from 'react'
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
const Item=styled.span`
    width:80%;
    padding:0.5rem 1rem;
    /* background-color: #EEEEEE; */
    color:floralwhite;
    margin:0.5rem 1rem;
    cursor: pointer;
    border-radius:1.2rem;
    font-size:1.2rem;
    font-weight: 600;
    >a{
        color:inherit;
        font-weight:inherit;
    }
`
const Sidebar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
      dispatch(logoutSuccess());
      navigate('/login')
    }
  return (
    <Container>
      <Item>
        <Link to="/">My Profile</Link>
      </Item>
      <Item>
        <Link to="/">
            Research Papers
        </Link> 
      </Item>
      <Item  onClick={handleLogout}> Logout </Item>
    </Container>
  )
}

export default Sidebar
