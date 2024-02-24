import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { AddCircleOutline } from '@mui/icons-material';
import EditProjects from './EditRecords/EditProjects';
import { getAllRecord } from '../../api_calls/Record';
import { updateConsultancy, updatePatents, updateProjectgrands } from '../../redux/recordsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { Capitalize } from '../../services';
import EditIcon from '@mui/icons-material/Edit';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Projects = () => {
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
            {openEditor && <EditProjects setOpenEditor={setOpenEditor} type={location.state.type} record={record} setRecord={setRecord} />}
            {location.state.type == 'Project Grants' && <Grants handleEditClick={handleEditClick} />}
            {location.state.type == 'Consultancy Projects' && <Consultancy handleEditClick={handleEditClick} />}
            {location.state.type == 'Patents' && <Patents handleEditClick={handleEditClick} />}
        </div>
    )
}
const Grants = ({ handleEditClick }) => {
    const [projectList, setProjectList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { projectgrands } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'project', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateProjectgrands(res.data));
            setProjectList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (projectgrands) setProjectList(projectgrands);
        else get();
        console.log(projectgrands)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Project Grants
            </div>
            {fetching === false && projectList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                projectList.map((record) =>
                    <div className="card">
                        <EditIcon onClick={() => handleEditClick(record)} />
                        <div><span>Project Title : </span>{Capitalize(record.title)}</div>
                        <div><span>Awarding Agency : </span>{Capitalize(record.awardingAgency)}</div>
                        <div><span>Project Cost : </span>{Capitalize(record.cost)}</div>
                        <div><span>Status : </span>{Capitalize(record.status)}</div>

                    </div>
                )
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
const Consultancy = ({ handleEditClick }) => {
    const [projectList, setProjectList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { consultancy } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'consultancy', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateConsultancy(res.data));
            setProjectList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (consultancy) setProjectList(consultancy);
        else get();
        console.log(consultancy)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Consultancy Projects
            </div>
            {fetching === false && projectList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                projectList.map((record) =>
                    <div className="card">
                        <EditIcon onClick={() => handleEditClick(record)} />
                        <div className='obj'><span>Project Title : </span>{Capitalize(record.title)}</div>
                        <div className='obj'><span>Awarding Agency : </span>{Capitalize(record.awardingAgency)}</div>
                        <div className='obj'><span>Project Cost : </span>{Capitalize(record.cost)}</div>
                        <div className='obj'><span>Status : </span>{Capitalize(record.status)}</div>

                    </div>
                )
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
const Patents = ({ handleEditClick }) => {
    const [patentsList, setPatentsList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { patents } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllRecord(user._id, 'patent', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updatePatents(res.data));
            setPatentsList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (patents) setPatentsList(patents);
        else get();
        console.log(patents)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Patents
            </div>
            {fetching === false && patentsList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                patentsList.map((patent) =>
                    <div className='card'>
                        <EditIcon onClick={() => handleEditClick(patent)} />
                        <div className="obj"><span>Name : </span>{Capitalize(patent.name)}</div>
                        <div className="obj"><span>Country : </span>{Capitalize(patent.country)}</div>
                        <div className="obj"><span>Year : </span>{Capitalize(patent.year)}</div>
                        <div className="obj"><span>Award Number : </span>{Capitalize(patent.awardNo)}</div>
                        <div className="obj"><span>Status : </span>{Capitalize(patent.status)}</div>
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
export default Projects