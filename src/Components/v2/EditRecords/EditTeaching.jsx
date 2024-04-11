import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecord, editRecord } from '../../../api_calls/Record'
import AddAuthor from './AddAuthors'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeBtp, removeDuty, removeMaterial, removeMtp, removePhd } from '../../../redux/recordsRedux'
import MultipleSelectPlaceholder from '../../v1/DepartmentSelector'
import DatePicker from './DatePicker'
import { btpProjectType, classesType, studentProjectStatusOptions } from '../../../data'


const EditTeaching = ({ setOpenEditor, type, record, setRecord }) => {
    return (
        <div className="edit">
            <div className="wrapper">
                <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => { setOpenEditor(false); setRecord(null) }} />
                {type == 'Teaching Duty' && <EditTeachingDuty setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
                {type == 'Material Consulted' && <EditMaterial setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
            </div>
        </div>
    )
}

const EditTeachingDuty = ({ record, setRecord, setOpenEditor }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const token = useSelector(state => state.user.token);
    const [inputs, setInputs] = useState({});
    const [students, setStudents] = useState([]);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState([]);

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
            const record = { ...inputs, _id: user._id, classes: type };
            console.log(record)
            res = await addRecord(record, 'teachingduty', token);
        }
        else {
            const record = { ...inputs, _id: user._id, classes: type, id: inputs._id };
            console.log(record)
            res = await editRecord(record, 'teachingduty', token);
        }
        console.log(res)
        if (res.status === 200) {
            dispatch(removeDuty());
            setRecord(null);
            setOpenEditor(false);
        }
        else setError(res.response.data.message);
        setSending(false);
    }
    useEffect(() => {
        if (record) {
            const { classes, uid, createdAt, updatedAt, ...others } = record;
            setInputs(others);
            setType(classes);
        }
    }, [])

    return (
        <div className="frame">
            <div className="heading">
                <h1>{record ? 'Edit Teaching Duty' : 'Add Teaching Duty'}</h1>
            </div>
            <div className="field">
                <div className="obj">
                    <span>Academic Year: </span>
                    <input name="year" onChange={handleChange} type="text" placeholder="YYYY-YYYY" value={inputs.year} />
                </div>
                <div className="obj">
                    <span>Class: </span>
                    <MultipleSelectPlaceholder defaultLabel='Class' names={classesType} department={type} setDepartment={setType} />
                </div>
                <div className="obj">
                    <span>Courses(July-Dec): </span>
                    <input name="courses1" onChange={handleChange} type="text" placeholder="Courses of odd semester" value={inputs.courses1} />
                </div>
                <div className="obj">
                    <span>Mode of Teaching(July-Dec): </span>
                    <input name="mode1" onChange={handleChange} type="text" placeholder="xL-yT-zP" value={inputs.mode1} />
                </div>
                <div className="obj">
                    <span>Alloted Hours(July-Dec): </span>
                    <input name="hours1" onChange={handleChange} type="text" placeholder="Alloted Hours for odd semester" value={inputs.hours1} />
                </div>
                <div className="obj">
                    <span>Courses(Jan-May): </span>
                    <input name="courses2" onChange={handleChange} type="text" placeholder="Courses of even semester" value={inputs.courses2} />
                </div>
                <div className="obj">
                    <span>Mode of Teaching(Jan-May): </span>
                    <input name="mode2" onChange={handleChange} type="text" placeholder="xL-yT-zP" value={inputs.mode2} />
                </div>
                <div className="obj">
                    <span>Alloted Hours(Jan-May): </span>
                    <input name="hours2" onChange={handleChange} type="text" placeholder="Alloted Hours for even semester" value={inputs.hours2} />
                </div>
                <div className="obj">
                    <span>Percentages of classes taken: </span>
                    <input name="taken" onChange={handleChange} type="text" placeholder="Percentage of classes taken" value={inputs.taken} />
                </div>
                <div className="obj">
                    <span>Excess Teaching Hours: </span>
                    <input name="excessHours" onChange={handleChange} type="text" placeholder="Excess Teaching Hours" value={inputs.excessHours} />
                </div>
            </div>
            <button onClick={handleSubmit} disabled={sending}>Save</button>
            {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
        </div>
    )
}
const EditMaterial = ({ record, setRecord, setOpenEditor }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const token = useSelector(state => state.user.token);
    const [inputs, setInputs] = useState({});
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState([]);

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
            const record = { ...inputs, _id: user._id, classes: type };
            console.log(record)
            res = await addRecord(record, 'material', token);
        }
        else {
            const record = { ...inputs, _id: user._id, classes: type, id: inputs._id };
            console.log(record)
            res = await editRecord(record, 'material', token);
        }
        console.log(res)
        if (res.status === 200) {
            dispatch(removeMaterial());
            setRecord(null);
            setOpenEditor(false);
        }
        else setError(res.response.data.message);
        setSending(false);
    }
    useEffect(() => {
        if (record) {
            const { classes, uid, createdAt, updatedAt, ...others } = record;
            setInputs(others);
            setType(classes);
        }
    }, [])

    return (
        <div className="frame">
            <div className="heading">
                <h1>{record ? 'Edit Material Consulted' : 'Add Material Consulted'}</h1>
            </div>
            <div className="field">
                <div className="obj">
                    <span>Class: </span>
                    <MultipleSelectPlaceholder defaultLabel='Class' names={classesType} department={type} setDepartment={setType} />
                </div>
                <div className="obj">
                    <span>Course/Paper</span>
                    <input name="course" onChange={handleChange} type="text" placeholder="Course/Paper" value={inputs.course} />
                </div>
                <div className="obj">
                    <span>Consulted Material: </span>
                    <input name="consulted" onChange={handleChange} type="text" placeholder="Consulted Material" value={inputs.consulted} />
                </div>
                <div className="obj">
                    <span>Prescribed Material: </span>
                    <input name="prescribed" onChange={handleChange} type="text" placeholder="Prescribed Material" value={inputs.prescribed} />
                </div>
                <div className="obj">
                    <span>Additional Resource provided: </span>
                    <input name="additional" onChange={handleChange} type="text" placeholder="Additional Resource provided" value={inputs.additional} />
                </div>
            </div>
            <button onClick={handleSubmit} disabled={sending}>Save</button>
            {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
        </div>
    )
}
export default EditTeaching