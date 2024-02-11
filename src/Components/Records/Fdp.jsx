import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Link  } from 'react-router-dom';
import Loader from '../v1/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Capitalize } from '../../services';
import { updateBtp, updateFdp, updateMtp } from '../../redux/recordsRedux';
import { getAllRecord } from '../../api_calls/Record';
import EmptyList from '../v1/EmptyList';

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
const Fdp = () => {
  const [fdpList,setFdpList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(null);
  const {fdp}=useSelector(state=>state.records)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();

  const get=async()=>{
    setError(false);
    setFetching(true);
    const res=await getAllRecord(user._id,'fdp',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateFdp(res.data));
      setFdpList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(()=>{
    if(fdp)  setFdpList(fdp);
    else get();
    console.log(fdp)
  },[])
  return (
    <Container>
      <Top>
        <span>Faculty Development Programs</span>
        <Link to='/facultydevelopmentprogram/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
      {fetching===false&&fdpList.length===0?
        <EmptyList qoute={'Nothing to show here. Please add your attended Faculty Development Programs'}/>
        :''}
        {fetching===false?
        fdpList.map((program)=>
          <Entry>
            <section>
            <Link to="/facultydevelopmentprogram/edit" state={program}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Name : </span>{Capitalize(program.name)}</div>
          <div><span>Duration : </span>{Capitalize(program.duration)}</div>
          <div><span>Organiser : </span>{Capitalize(program.organiser)}</div>
          <div><span>Start Date : </span>{Capitalize(program.startDate)}</div>
          <div><span>End Date : </span>{Capitalize(program.endDate)}</div>
          
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

export default Fdp;
