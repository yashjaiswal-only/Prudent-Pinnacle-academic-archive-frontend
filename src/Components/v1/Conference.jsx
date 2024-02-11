import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getAllPaper } from '../../api_calls/Papers';
import { Link  } from 'react-router-dom';
import { updateConferences, updateJournals } from '../../redux/papersRedux';
import Loader from './Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import { Capitalize } from '../../services';
import EmptyList from './EmptyList';

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
  justify-content: center;
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
const Conference = () => {
  const [conferencesList,setConferencesList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(null);
  const {conferences}=useSelector(state=>state.papers)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();

  const get=async()=>{
    setError(false);
    setFetching(true);
    const res=await getAllPaper(user._id,'conference',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateConferences(res.data));
      setConferencesList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(()=>{
    if(conferences)  setConferencesList(conferences);
    else get();
    console.log(conferences)
  },[])
  return (
    <Container>
      <Top>
        <span>Conferences</span>
        <Link to='/conference/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
      {fetching===false&&conferencesList.length===0?
        <EmptyList qoute={'Nothing to show here. Please add your Conference Papers'}/>
        :''}
        {fetching===false?conferencesList.map((conference)=>
          <Entry>
            <section>
            <Link to="/conference/edit" state={conference}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Title : </span>{Capitalize(conference.title)}</div>
          <div><span>Authors : </span>
            <ul>
              {conference.authors.map((a)=>
              <li>
                {`${a.first}`+" "+`${a.middle?a.middle:''}`+" "+`${a.last}`} 
                {a.corresponding?<PersonIcon sx={{color:'#8787d8'}}/>:''}
              </li>)}
            </ul>
          </div>
          
          <div><span>Conference Title : </span>{conference.conferenceTitle}</div>
          <div><span>Conference Date : </span>{conference.conferenceDate}</div>
          <div><span>Published on : </span>{conference.publishedOn}</div>
          <div><span>Publisher : </span>{conference.publisher}</div>
          <div><span>DOI : </span>{conference.doi}</div>
          <div><span>ISBN : </span>{conference.isbn}</div>
          <div><span>Location : </span>{conference.location}</div>
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

export default Conference;
