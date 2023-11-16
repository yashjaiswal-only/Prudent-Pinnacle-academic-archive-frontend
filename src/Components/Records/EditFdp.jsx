import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddAuthor from '../AddAuthor';
import { addRecord, editRecord } from '../../api_calls/Record';
import { removeFdp, removeMtp } from '../../redux/recordsRedux';
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
    width:100%;
    flex-direction: column;
`
const Input=styled.input`
    flex:1;
    width:100%;
    padding: 10px;
`
const Entry=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width:max-content;
  min-width:40%;
  max-width:40%;
  margin: 0.5rem;
  span{
    font-weight: 700;
    font-size: 0.8rem;
  }
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

const EditFdp = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
      const record={...inputs,startDate,endDate,_id:user._id};
      console.log(record)
      res=await addRecord(record,'fdp',token);
    }
    else{
      const record={...inputs,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'fdp',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeFdp());
      navigate('/facultydevelopmentprogram')
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(location.state){
      const {startDate,endDate,uid,createdAt,updatedAt,...others}=location.state;
      setInputs(others);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  },[])

  return (
    <Container>
      <section>{location.state?'Edit Faculty Developement Program':'Add Faculty Developement Program'}</section>
      <Form>
        <Entry>
          <span>Name of Program</span>
          <Input name="name" onChange={handleChange} type="text" placeholder="Name" value={inputs.name}/>
        </Entry>
        <Entry>
          <span>Duration of Program</span>
          <Input name="duration" onChange={handleChange} type="text" placeholder="Duration" value={inputs.duration}/>
        </Entry>
        <Entry>
          <span>Organizer of Program</span>
          <Input name="organiser" onChange={handleChange} type="text" placeholder="Organiser" value={inputs.organiser}/>
        </Entry>
      </Form>
      <DatePicker  date={startDate} setDate={setStartDate} title="Start Date"/>
      <DatePicker  date={endDate} setDate={setEndDate} title="End Date"/>

      <Bottom>
        <Button onClick={handleSubmit} disabled={sending}>Save</Button> 
        {sending?<CircularProgress/>:''}
      </Bottom>
      {error?<Bottom><Error><ReportProblemIcon/>Unable to save data: {error}</Error></Bottom>:''}
    </Container>
  )
}

export default EditFdp;
