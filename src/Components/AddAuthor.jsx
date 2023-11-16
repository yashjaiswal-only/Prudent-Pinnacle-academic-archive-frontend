import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { Capitalize } from '../services';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight:700;
    >button{
        width:fit-content;
        padding: 0.2rem 0.4rem;
        margin: 1rem 0;
    }
`
const Input=styled.input`
    flex:1;
    min-width:20%;
    max-width:20%;
    margin: 5px 10px;
    padding: 10px;
    pointer-events:${(props)=>props.disabled?'none':null};
    background-color:white;
`
const Entry=styled.div`
    display: flex;
    align-items: center;
    >svg{
        cursor:pointer;
    }
    label{
        fontSize:'0.8rem'
    }
    #corresponding{
        margin:0 0.5rem 0 2rem;
        cursor: pointer;
    }
`
const Error=styled.div`
    color: red;
    font-weight: 600;
    font-size: 0.9rem;
`

const Author=({author,index,removeAuthor,editAuthor,students,setError})=>{
  const [first,setFirst]=useState(author.first);
  const [middle,setMiddle]=useState(author.middle);
  const [last,setLast]=useState(author.last);
  const [rollno,setRollno]=useState(author.rollno);
  const [corresponding,setCorresponding]=useState(author.corresponding);
  const [editing,setEditing]=useState(false);
    
  const saveAuthor=()=>{
    setError(null)
    console.log(rollno)
    if(!first || !last || first==='' || last===''){
        setError('*First Name & Last Name required')
        return ;
    }
    if(students && (!rollno || rollno==='')){
        setError('*Roll No required')
        return ;
    }
    const newVal={
        first:Capitalize(first),
        last:Capitalize(last),
        middle:Capitalize(middle),
        rollno:rollno,
        corresponding:corresponding
    }
    editAuthor(index,newVal);
    setEditing(false);
  }
  
  useEffect(()=>{
    if(author){
        setFirst(author.first)
        setMiddle(author.middle)
        setLast(author.last)
        setRollno(author.rollno)
    }
  },[author])
  return (
    <>
      {editing==false?
        <Entry>
            {index+1}.
            <Input type="text" value={first} placeholder='First Name' disabled/>
            {!students&&<Input value={middle} placeholder='Middle Name' disabled/>}
            <Input value={last} placeholder='Last Name' disabled/>
            {students&&<Input value={rollno} placeholder='Roll No' disabled />}
            <Tooltip title='Corresponding Author'>
                {corresponding?<PersonIcon sx={{color:'#8787d8',marginRight:'2rem'}}/>:''}
            </Tooltip>
            <Tooltip title='Edit'>
                <EditIcon  sx={{margin:'0 0.5rem'}} onClick={()=>setEditing(true)}/>
            </Tooltip>
            <Tooltip title='Delete'>
                <DeleteIcon sx={{margin:'0 0.5rem'}} onClick={()=>removeAuthor(index)}/>
            </Tooltip>
        </Entry>:
        <>
          <Entry>
              {index+1}.
              <Input onChange={(e)=>setFirst(e.target.value)} type="text" 
                  placeholder="First Name" value={first}/>
              {students===false?<Input onChange={(e)=>setMiddle(e.target.value)} type="text" 
                  placeholder="Middle Name" value={middle}/>:''}
              <Input onChange={(e)=>setLast(e.target.value)} type="text" 
                  placeholder="Last Name" value={last}/>
            {students&&<Input onChange={(e)=>setRollno(e.target.value)} type="text" 
            placeholder="Roll No." value={rollno}/>}
              <CheckCircleIcon onClick={saveAuthor}/>
          </Entry>
          {students===false?<Entry>
              <input id="corresponding" type="checkbox" checked={corresponding} onChange={()=>setCorresponding(prev=>prev?false:true)}/>   
              <label htmlFor="corresponding"> Corresponding Author</label>
          </Entry>:''}
        </>
        }
    </>
  )
}

const AddAuthor = ({authors,setAuthors,students,single}) => {
    const [adding,setAdding]=useState(false);
    const [first,setFirst]=useState('');
    const [title,setTitle]=useState(students?'Student':'Author');
    const [middle,setMiddle]=useState('');
    const [last,setLast]=useState('');
    const [rollno,setRollno]=useState('');
    const [error,setError]=useState(null);
    const [corresponding,setCorresponding]=useState(false);
    
    const buttonClick=()=>{
        if(adding){
            if(!first || !last || first==='' || last===''){
                setError('*First Name & Last Name required')
                return ;
            }
            if(students && rollno===''){
                setError('*Roll No required')
                return ;
            }
            const newValue={
                last:Capitalize(last),
                first:Capitalize(first),
                middle:Capitalize(middle),
                rollno:rollno,
                corresponding:corresponding
            }
            var temp=[...authors,newValue];
            setAuthors(temp)
            setAdding(false);
            setFirst('');
            setMiddle('');
            setLast('');
            setCorresponding(false);
        }
        else setAdding(true);
        setError(null);
    }
    
    const removeAuthor=(index)=>{
        var temp=authors.slice();
        temp.splice(index,1)
        setAuthors(temp);
    }

    const editAuthor=(index,newValue)=>{
        setError(null)
        if(!newValue.first || !newValue.last || newValue.first==='' || newValue.last===''){
            setError('*First Name & Last Name required')
            return ;
        }
        if(students && newValue.rollno===''){
            setError('*Roll No required')
            return ;
        }
        var temp=authors.slice();
        temp[index]=newValue;
        setAuthors(temp);
    }
  return (
    <Container>
       {authors.length?`${title}s :`:''}
        {authors.map((a,index)=>(        
          <Author author={a} index={index} removeAuthor={removeAuthor} editAuthor={editAuthor} students={students} setError={setError}/>
        ))}

        {adding?
        <>
        <Entry>
            {authors.length+1}.
            <Input onChange={(e)=>setFirst(e.target.value)} type="text" 
                placeholder="First Name" value={first}/>
            {!students&&<Input onChange={(e)=>setMiddle(e.target.value)} type="text" 
                placeholder="Middle Name (optional)" value={middle}/>}
            <Input onChange={(e)=>setLast(e.target.value)} type="text" 
                placeholder="Last Name" value={last}/>
            {students&&<Input onChange={(e)=>setRollno(e.target.value)} type="text" 
                placeholder="Roll No." value={rollno}/>}
            <Tooltip title="Close">
                <CloseIcon  onClick={()=>setAdding(false)}/>
            </Tooltip>
        </Entry>
        {students===false?<Entry>
            <input id="corresponding" type="checkbox" checked={corresponding} onChange={()=>setCorresponding(prev=>prev?false:true)}/>   
            <label htmlFor="corresponding"> Corresponding Author</label>
        </Entry>:''}
        </>
        :''}
        
        {error?<Error>{error}</Error>:''}
        <button disabled={single&&authors.length} onClick={buttonClick} >{adding?`Save ${title}`:`Add ${title}`}</button>
    </Container>
  )
}

export default AddAuthor;
