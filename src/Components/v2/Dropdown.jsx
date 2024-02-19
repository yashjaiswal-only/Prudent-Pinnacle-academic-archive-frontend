import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Container=styled.span`
    height:100%;    
    position:relative;
    display:flex;
    flex-direction:column;
    button{
        border:none;
        padding: 0.5rem;
        background: inherit;
        &:focus{
            border:none;
            outline:none;
        }
    }
    ul{
        list-style: none;
        width: max-content;
        padding: unset;
        margin: unset;
        background:white;
        /* position:absolute; */
        border-radius:0 0 5% 5%;
    }
      
    li{
        transition: all linear 0.2s;
        padding: 0.2rem 0.4rem;
        font-weight: 600;
        color: #3272b1;
        border-radius: 5%;
    }
      
    li:hover {
        background: #a2b6ea;
        cursor: pointer;
        color: #000;
    }
`
const Dropdown = ({buttonHeader,dropdownList,baseUrl}) => {
    const [dropdownShow,setDropdownShow]=useState(false);
    const navigate=useNavigate();
    const handleClick=(ele)=>{
        navigate(baseUrl,{state:{type:ele}})
        setDropdownShow(false);
    }
  return (
    <Container>
        <button onMouseEnter={()=>setDropdownShow(true)} onMouseLeave={()=>setDropdownShow(false)}
        >{buttonHeader}</button>
        {dropdownShow && 
            <ul onMouseEnter={()=>setDropdownShow(true)}  onMouseLeave={()=>setDropdownShow(false)}>
                {dropdownList.map((ele)=>(
                    <li onClick={()=>handleClick(ele)}>{ele}</li>
                ))}
            </ul>
        }
    </Container>
  )
}

export default Dropdown