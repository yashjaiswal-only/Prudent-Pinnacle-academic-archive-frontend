import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddAuthor from '../AddAuthor';
import { addRecord, editRecord } from '../../api_calls/Record';
import { removeFdp, removeMtp, removeSociety, removeStc, removeTalks } from '../../redux/recordsRedux';
import DatePicker from '../DatePicker';


const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  >section{
    font-size:1.8rem;
    font-weight:600;
  }
  >div{
    display: flex;
    flex-direction: column;
    width:90%;
    >input{
      width:50%;
    }
    >section{
      display: flex;
      width:100%;
      flex-wrap:wrap;
      >span{
        background-color: powderblue;
        margin: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    max-width:40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Button=styled.button`
  margin:1rem;
  width:fit-content;
  :disabled{
    cursor: not-allowed;
  }
`
const Bottom=styled.div`
  display: flex;
  flex-direction: row!important;
  align-items: center;
`
const Error=styled.span`
  font-size:1.2rem;
  font-weight:500;
  color:red;
  display: flex;
  align-items: center;
`
const EditTalk = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  const [date,setDate]=useState(null);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState(null);

  
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    //need to implement checks here
    var res={};
    setSending(true);
    setError(null);
    if(location.state === null){
      const record={...inputs,date,_id:user._id};
      console.log(record)
      res=await addRecord(record,'talk',token);
    }
    else{
      const record={...inputs,date,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'talk',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeTalks());
      navigate('/invitedtalk')
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(location.state){
      const {uid,date,createdAt,updatedAt,...others}=location.state;
      setInputs(others);
      setDate(date);
    }
  },[])

  return (
    <Container>
      <section>{location.state?'Edit Invited Talk':'Add Invited Talk'}</section>
      <Form>
        <Input name="title" onChange={handleChange} type="text" placeholder="Talk Title" value={inputs.title}/>
        <Input name="venue" onChange={handleChange} type="text" placeholder="Venue" value={inputs.venue}/>
      </Form>
      <DatePicker  date={date} setDate={setDate} title="Talk Date"/>

      <Bottom>
        <Button onClick={handleSubmit} disabled={sending}>Save</Button> 
        {sending?<CircularProgress/>:''}
      </Bottom>
      {error?<Bottom><Error><ReportProblemIcon/>Unable to save data: {error}</Error></Bottom>:''}
    </Container>
  )
}

export default EditTalk;
