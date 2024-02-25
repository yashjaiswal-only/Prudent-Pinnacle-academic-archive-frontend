import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecord, editRecord } from '../../../api_calls/Record'
import AddAuthor from './AddAuthors'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeBtp, removeConsultancy, removeMtp, removePatents, removePhd, removeProjectgrands, removeSociety, removeTalks } from '../../../redux/recordsRedux'
import MultipleSelectPlaceholder from '../../v1/DepartmentSelector'
import DatePicker from './DatePicker'
import { nationalityOptions } from '../../../data'


const EditActivities = ({ setOpenEditor, type, record, setRecord }) => {
  return (
    <div className="edit">
      <div className="wrapper">
        <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
        {type == 'Invited Talk' && <EditInvitedtalk setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
        {type == 'Society Membership' && <EditSociety setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
      </div>
    </div>
  )
}

const EditInvitedtalk = ({ record, setRecord, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [date, setDate] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [nationality, setNationality] = useState([])

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
      const record = { ...inputs, date,nationality, _id: user._id };
      console.log(record)
      res = await addRecord(record, 'talk', token);
    }
    else {
      const record = { ...inputs, date,nationality, _id: user._id, id: inputs._id };
      console.log(record)
      res = await editRecord(record, 'talk', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeTalks());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (record) {
      const { uid, date, createdAt, updatedAt,nationality, ...others } = record;
      setInputs(others);
      setDate(date);
      setNationality(nationality?nationality:'not choosen')
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record ? 'Edit Invited Talk' : 'Add Invited Talk'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title of Talk: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Talk Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>Talk Venue </span>
          <input name="venue" onChange={handleChange} type="text" placeholder="Venue" value={inputs.venue} />
        </div>
        <div className="obj">
          <span>Nationality: </span>
          <MultipleSelectPlaceholder defaultLabel='Nationality' names={nationalityOptions} department={nationality} setDepartment={setNationality} />
        </div>
        <DatePicker date={date} setDate={setDate} title="Talk Date" />
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}
const EditSociety = ({ record, setRecord, setOpenEditor }) => {
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
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
      const record={...inputs,_id:user._id};
      console.log(record)
      res=await addRecord(record,'society',token);
    }
    else{
      const record={...inputs,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'society',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeSociety());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {uid,createdAt,updatedAt,...others}=record;
      setInputs(others);
    }
  },[])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record?'Edit Society Membership':'Add Society Membership'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Society Name: </span>
          <input name="societyName" onChange={handleChange} type="text" placeholder="Society Name" value={inputs.societyName}/>
        </div>
        <div className="obj">
          <span>Duration of Membership: </span>
          <input name="duration" onChange={handleChange} type="text" placeholder="Duration" value={inputs.duration}/>
        </div>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}

export default EditActivities