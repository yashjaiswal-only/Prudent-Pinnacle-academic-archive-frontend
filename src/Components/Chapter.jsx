import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getAllPaper } from '../api_calls/Papers';
import { Link  } from 'react-router-dom';

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
  justify-content: space-between;
  flex-direction: column;
  width:100%;
  padding:1rem;
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

const Chapter = () => {
  const [chapters,setChapters]=useState([]);
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const get=async()=>{
    const res=await getAllPaper(user._id,'chapter',token);
    // console.log(res)
    if(res.status===200)  setChapters(res.data);
  }
  useEffect(()=>{
    get();  //get all the chapter
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
        {chapters.map((chapter)=>
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
        )}
      </Bottom>
    </Container>
  )
}

export default Chapter
