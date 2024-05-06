import React, { useEffect, useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecord, editRecord } from '../../../api_calls/Record'
import AddAuthor from './AddAuthors'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { removeBtp, removeDuty, removeExcellence, removeMaterial, removeMtp, removePhd } from '../../../redux/recordsRedux'
import MultipleSelectPlaceholder from '../../v1/DepartmentSelector'
import DatePicker from './DatePicker'
import { btpProjectType, categoryType, classesType, excellenceFields, studentProjectStatusOptions } from '../../../data'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';



const EditTeaching = ({ setOpenEditor, type, record, setRecord }) => {
    return (
        <div className="edit">
            <div className="wrapper">
                <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => { setOpenEditor(false); setRecord(null) }} />
                {type == 'Teaching Duty' && <EditTeachingDuty setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
                {type == 'Material Consulted' && <EditMaterial setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
                {type == 'Academic Excellence' && <EditExcellence setRecord={setRecord} record={record} setOpenEditor={setOpenEditor} />}
            </div>
        </div>
    )
}
const EditExcellence = ({ record, setRecord, setOpenEditor }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const token = useSelector(state => state.user.token);
    const [inputs, setInputs] = useState({});
    const [category, setCategory] = useState('Category 1');
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
            const record = { ...inputs, _id: user._id,type:category };
            console.log(record)
            if(category=='Category 1'){
                res = await addRecord(record, 'Cat1Record', token);
            }
            else res = await addRecord(record, 'Cat2Record', token);
        }
        else {
            const record = { ...inputs, _id: user._id, type:category, id: inputs._id };
            console.log(record)
            if(category=='Category 1') res = await editRecord(record, 'Cat1Record', token);
            else res = await editRecord(record, 'Cat2Record', token);
        }
        console.log(res)
        if (res.status === 200) {
            dispatch(removeExcellence());
            setRecord(null);
            setOpenEditor(false);
        }
        else setError(res.response.data.message);
        setSending(false);
    }
    useEffect(() => {
        if (record) {
            const { createdAt, updatedAt, ...others } = record;
            setInputs(others);
        }
    }, [])

    return (
        <div className="frame">
            <div className="heading">
                <h1>{record ? 'Edit Academic Excellence' : 'Add Academic Excellence'}</h1>
            </div>
            <div className="obj">
                {/* <span>Category: </span> */}
                <MultipleSelectPlaceholder defaultLabel='Choose Category' names={categoryType} department={category} setDepartment={setCategory} />
            </div>
            {
                category == 'Category 1' ?
                    <div className="field" >
                        <div className="obj1">
                            <span>{excellenceFields[0]}</span>
                            <input name="four1" onChange={handleChange} type="number" placeholder="Number of Course" value={inputs.four1} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[1]}</span>
                            <input name="four21" onChange={handleChange} type="number" placeholder="Number of Interactive Course" value={inputs.four21} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[2]}</span>
                            <input name="four22" onChange={handleChange} type="number" placeholder="Number of Learning Modules" value={inputs.four22} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[3]}</span>
                            <input name="four23" onChange={handleChange} type="number" placeholder="Number of case studies" value={inputs.four23} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[4]}</span>
                            <input name="four3" onChange={handleChange} type="number" placeholder="Number of Software used" value={inputs.four3} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[5]}</span>
                            <input name="four4" onChange={handleChange} type="number" placeholder="Number of activities" value={inputs.four4} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[6]}</span>
                            <input name="four5" onChange={handleChange} type="number" placeholder="Number of activities" value={inputs.four5} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[7]}</span>
                            <input name="four6" onChange={handleChange} type="number" placeholder="Number of activities" value={inputs.four6} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[8]}</span>
                            <input name="four7" onChange={handleChange} type="number" placeholder="Number of activities" value={inputs.four7} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[9]}</span>
                            <input name="five1" onChange={handleChange} type="number" placeholder="Number of points" value={inputs.five1} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[10]}</span>
                            <input name="five2" onChange={handleChange} type="number" placeholder="Number of points" value={inputs.five2} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[11]}</span>
                            <input name="five3" onChange={handleChange} type="number" placeholder="Number of points" value={inputs.five3} />
                        </div>
                    </div> :
                    <div className="field" >
                        <div className="obj1">
                            <span>{excellenceFields[12]}</span>
                            <input name="cat21" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat21} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[13]}</span>
                            <input name="cat22" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat22} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[14]}</span>
                            <input name="cat23" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat23} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[15]}</span>
                            <input name="cat24" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat24} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[16]}</span>
                            <input name="cat25" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat25} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[17]}</span>
                            <input name="cat26" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat26} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[18]}</span>
                            <input name="cat27" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat27} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[19]}</span>
                            <input name="cat28" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat28} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[20]}</span>
                            <input name="cat29" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat29} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[21]}</span>
                            <input name="cat210" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat210} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[22]}</span>
                            <input name="cat211" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat211} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[23]}</span>
                            <input name="cat212" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat212} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[24]}</span>
                            <input name="cat213" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat213} />
                        </div>
                        <div className="obj1">
                            <span>{excellenceFields[25]}</span>
                            <input name="cat214" onChange={handleChange} type="number" placeholder="Number of Points (max 10)" value={inputs.cat214} />
                        </div>
                    </div>
            }
            <button onClick={handleSubmit} disabled={sending}>Save</button>
            {error && <div className="error"><ReportProblemIcon />Unable to save data: {error}</div>}
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