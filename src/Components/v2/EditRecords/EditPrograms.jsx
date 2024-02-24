import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, editRecord } from '../../../api_calls/Record'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeFdp,removeStc } from '../../../redux/recordsRedux'
import DatePicker from './DatePicker'

const EditPrograms = ({ setOpenEditor, type, record, setRecord }) => {
  return (
    <div className="edit">
      <div className="wrapper">
        <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
        {type == 'Faculty Development Program' && <EditFdp setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
        {type == 'Short Term Courses' && <EditStc setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
      </div>
    </div>
  )
}

const EditFdp = ({ record, setRecord, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    //need to implement checks here
    var res = {};
    setSending(true);
    setError(null);
    if (record === null) {
      const record = { ...inputs, startDate, endDate, _id: user._id };
      console.log(record)
      res = await addRecord(record, 'fdp', token);
    }
    else {
      const record = { ...inputs, _id: user._id, id: inputs._id };
      console.log(record)
      res = await editRecord(record, 'fdp', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeFdp());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (record) {
      const { startDate, endDate, uid, createdAt, updatedAt, ...others } = record;
      setInputs(others);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record ? 'Edit Faculty Developement Program' : 'Add Faculty Developement Program'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Name of Program: </span>
          <input name="name" onChange={handleChange} type="text" placeholder="Name" value={inputs.name} />
        </div>
        <div className="obj">
          <span>Duration of Program: </span>
          <input name="organiser" onChange={handleChange} type="text" placeholder="Organiser" value={inputs.organiser} />
        </div>
        <DatePicker date={startDate} setDate={setStartDate} title="Start Date" />
        <DatePicker date={endDate} setDate={setEndDate} title="End Date" />
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}

const EditStc = ({ record, setRecord, setOpenEditor }) => {
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
      const record={...inputs,startDate,endDate,_id:user._id};
      console.log(record)
      res=await addRecord(record,'stc',token);
    }
    else{
      const record={...inputs,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'stc',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeStc());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {startDate,endDate,uid,createdAt,updatedAt,...others}=record;
      setInputs(others);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  },[])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record?'Edit Short Term Courses':'Add Short Term Courses'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Name of Course</span>
          <input name="name" onChange={handleChange} type="text" placeholder="Name" value={inputs.name}/>
        </div>
        <div className="obj">
          <span>Duration of Course</span>
          <input name="duration" onChange={handleChange} type="text" placeholder="Duration" value={inputs.duration}/>
        </div>
        <div className="obj">
          <span>Organiser of Course</span>
          <input name="organiser" onChange={handleChange} type="text" placeholder="Organiser" value={inputs.organiser}/>
        </div>
        <DatePicker  date={startDate} setDate={setStartDate} title="Start Date"/>
        <DatePicker  date={endDate} setDate={setEndDate} title="End Date"/>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error?<Bottom><Error><ReportProblemIcon/>Unable to save data: {error}</Error></Bottom>:''}
    </div>
  )
}


export default EditPrograms