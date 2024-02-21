import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { AddCircleOutline } from '@mui/icons-material';
import EditCourses from './EditRecords/EditCourses'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecord } from '../../api_calls/Record';
import { updateFdp, updateStc } from '../../redux/recordsRedux';
import { Capitalize } from '../../services';

const Programs = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(false);
    return (
        <div className="page">
            <div className="icon">
                <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
            </div>
            {openEditor && <EditCourses setOpenEditor={setOpenEditor} type={location.state.type} />}
            {location.state.type == 'Faculty Development Program' && <Fdp />}
            {location.state.type == 'Short Term Courses' && <Stc />}
        </div>
    )
}

const Fdp = () => {
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
            {
                fdpList.map(program => <div className="card">
                    <div className="obj"><span>Name : </span>{Capitalize(program.name)}</div>
                    <div className="obj"><span>Duration : </span>{Capitalize(program.duration)}</div>
                    <div className="obj"><span>Organiser : </span>{Capitalize(program.organiser)}</div>
                    <div className="obj"><span>Start Date : </span>{Capitalize(program.startDate)}</div>
                    <div className="obj"><span>End Date : </span>{Capitalize(program.endDate)}</div>
                </div>)
            }
        </div>
    )
}

const Stc = () => {
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
            {
                stcList.map((program) =>
                    <div className='card'>
                        <div className="obj"><span>Name : </span>{Capitalize(program.name)}</div>
                        <div className="obj"><span>Duration : </span>{Capitalize(program.duration)}</div>
                        <div className="obj"><span>Organiser : </span>{Capitalize(program.organiser)}</div>
                        <div className="obj"><span>Start Date : </span>{Capitalize(program.startDate)}</div>
                        <div className="obj"><span>End Date : </span>{Capitalize(program.endDate)}</div>
                    </div>)
            }
        </div>
    )
}

export default Programs