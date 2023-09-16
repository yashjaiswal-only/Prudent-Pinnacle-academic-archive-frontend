import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container=styled.div`
  display: flex;
  flex-direction: column;
`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Button=styled.button`
  margin:1rem;
  width:fit-content;
`
const EditProfile = () => {
  const [inputs,setInputs]=useState({});
  const user=useSelector(state=>state.user.currentUser)
  const navigate=useNavigate();
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=()=>{
    navigate('/')
  }
  return (
    <Container>
      <Form>
        <Input name="name" onChange={handleChange} type="text" placeholder="Full name" value={user.name}/>
        <Input name="email" onChange={handleChange} type="email" placeholder="Email" value={user.email}/>
        <Input name="ph" onChange={handleChange} type="text" placeholder="contact number" value={user.ph}/>
        <Input name="qualification" onChange={handleChange} type="text" placeholder="qualification" value={user.qualification}/>
      </Form>
        <Button onClick={handleSubmit}>Save</Button>
    </Container>
  )
}

export default EditProfile
