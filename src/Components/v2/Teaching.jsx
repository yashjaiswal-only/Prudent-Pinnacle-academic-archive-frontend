import { AddCircleOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import EditTeaching from './EditRecords/EditTeaching';
import { getAllRecord } from '../../api_calls/Record';
import { updateDuty, updateMaterial } from '../../redux/recordsRedux';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EditIcon from '@mui/icons-material/Edit';
import { Capitalize } from '../../services';

const Teaching = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(1);
    const [record, setRecord] = useState(null)
    const handleEditClick = (s) => {
        setRecord(s);
        setOpenEditor(true);
    }
    return (
        <div className="page">
            <div className="icon">
                <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
            </div>
            {openEditor && <EditTeaching setOpenEditor={setOpenEditor} type={location.state.type} record={record} setRecord={setRecord} />}
            {location.state.type == 'Teaching Duty' && <TeachingDuty handleEditClick={handleEditClick} />}
            {location.state.type == 'Material Consulted' && <Material handleEditClick={handleEditClick} />}
            {location.state.type == 'Academic Excellence' && <Excellence handleEditClick={handleEditClick} />}
        </div>
    )
}

const TeachingDuty = ({ handleEditClick }) => {
    const [dutyList, setDutyList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { duty } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'teachingduty', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateDuty(res.data));
            setDutyList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (duty) setDutyList(duty);
        else get();
        console.log(duty)
    }, [duty])
    return (
        <div className="slide">
            <div className="heading">
                Teaching Duty
            </div>
            {fetching === false && dutyList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your duties'} />
                : ''}
            {fetching === false ?
                dutyList.map(project => <div className="card">
                    <EditIcon onClick={() => handleEditClick(project)} />
                    <div className="obj">
                        <span>Academic Year: </span>{Capitalize(project.year)}
                    </div>
                    <div className="obj">
                        <span>Class : </span>{project.classes}
                    </div>
                    <div className="obj">
                        <span>Courses(July-Dec): </span>{Capitalize(project.courses1)}
                    </div>
                    <div className="obj">
                        <span>Mode of Teaching(July-Dec): </span>{Capitalize(project.mode1)}
                    </div>
                    <div className="obj">
                        <span>Alloted Hours(July-Dec): </span>{Capitalize(project.hours1)}
                    </div>
                    <div className="obj">
                        <span>Courses(Jan-May): </span>{Capitalize(project.courses2)}
                    </div>
                    <div className="obj">
                        <span>Mode of Teaching(Jan-May): </span>{Capitalize(project.mode2)}
                    </div>
                    <div className="obj">
                        <span>Alloted Hours(Jan-May): </span>{Capitalize(project.hours2)}
                    </div>
                    <div className="obj">
                        <span>Percentages of classes taken: </span>{Capitalize(project.taken)}
                    </div>
                    <div className="obj">
                        <span>Excess Teaching Hours: </span>{Capitalize(project.excessHours)}
                    </div>
                </div>)
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}

const Material = ({ handleEditClick }) => {
    const [materialList, setMaterialList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { material } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'material', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateMaterial(res.data));
            setMaterialList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (material) setMaterialList(material);
        else get();
        console.log(material)
    }, [material])
    return (
        <div className="slide">
            <div className="heading">
                Material Consulted
            </div>
            {fetching === false && materialList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your duties'} />
                : ''}
            {fetching === false ?
                materialList.map(project => <div className="card">
                    <EditIcon onClick={() => handleEditClick(project)} />
                    <div className="obj">
                        <span>Class : </span>{project.classes}
                    </div>
                    <div className="obj">
                        <span>Course/Paper: </span>{Capitalize(project.course)}
                    </div>
                    <div className="obj">
                        <span>Consulted Material: </span>{Capitalize(project.consulted)}
                    </div>
                    <div className="obj">
                        <span>Prescribed Material: </span>{Capitalize(project.prescribed)}
                    </div>
                    <div className="obj">
                        <span>Additional Resource provided: </span>{Capitalize(project.additional)}
                    </div>
                </div>)
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}

const Excellence = ({ handleEditClick }) => {
    const [materialList, setMaterialList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { material } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'material', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateMaterial(res.data));
            setMaterialList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        // if (material) setMaterialList(material);
        // else get();
        // console.log(material)
    }, [material])
    return (
        <div className="slide">
            <div className="heading">
                Academic Excellence.
            </div>
            {fetching === false && materialList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your duties'} />
                : ''}
            {fetching === false ?
                materialList.map(project => <div className="card">
                    <EditIcon onClick={() => handleEditClick(project)} />
                    <div className="obj">
                        <span>Class : </span>{project.classes}
                    </div>
                    <div className="obj">
                        <span>Course/Paper: </span>{Capitalize(project.course)}
                    </div>
                    <div className="obj">
                        <span>Consulted Material: </span>{Capitalize(project.consulted)}
                    </div>
                    <div className="obj">
                        <span>Prescribed Material: </span>{Capitalize(project.prescribed)}
                    </div>
                    <div className="obj">
                        <span>Additional Resource provided: </span>{Capitalize(project.additional)}
                    </div>
                </div>)
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}

export default Teaching