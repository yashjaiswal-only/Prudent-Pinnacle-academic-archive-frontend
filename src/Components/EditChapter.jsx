import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  useDispatch, useSelector } from 'react-redux'
import { addPaper, editPaper } from '../api_calls/Papers';
import { useLocation, useNavigate } from 'react-router-dom'
import { removeChapters } from '../redux/papersRedux';
import { CircularProgress } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DatePicker from './DatePicker';
import AddAuthor from './AddAuthor';
import AddEditor from './AddEditor';


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
const EditChapter = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  const [authors,setAuthors]=useState([]);
  const [editors,setEditors]=useState([]);
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
    //title lowercase me to enhance search
    if(location.state === null){
      const paper={...rest,title:title.toLowerCase(),authors,editors,_id:user._id,publishedOn:date};
      console.log(paper)
      res=await addPaper(paper,'chapter',token);
    }
    else{
      const paper={...rest,title:title.toLowerCase(),authors,editors,_id:user._id,pid:inputs._id,publishedOn:date};
      console.log(paper)
      res=await editPaper(paper,'chapter',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeChapters());
      navigate('/researchpaper/chapter')
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(location.state){
      const {authors,editors,uid,createdAt,updatedAt,publishedOn,...others}=location.state;
      setDate(publishedOn);
      setInputs(others);
      setAuthors(authors);
      setEditors(editors);
    }
  },[])

  return (
    <Container>
      <section>{location.state?'Edit Book Chapter':'Add new book chapter'}</section>
      <Form>
        <Input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title}/>
        <Input name="bookTitle" onChange={handleChange} type="text" placeholder="Book Title" value={inputs.bookTitle}/>        
        <Input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi}/>
        <Input name="publisher" onChange={handleChange} type="text" placeholder="Publisher" value={inputs.publisher}/>
        <Input name="isbn" onChange={handleChange} type="text" placeholder="ISBN" value={inputs.isbn}/>
        <Input name="pageRange" onChange={handleChange} type="text" placeholder="Page Range" value={inputs.pageRange}/>
      </Form>
      <DatePicker  date={date} setDate={setDate} title="Publication Date"/>

      <AddAuthor authors={authors} setAuthors={setAuthors} />

      <AddEditor editors={editors}  setEditors={setEditors} />

      <Bottom>
        <Button onClick={handleSubmit} disabled={sending}>Save</Button> 
        {sending?<CircularProgress/>:''}
      </Bottom>
      {error?<Bottom><Error><ReportProblemIcon/>Unable to save data : {error}</Error></Bottom>:''}
    </Container>
  )
}

export default EditChapter;
