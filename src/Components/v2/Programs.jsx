import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { AddCircleOutline } from '@mui/icons-material';
import EditCourses from './EditRecords/EditCourses'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecord } from '../../api_calls/Record';
import { updateFdp, updateStc } from '../../redux/recordsRedux';
import { Capitalize } from '../../services';
import EditIcon from '@mui/icons-material/Edit';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Programs = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(false);
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
            {openEditor && <EditCourses setOpenEditor={setOpenEditor} type={location.state.type} record={record} setRecord={setRecord} />}
            {location.state.type == 'Faculty Development Program' && <Fdp handleEditClick={handleEditClick} />}
            {location.state.type == 'Short Term Courses' && <Stc handleEditClick={handleEditClick} />}
        </div>
    )
}

const Fdp = ({ handleEditClick }) => {
    const [fdpList, setFdpList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { fdp } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'fdp', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateFdp(res.data));
            setFdpList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (fdp) setFdpList(fdp);
        else get();
        console.log(fdp)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Faculty Development Programs
            </div>
            {fetching === false && booksList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                fdpList.map(program => <div className="card">
                    <EditIcon onClick={() => handleEditClick(program)} />
                    <div className="obj"><span>Name : </span>{Capitalize(program.name)}</div>
                    <div className="obj"><span>Duration : </span>{Capitalize(program.duration)}</div>
                    <div className="obj"><span>Organiser : </span>{Capitalize(program.organiser)}</div>
                    <div className="obj"><span>Start Date : </span>{Capitalize(program.startDate)}</div>
                    <div className="obj"><span>End Date : </span>{Capitalize(program.endDate)}</div>
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

const Stc = ({ handleEditClick }) => {
    const [stcList, setStcList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { stc } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'stc', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateStc(res.data));
            setStcList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (stc) setStcList(stc);
        else get();
        console.log(stc)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Short Term Courses
            </div>
            {fetching === false && booksList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                stcList.map((program) =>
                    <div className='card'>
                        <EditIcon onClick={() => handleEditClick(program)} />
                        <div className="obj"><span>Name : </span>{Capitalize(program.name)}</div>
                        <div className="obj"><span>Duration : </span>{Capitalize(program.duration)}</div>
                        <div className="obj"><span>Organiser : </span>{Capitalize(program.organiser)}</div>
                        <div className="obj"><span>Start Date : </span>{Capitalize(program.startDate)}</div>
                        <div className="obj"><span>End Date : </span>{Capitalize(program.endDate)}</div>
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

export default Programs