import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Link  } from 'react-router-dom';
import Loader from '../Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Capitalize } from '../../services';
import { updateBtp, updateConsultancy, updateFdp, updateMtp, updatePatents, updatePhd, updateProjectgrands, updateStc } from '../../redux/recordsRedux';
import { getAllRecord } from '../../api_calls/Record';

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
const Consultancy = () => {
  const [projectList,setProjectList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(null);
  const {consultancy}=useSelector(state=>state.records)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();

  const get=async()=>{
    setError(false);
    setFetching(true);
    const res=await getAllRecord(user._id,'consultancy',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateConsultancy(res.data));
      setProjectList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(()=>{
    if(consultancy)  setProjectList(consultancy);
    else get();
    console.log(consultancy)
  },[])
  return (
    <Container>
      <Top>
        <span>Consultancy Projects</span>
        <Link to='/consultancy/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
        {fetching===false?
        projectList.map((scholars)=>
          <Entry>
            <section>
            <Link to="/consultancy/edit" state={scholars}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Project Title : </span>{Capitalize(scholars.title)}</div>
          <div><span>Awarding Agency : </span>{Capitalize(scholars.awardingAgency)}</div>
          <div><span>Project Cost : </span>{Capitalize(scholars.cost)}</div>
          <div><span>Status : </span>{Capitalize(scholars.status)}</div>
          
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

export default Consultancy;
