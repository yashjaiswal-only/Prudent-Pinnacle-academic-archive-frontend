import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  useDispatch, useSelector } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import { addPaper, editPaper } from '../api_calls/Papers';
import { useLocation, useNavigate } from 'react-router-dom'
import {  removeJournals } from '../redux/papersRedux';
import { CircularProgress } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddAuthor from './AddAuthor';
import DatePicker from './DatePicker';



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
const EditJournal = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  const [authors,setAuthors]=useState([]);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState(null);
  const [date, setDate] = useState(null);

  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    //need to implement checks here
    var res={};
    setError(null);
    setSending(true);
    const {title,...rest}=inputs;
    if(location.state === null){
      const paper={...rest,title:title.toLowerCase(),authors,_id:user._id,publishedOn:date};
      console.log(paper)
      res=await addPaper(paper,'journal',token);
    }
    else{
      const paper={...rest,title:title.toLowerCase(),authors,_id:user._id,pid:inputs._id,publishedOn:date};
      console.log(paper)
      res=await editPaper(paper,'journal',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeJournals());
      navigate('/researchpaper/journal')
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(location.state){
      const {authors,uid,createdAt,updatedAt,publishedOn,...others}=location.state;
      setDate(publishedOn);
      setInputs(others);
      setAuthors(authors);
    }
  },[])

  return (
    <Container>
      <section>{location.state?'Edit Journal':'Add new Journal'}</section>
      <Form>
        <Input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title}/>
        <Input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi}/>
        <Input name="journalTitle" onChange={handleChange} type="text" placeholder="Journal Title" value={inputs.journalTitle}/>
        <Input name="issn" onChange={handleChange} type="text" placeholder="ISSN" value={inputs.issn}/>
        <Input name="volume" onChange={handleChange} type="text" placeholder="Volume" value={inputs.volume}/>
        <Input name="issue" onChange={handleChange} type="text" placeholder="Issue" value={inputs.issue}/>
        <Input name="pageRange" onChange={handleChange} type="text" placeholder="Page Range" value={inputs.pageRange}/>
      </Form>
      <DatePicker  date={date} setDate={setDate} title="Publication Date"/>

      <AddAuthor authors={authors} setAuthors={setAuthors} />

      <Bottom>
        <Button onClick={handleSubmit} disabled={sending}>Save</Button> 
        {sending?<CircularProgress/>:''}
      </Bottom>
      {error?<Bottom><Error><ReportProblemIcon/>Unable to save data :{error}</Error></Bottom>:''}
    </Container>
  )
}

export default EditJournal;
