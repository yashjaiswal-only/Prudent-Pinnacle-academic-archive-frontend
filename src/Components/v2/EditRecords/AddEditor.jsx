import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { Capitalize } from '../../../services';

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
`
const Entry=styled.div`
    display: flex;
    align-items: center;
    position: relative;

    >svg{
        cursor:pointer;
    }
    label{
        fontSize:'0.8rem'
    }
`
const Error=styled.div`
    color: red;
    font-weight: 600;
    font-size: 0.9rem;
`

const Editor=({editor,index,removeEditor,editEditor})=>{
  const [first,setFirst]=useState(editor.first);
  const [middle,setMiddle]=useState(editor.middle);
  const [last,setLast]=useState(editor.last);
  const [editing,setEditing]=useState(false);
    
  const saveEditor=()=>{
    const newVal={
        first:Capitalize(first),
        last:Capitalize(last),
        middle:Capitalize(middle),
    }
    editEditor(index,newVal);
    setEditing(false);
  }
  
  useEffect(()=>{
    if(editor){
        setFirst(editor.first)
        setMiddle(editor.middle)
        setLast(editor.last)
    }
  },[editor])
  
  return (
    <>
        {editing==false?
        <Entry>
            {index+1}.
            <Input type="text" value={first}/>
            <Input value={middle}/>
            <Input value={last}/>
            
            <Tooltip title='Edit'>
                <EditIcon  sx={{margin:'0 0.5rem'}} onClick={()=>setEditing(true)}/>
            </Tooltip>
            <Tooltip title='Delete'>
                <DeleteIcon sx={{margin:'0 0.5rem'}} onClick={()=>removeEditor(index)}/>
            </Tooltip>
        </Entry>:
        <Entry>
            {index+1}.
            <Input onChange={(e)=>setFirst(e.target.value)} type="text" 
                placeholder="First Name" value={first}/>
            <Input onChange={(e)=>setMiddle(e.target.value)} type="text" 
                placeholder="Middle Name" value={middle}/>
            <Input onChange={(e)=>setLast(e.target.value)} type="text" 
                placeholder="Last Name" value={last}/>
            <CheckCircleIcon onClick={saveEditor}/>
        </Entry>
        }
    </>
  )
}

const AddEditor = ({editors,setEditors}) => {
    const [adding,setAdding]=useState(false);
    const [first,setFirst]=useState('');
    const [middle,setMiddle]=useState('');
    const [last,setLast]=useState('');
    const [error,setError]=useState();

    const buttonClick=()=>{
        if(adding){
            if(!first || !last || first==='' || last===''){
                setError('*First Name & Last Name required')
                return ;
            }
            const newValue={
                last:Capitalize(last),
                first:Capitalize(first),
                middle:Capitalize(middle),
            }
            var temp=[...editors,newValue];
            setEditors(temp)
            setAdding(false);
            setFirst('');
            setMiddle('');
            setLast('');
        }
        else setAdding(true);
        setError(null);
    }
    
    const removeEditor=(index)=>{
        var temp=editors.slice();
        temp.splice(index,1)
        setEditors(temp);
    }

    const editEditor=(index,newValue)=>{
        if(!newValue.first || !newValue.last || newValue.first==='' || newValue.last===''){
            setError('*First Name & Last Name required')
            return ;
        }
        var temp=editors.slice();
        temp[index]=newValue;
        setEditors(temp);
    }
  return (
    <Container>
       {editors.length?'Editors :':''}
        {editors.map((e,index)=>(        
          <Editor editor={e} index={index} removeEditor={removeEditor} editEditor={editEditor}/>
        ))}

        {adding?
        <Entry>
            {editors.length+1}.
            <Input onChange={(e)=>setFirst(e.target.value)} type="text" 
                placeholder="First Name" value={first}/>
            <Input onChange={(e)=>setMiddle(e.target.value)} type="text" 
                placeholder="Middle Name (optional)" value={middle}/>
            <Input onChange={(e)=>setLast(e.target.value)} type="text" 
                placeholder="Last Name" value={last}/>
            <Tooltip title="Close">
                <CloseIcon  onClick={()=>setAdding(false)}/>
            </Tooltip>
        </Entry>
        :''}
        
        {error?<Error>{error}</Error>:''}
        <button onClick={buttonClick}>{adding?'Save Editor':'Add Editor'}</button>
    </Container>
  )
}

export default AddEditor
