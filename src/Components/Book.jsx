import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getAllPaper } from '../api_calls/Papers';
import { Link  } from 'react-router-dom';
import { updateBooks } from '../redux/papersRedux';
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
const Book = () => {
  const [booksList,setBooksList]=useState([]);
  const [fetching,setFetching]=useState(false);
  const [error,setError]=useState(false);
  const {books}=useSelector(state=>state.papers)
  const user=useSelector(state=>state.user.currentUser)
  const token=useSelector(state=>state.user.token)
  const dispatch=useDispatch();

  const get=async()=>{
    setError(false);
    setFetching(true);
    const res=await getAllPaper(user._id,'book',token);
    console.log(res)
    if(res.status===200){
      dispatch(updateBooks(res.data));
      setBooksList(res.data);
    }
    else setError(true);
    setFetching(false);
  }
  useEffect(()=>{
    if(books)  setBooksList(books);
    else get();
    console.log(books)
  },[])
  return (
    <Container>
      <Top>
        <span>Books</span>
        <Link to='/book/edit' >
          <button><AddIcon/> Add New</button>
        </Link>
      </Top>
      <Bottom>
        {fetching===false?booksList.map((book)=>
          <Entry>
            <section>
            <Link to="/book/edit" state={book}>
              <EditIcon/>
            </Link>
            </section>
          <div><span>Title : </span>{book.title}</div>
          <div><span>Authors : </span>
          <ul>
            {book.authors.map((a)=><li>{`${a.first}`+" "+`${a.middle?a.middle:''}`+" "+`${a.last}`} </li>)}
          </ul>
          </div>
          
          <div><span>Publisher : </span>{book.publisher}</div>
          <div><span>Published on : </span>{book.publishedOn}</div>
          <div><span>DOI : </span>{book.doi}</div>
          <div><span>ISBN : </span>{book.isbn}</div>
          <div><span>Edition : </span>{book.edition}</div>
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

export default Book;
