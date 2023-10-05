import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper=styled.div`
  background-color: #176B87;
  width:100%;
  display: flex;
  justify-content: space-around;
  img{
    width:10rem;
    height:10rem;

  }
  div{
    width:60%;
    display: flex;
    flex-direction: column; 
    font-size:1.5rem;
    align-items: flex-start;
    color:#EEEEEE;
    span{
      margin:1rem;
    }
  }
    
`
const Container=styled.div`
    display: flex;
    flex-direction: column;
` 
const Button=styled.button`
  margin:1rem;
  width:fit-content;
`
const Profie = () => {
    const user=useSelector(state=>state.user.currentUser)
    const navigate=useNavigate();
    useEffect(()=>{
      if(user===null) navigate('/login');
    },[])
  return (
    <Container>
        {user?<Wrapper>
        <img src={user.avatar}/>
            <div>
            <span>Name : {user.name}</span>
            <span>Email : {user.email}</span>
            <span>Username : {user.username}</span>
            <span>Contact No. : {user.ph}</span>
            <span>Qualification : {user.qualification}</span>
            <span>Department : {user.department}</span>
            </div>
        </Wrapper>:''}
        <Button onClick={()=>navigate('/profile/edit')}>Edit Profile</Button>
    </Container>
  )
}

export default Profie
