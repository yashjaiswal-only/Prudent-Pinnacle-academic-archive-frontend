import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getAllPaper } from '../api_calls/Papers';
import { Link  } from 'react-router-dom';
import { updateChapters } from '../redux/papersRedux';
import Loader from './Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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
const Chapter = () => {
  const [chaptersList,setChaptersList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(false);
  const {chapters}=useSelector(state=>state.papers)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();
  const get=async()=>{
    setFetching(true);
    const res=await getAllPaper(user._id,'chapter',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateChapters(res.data));
      setChaptersList(res.data);
    }
    else setError(true);
    setFetching(false);
  }
  useEffect(()=>{
    if(chapters)  setChaptersList(chapters);
    else get();
  },[])
  return (
    <Container>
      <Top>
        <span>Book Chapter</span>
        <Link to='/chapter/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
        {fetching===false?chaptersList.map((chapter)=>
          <Entry>
            <section>
            <Link to="/chapter/edit" state={chapter}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Title : </span>{chapter.title}</div>
          <div><span>Authors : </span>
            <ul>
              {chapter.authors.map((a)=><li> {`${a.first}`+" "+`${a.last}`} </li>)}
            </ul>
          </div>
          <div><span>Editors : </span>
            <ul>
              {chapter.editors.map((a)=><li> {`${a.first}`+" "+`${a.last}`} </li>)}
            </ul>
          </div>
          <div><span>Book Title : </span>{chapter.bookTitle}</div>
          <div><span>Publisher : </span>{chapter.publisher}</div>
          <div><span>Published on : </span>{chapter.publishedOn}</div>
          <div><span>DOI : </span>{chapter.doi}</div>
          <div><span>ISBN : </span>{chapter.isbn}</div>
          <div><span>Page Range : </span>{chapter.pageRange}</div>
          </Entry>
        ):
          <Loader/>
        }
        {error?
          <Error><ReportProblemIcon/>Unable to fetch data</Error>
        :''}
      </Bottom>
    </Container>
  )
}

export default Chapter
