import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, editRecord } from '../../../api_calls/Record'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeConsultancy, removePatents, removeProjectgrands } from '../../../redux/recordsRedux'
import MultipleSelectPlaceholder from '../../v1/DepartmentSelector'
import { patentGrantedOptions, projectStatusOptions } from '../../../data'

const EditProjects = ({ setOpenEditor, type, record, setRecord }) => {
  return (
    <div className="edit">
      <div className="wrapper">
        <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => {setOpenEditor(false); setRecord(null)}} />
        {type == 'Project Grants' && <EditGrants setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
        {type == 'Consultancy Projects' && <EditConsultancy setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
        {type == 'Patents' && <EditPatents setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
      </div>
    </div>
  )
}

const EditGrants = ({ record, setRecord, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [patent, setPatent] = useState([]);
  const [status, setStatus] = useState([]);
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
      const record = { ...inputs, status,patent, _id: user._id };
      console.log(record)
      res = await addRecord(record, 'project', token);
    }
    else {
      const record = { ...inputs, status,patent, _id: user._id, id: inputs._id };
      console.log(record)
      res = await editRecord(record, 'project', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeProjectgrands());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (record) {
      const { uid, status, createdAt, updatedAt,patent, ...others } = record;
      setInputs(others);
      setStatus(status?status:"Not Choosen")
      setPatent(patent?patent:'Not Choosen')
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record ? 'Edit Project' : 'Add Project'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Project Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Project Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>Awarding Agency: </span>
          <input name="awardingAgency" onChange={handleChange} type="text" placeholder="Awarding Agency" value={inputs.awardingAgency} />
        </div>
        <div className="obj">
          <span>Project Cost: </span>
          <input name="cost" onChange={handleChange} type="text" placeholder="Project Cost" value={inputs.cost} />
        </div>
        <div className="obj">
          <span>Project Duration: </span>
          <input name="duration" onChange={handleChange} type="text" placeholder="Project duration" value={inputs.duration} />
        </div>
        <div className="obj">
          <span>Project Status: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={projectStatusOptions} department={status} setDepartment={setStatus} />
        </div>
        <div className="obj">
          <span>Patent Granted: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={patentGrantedOptions} department={patent} setDepartment={setPatent} />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}

const EditConsultancy = ({ record, setRecord, setOpenEditor }) => {
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.currentUser);
  const token=useSelector(state=>state.user.token);
  const [inputs,setInputs]=useState({});
  const [patent, setPatent] = useState([]);
  const [status, setStatus] = useState([]);
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
      const record={...inputs,status,patent,_id:user._id};
      console.log(record)
      res=await addRecord(record,'consultancy',token);
    }
    else{
      const record={...inputs,status,patent,_id:user._id,id:inputs._id};
      console.log(record)
      res=await editRecord(record,'consultancy',token);
    }
    console.log(res)
    if(res.status===200){
      dispatch(removeConsultancy());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(()=>{
    if(record){
      const {uid,status,createdAt,updatedAt,patent,...others}=record;
      setInputs(others);
      setStatus(status)
      setStatus(status?status:"Not Choosen")
      setPatent(patent?patent:'Not Choosen')
    }
  },[])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record?'Edit Consultancy Project':'Add Consultancy Project'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Project Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Project Title" value={inputs.title}/>
        </div>
        <div className="obj">
          <span>Awarding Agency: </span>
          <input name="awardingAgency" onChange={handleChange} type="text" placeholder="Awarding Agency" value={inputs.awardingAgency}/>
        </div>
        <div className="obj">
          <span>Project Cost: </span>
          <input name="cost" onChange={handleChange} type="text" placeholder="Project Cost" value={inputs.cost}/>
        </div>
        <div className="obj">
          <span>Project Duration: </span>
          <input name="duration" onChange={handleChange} type="text" placeholder="Project duration" value={inputs.duration} />
        </div>
        <div className="obj">
          <span>Project Status: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={projectStatusOptions} department={status} setDepartment={setStatus} />
        </div>
        <div className="obj">
          <span>Patent Granted: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={patentGrantedOptions} department={patent} setDepartment={setPatent} />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}

const EditPatents = ({ record, setRecord, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const names = [
    'Granted', 'Published', 'Submitted'
  ]

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
      const record = { ...inputs, status, _id: user._id };
      console.log(record)
      res = await addRecord(record, 'patent', token);
    }
    else {
      const record = { ...inputs, status, _id: user._id, id: inputs._id };
      console.log(record)
      res = await editRecord(record, 'patent', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removePatents());
      setRecord(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (record) {
      const { status, uid, createdAt, updatedAt, ...others } = record;
      setInputs(others);
      setStatus(status);
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{record ? 'Edit Patent' : 'Add Patent'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span> Name of Patent: </span>
          <input name="name" onChange={handleChange} type="text" placeholder="Name" value={inputs.name} />
        </div>
        <div className="obj">
          <span>Country: </span>
          <input name="country" onChange={handleChange} type="text" placeholder="Country" value={inputs.country} />
        </div>
        <div className="obj">
          <span>Year: </span>
          <input name="year" onChange={handleChange} type="text" placeholder="Year" value={inputs.year} />
        </div>
        <div className="obj">
          <span>Award Number: </span>
          <input name="awardNo" onChange={handleChange} type="text" placeholder="Award Number" value={inputs.awardNo} />
        </div>
        <div className="obj">
          <span>Status: </span>
          <MultipleSelectPlaceholder defaultLabel='Status' names={names} department={status} setDepartment={setStatus} />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
    </div>
  )
}

export default EditProjects