import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { checkUser, updateUser } from '../../api_calls/Auth'
import { updateCurrentUser } from '../../redux/userRedux'
import MultipleSelectPlaceholder from './DepartmentSelector'
import { departmentNames } from '../../data'
import { CircularProgress } from '@mui/material'
const Container=styled.div`
  display: flex;
  flex-direction: column;
`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
    flex-direction: column;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    /* margin: 20px 10px 0px 0px; */
    padding: 10px;
`
const Button=styled.button`
  margin:1rem;
  width:fit-content;
  width:20%;
  border:none;
  padding: 15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
`
const Entry=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin:0.5rem 0;  
  span{
    font-weight: 700;
    font-size: 0.8rem;
  }
`
const Bottom=styled.div`
  width: 100%;
  display: flex; 
  align-items: center;
`
const Error=styled.span`
  color:red;
`
const EditProfile = () => {
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const [department,setDepartment]=useState(user.department);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
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
    setLoading(true);
    const res=await updateUser({...inputs,_id:user._id,department},token);
    if(res.status===200){
      const res2=await checkUser(user.username);  //to get the new details
      console.log(res2)
      if(res2.status===200){
        dispatch(updateCurrentUser(res2.data))
        navigate('/')
      }
      else setError('Something went wrong, Unable to update...')
    }
    else setError('Something went wrong, Unable to update...')
    setLoading(false);
  }
  return (
    <Container>
      <Form>
        <Entry>
          <span>Name</span>
          <Input name="name" onChange={handleChange} type="text" placeholder="Full name" value={inputs.name}/>
        </Entry>
        <Entry>
          <span>Email</span>
          <Input name="email" onChange={handleChange} type="email" placeholder="Email" value={inputs.email}/>
        </Entry>
        <Entry>
          <span>Contact</span>
          <Input name="ph" onChange={handleChange} type="text" placeholder="contact number" value={inputs.ph}/>
        </Entry>
        <Entry>
          <span>Qualification</span>
          <Input name="qualification" onChange={handleChange} type="text" placeholder="qualification" value={inputs.qualification}/>
        </Entry>
        <Entry>
          <span>Department</span>
          <MultipleSelectPlaceholder names={departmentNames} defaultLabel='Department' department={department} setDepartment={setDepartment}/>
        </Entry>
      </Form>

      <Bottom>
        <Button onClick={handleSubmit} disabled={loading}>Save</Button>
        {loading && <CircularProgress/>}
      </Bottom> 
      {error && <Error>{error}</Error>}
    </Container>
  )
}

export default EditProfile
