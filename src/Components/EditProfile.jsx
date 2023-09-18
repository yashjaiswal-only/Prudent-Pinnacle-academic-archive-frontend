import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { checkUser, updateUser } from '../api_calls/Auth'
import { updateCurrentUser } from '../redux/userRedux'
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
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const [inputs,setInputs]=useState({
    name:user.name,
    email:user.email,
    address:user.address,
    ph:user.ph,
    qualification:user.qualification
  });
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    // console.log(inputs)
    const res=await updateUser({...inputs,_id:user._id},token);
    if(res.status===200){
      const res2=await checkUser(user.username);
      console.log(res2)
      if(res2.status===200){
        dispatch(updateCurrentUser(res2.data))
        navigate('/')
      }
    }
  }
  return (
    <Container>
      <Form>
        <Input name="name" onChange={handleChange} type="text" placeholder="Full name" value={inputs.name}/>
        <Input name="email" onChange={handleChange} type="email" placeholder="Email" value={inputs.email}/>
        <Input name="address" onChange={handleChange} type="text" placeholder="Address" value={inputs.address}/>
        <Input name="ph" onChange={handleChange} type="text" placeholder="contact number" value={inputs.ph}/>
        <Input name="qualification" onChange={handleChange} type="text" placeholder="qualification" value={inputs.qualification}/>
      </Form>
        <Button onClick={handleSubmit}>Save</Button>
    </Container>
  )
}

export default EditProfile
