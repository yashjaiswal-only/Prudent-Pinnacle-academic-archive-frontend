import { useState } from 'react'
import styled from 'styled-components'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";
import { register, checkUser } from '../api_calls/Auth';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import MultipleSelectPlaceholder from '../Components/DepartmentSelector.jsx';


const Container=styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80")
      center;
      background-size:cover;
        display: flex;
        align-items: center;
        justify-content: center;
`
const Wrapper=styled.div`
    padding: 20px;
    width:50%;
    background-color:white;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;

`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement=styled.span`
    font-size: 12px;
    margin: 10px 0px;
`
const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
`
const Box=styled.div`
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  width:70%;
  justify-content: space-around;
`
const Error=styled.span`
    color:red;
  `
const Bottom=styled.div`
  width: 100%;
  display: flex; 
`
const Register = () => {
    const [inputs,setInputs]=useState({});
    const [department,setDepartment]=useState('');
    const [file,setFile]=useState(null);
    const [hasUsername,setHasUsername]=useState(false);
    const [Required,setRequired]=useState(false);
    const [checking,setChecking]=useState(false);
    const {isFetching ,error,currentUser} =useSelector(state=>state.user) ;
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handleChange=e=>{
      setInputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }
    
    const handleClick=async e=>{
      e.preventDefault();
      // setChecking(true);
      setRequired(false);
      setHasUsername(false);
      if(!inputs.username || !inputs.password){
        setRequired(true);
        setChecking(false);
        return ;
      }
      else setRequired(false);

      const a=await checkUser(inputs.username) 
      console.log(a);
      if(a.status===200 && a.data.found===0) setHasUsername(false);
      else{
        setHasUsername(true);
        setChecking(false);
        return ;
      }
      console.log('registering')

      if(file){
        const fileName=new Date().getTime()+file?file.name:'';  
        //to make file unique as when any file with same name upload later its gonna overwrite because of same name
        const storage=getStorage(app);
        const storageRef=ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('uploading')
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const user = { ...inputs, avatar: downloadURL};
              console.log(downloadURL)
              console.log(user);
              console.log('registering')
              setChecking(false);
              // const res=register(dispatch,user);
              // if(res)navigate('/login',{state:{newlyRegister:true}});
            });
          }
        );
        console.log('section')
      }
      else{
        const user={...inputs,department};
        console.log(user)
        setChecking(false);
        const res=register(dispatch,user);
        if(res)navigate('/login',{state:{newlyRegister:true}});
      }

    }
    const names = [
      'Computer Science',
      'Information Technology',
      'Electronics',
      'Electrical',
      'Mechanical',
    ];
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input name="name" onChange={handleChange} type="text" placeholder="Full name"/>
                <Input name="email" onChange={handleChange} type="email" placeholder="Email"/>
                <Input name="username" onChange={handleChange} type="text" placeholder="username"/>
                <Input name="password" onChange={handleChange} type="password" placeholder="password"/>
                <Input name="ph" onChange={handleChange} type="text" placeholder="contact number (optional)"/>
                <Input name="qualification" onChange={handleChange} type="text" placeholder="qualification (optional) "/>
                <MultipleSelectPlaceholder names={names} defaultLabel='Department' department={department} setDepartment={setDepartment}/>
                <Box>
                  <label htmlFor="avatar" style={{marginRight:"10px",marginBottom:"10px"}}>YOUR IMAGE:</label>
                  <input name="avatar" id='avatar' onChange={e=>setFile(e.target.files[0])} type="file" />
                </Box>
                <Agreement>
                    By creating an account , I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Bottom>
                  <Button onClick={handleClick} disabled={(isFetching || checking)}>CREATE</Button>
                  {(isFetching || checking) && <CircularProgress/>}
                </Bottom>
                {error && <Error>Something went wrong....</Error>}
                {hasUsername && <Error>Username already exist</Error>}
                {Required && <Error>Username & password are required</Error>}
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register
