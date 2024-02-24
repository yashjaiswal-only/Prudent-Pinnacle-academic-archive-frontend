import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecord, editRecord } from '../../../api_calls/Record'
import AddAuthor from './AddAuthors'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeBtp, removeMtp, removePhd } from '../../../redux/recordsRedux'
import MultipleSelectPlaceholder from '../../v1/DepartmentSelector'
import DatePicker from './DatePicker'


const EditStudentProject = ({setOpenEditor,type,record,setRecord}) => {
  return (
    <div className="edit">
        <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            { type=='B.Tech. Projects'&&<EditBtp  setRecord={setRecord} record={record} setOpenEditor={setOpenEditor}/>}
            { type=='M.Tech. Projects'&&<EditMtp setRecord={setRecord} record={record} setOpenEditor={setOpenEditor}/>}
            { type=='Phd.Scholars'&&<EditPhd setRecord={setRecord} record={record} setOpenEditor={setOpenEditor}/>}
        </div>
    </div>
  )
}

const EditBtp=({record,setRecord,setOpenEditor})=>{
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
  const [students,setStudents]=useState([]);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState(null);
  const [type, setType] = useState([]);

  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    //need to implement checks here
    var res={};
    setSending(true);
    setError(null);
    const {title,...rest}=inputs;
    if(record=== null){
      const record={...inputs,students,_id:user._id,type:type};
      console.log(record)
      res=await addRecord(record,'btp',token);
    }
    else{
      const record={...inputs,students,_id:user._id,type:type,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'btp',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeBtp());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {students,type,uid,createdAt,updatedAt,publishedOn,...others}=record;
      setInputs(others);
      setType(type);
      setStudents(students);
    }
  },[])

  const names = [
    'Major',
    'Minor',
  ];
    return (
        <div className="frame">
          <div className="heading">
            <h1>{record?'Edit B.Tech Project':'Add new B.Tech Project'}</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Project Title: </span>
              <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
            </div>
            <div className="obj">
              <span>Year: </span>
              <input name="year" onChange={handleChange} type="text" placeholder="Year" value={inputs.year} />
            </div>
            <div className="obj">
              <span>Project Type: </span>
              <MultipleSelectPlaceholder defaultLabel='Major/Minor' names={names} department={type} setDepartment={setType}/>
            </div>
            <AddAuthor authors={students} setAuthors={setStudents} students={true}/>
          </div>
          <button onClick={handleSubmit} disabled={sending}>Save</button>
          {error&&<div className="error"><ReportProblemIcon/>Unable to save data: {error}</div>}
        </div>
    )
}
const EditMtp=({record,setRecord,setOpenEditor})=>{
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
  const [students,setStudents]=useState([]);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState(null);
  
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    //need to implement checks here
    var res={};
    setSending(true);
    setError(null);
    if(record === null){
      const record={...inputs,student:students[0],_id:user._id};
      console.log(record)
      res=await addRecord(record,'mtp',token);
    }
    else{
      const record={...inputs,student:students[0],_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'mtp',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeMtp());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {student,uid,createdAt,updatedAt,publishedOn,...others}=record;
      setInputs(others);
      if(students)  setStudents([student]);
    }
  },[])
    return (
      <div className="frame">
      <div className="heading">
        <h1>{record? 'Edit  M.Tech Project' : 'Add new  M.Tech Project'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Name: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>Year: </span>
          <input name="year" onChange={handleChange} type="text" placeholder="Year" value={inputs.year}  />
        </div>
        <AddAuthor authors={students} setAuthors={setStudents} students={true} single={true}/>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error&&<div className="error"><ReportProblemIcon/>{error}</div>}
    </div>
    )
}

const EditPhd=({record,setRecord,setOpenEditor})=>{
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
  const [status, setStatus] = useState([]);
  const [date, setDate] = useState(null);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState(null);

  const names=[
    'Awarded','Ongoing','Submitted'
  ]
  
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async()=>{
    //need to implement checks here
    var res={};
    setSending(true);
    setError(null);

    if(record === null){
      const record={...inputs,enrolmentDate:date,status,_id:user._id};
      console.log(record)
      res=await addRecord(record,'phd',token);
    }
    else{
      const record={...inputs,enrolmentDate:date,status,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'phd',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removePhd());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {status,enrolmentDate,uid,createdAt,updatedAt,...others}=record;
      setInputs(others);
      setStatus(status);
      setDate(enrolmentDate);
    }
  },[])

    return (
      <div className="frame">
      <div className="heading">
        <h1>{record?'Edit Scholar':'Add Scholar'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Scholar Name: </span>
          <input name="scholarName" onChange={handleChange} type="text" placeholder="Scholar Name" value={inputs.scholarName} />
        </div>
        <div className="obj">
          <span>Phd Title: </span>
          <input name="phdTitle" onChange={handleChange} type="text" placeholder="PHD Title" value={inputs.phdTitle}/>
        </div>
        <div className="obj">
          <span>Status: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={names} department={status} setDepartment={setStatus}/>
        </div>
        <DatePicker  date={date} setDate={setDate} title="Enrolment Date"/>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error&&<div className="error"><ReportProblemIcon/>Unable to save data: {error}</div>}
    </div>
    )
}

export default EditStudentProject