import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Link  } from 'react-router-dom';
import Loader from '../Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Capitalize } from '../../services';
import { updateTalks } from '../../redux/recordsRedux';
import { getAllRecord } from '../../api_calls/Record';
import EmptyList from '../EmptyList'

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const Top=styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  span{
    font-size:1.8rem;
    font-weight:600;
  }
  button{
    margin:0 1rem;
    display: flex;
    align-items: center;  
    font-size:1.2rem;
    color:floralwhite;
    background-color: #269660;
  }
`
const Bottom=styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  width:100%;
  padding:1rem;
  min-height:60vh;
`
const Entry=styled.div`
  background-color: #fff;
  margin:0.5rem;
  width:90%;
  padding:1rem;
  -webkit-box-shadow: 0px 0px 10px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  border-radius:10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size:1.2rem;
  position: relative;
  >section{
    position: absolute;
    top:0.5rem;
    right:0.5rem;
    cursor: pointer;
    border-radius:50%;
  }
  span{
    font-weight:600;
    margin:0 0.5rem;
  }
  div{
    display: flex;
    ul{
      margin:0 1.5rem;
      text-align:left;
      li{
        display: flex;
        align-items: center;
      }
    }
  }
`
const Error=styled.span`
  font-size:1.2rem;
  font-weight:500;
  color:red;
  display: flex;
  align-items: center;
`
const Talk = () => {
  const [talkList,setTalkList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(null);
  const {talks}=useSelector(state=>state.records)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();

  const get=async()=>{
    setError(false);
    setFetching(true);
    const res=await getAllRecord(user._id,'talk',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateTalks(res.data));
      setTalkList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(()=>{
    if(talks)  setTalkList(talks);
    else get();
    console.log(talks)
  },[])
  return (
    <Container>
      <Top>
        <span>Invited Talk</span>
        <Link to='/invitedtalk/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
      {fetching===false&&talkList.length===0?
        <EmptyList qoute={'Nothing to show here. Please add your Invited Talks'}/>
        :''}
        {fetching===false?
        talkList.map((talk)=>
          <Entry>
            <section>
            <Link to="/invitedtalk/edit" state={talk}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Title : </span>{Capitalize(talk.title)}</div>
          <div><span>Venue : </span>{Capitalize(talk.venue)}</div>
          <div><span>Date : </span>{Capitalize(talk.date)}</div>
          </Entry>
        ):
          <Loader/>
        }
        {error?
          <Error><ReportProblemIcon/>Unable to fetch data:{error}</Error>
        :''}
      </Bottom>
    </Container>
  )
}

export default Talk;
