import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import AddIcon from '@mui/icons-material/Add';
import { getAllPaper } from '../api_calls/Papers';
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
  width:100%;
  padding:1rem;
`
const Entry=styled.div`
  background-color: #fff;
  width:90%;
  padding:1rem;
  -webkit-box-shadow: 0px 0px 10px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  border-radius:10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size:1.2rem;
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
  const [chapters,setChapters]=useState([{
    uid:"64fd711a0604578415de9b4d",
    title:"Why aren't we using 3d user interfaces, and will we ever?",
    authors:[
        {
            first:"Raman",
            last:"Balakrishnan"
        },
        {
            first:"Ramon",
            last:"Brown"
        }
    ],
    editors:[
        {
            first:"Raman",
            last:"Balakrishnan"
        },
        {
            first:"Ramon",
            last:"Brown"
        }
    ],
    bookTitle:"IEEE Symposium on 3D User Interfaces",
    publishedOn:"2006, March 25-26",
    doi:"https://doi.org/10.1109/VR.2006.148",
    publisher:"IEEE",
    isbn:"1-4244-0225-5",
    pageRange:"(22-25)"
  }]);
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
        <button><AddIcon/> Add New</button>
      </Top>
      <Bottom>
        {chapters.map((chapter)=>
          <Entry>
          <div><span>Title : </span>{chapter.title}</div>
          <div><span>Authors : </span>
            <ul>
              {chapter.authors.map((a)=><li> {`${a.first}`+" "+`${a.last}`} </li>)}
            </ul>
          </div>
          <div><span>Editors : </span>
            <ul>
              {chapter.authors.map((a)=><li> {`${a.first}`+" "+`${a.last}`} </li>)}
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
