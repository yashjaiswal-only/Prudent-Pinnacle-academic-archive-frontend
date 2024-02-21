import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { AddCircleOutline } from '@mui/icons-material';
import EditProjects from './EditRecords/EditProjects';
import { getAllRecord } from '../../api_calls/Record';
import { updateConsultancy, updatePatents, updateProjectgrands } from '../../redux/recordsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { Capitalize } from '../../services';

const Projects = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(false);
    return (
        <div className="page">
            <div className="icon">
                <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
            </div>
            {openEditor && <EditProjects setOpenEditor={setOpenEditor} type={location.state.type} />}
            {location.state.type == 'Project Grants' && <Grants />}
            {location.state.type == 'Consultancy Projects' && <Consultancy />}
            {location.state.type == 'Patents' && <Patents />}
        </div>
    )
}
const Grants = () => {
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
            {
                projectList.map((scholars) =>
                    <div className="card">          <div><span>Project Title : </span>{Capitalize(scholars.title)}</div>
                        <div><span>Awarding Agency : </span>{Capitalize(scholars.awardingAgency)}</div>
                        <div><span>Project Cost : </span>{Capitalize(scholars.cost)}</div>
                        <div><span>Status : </span>{Capitalize(scholars.status)}</div>

                    </div>
                )}
        </div>
    )
}
const Consultancy = () => {
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

            {
                projectList.map((scholars) =>
                    <div className="card">
                        <div className='obj'><span>Project Title : </span>{Capitalize(scholars.title)}</div>
                        <div className='obj'><span>Awarding Agency : </span>{Capitalize(scholars.awardingAgency)}</div>
                        <div className='obj'><span>Project Cost : </span>{Capitalize(scholars.cost)}</div>
                        <div className='obj'><span>Status : </span>{Capitalize(scholars.status)}</div>

                    </div>
                )
            }
        </div>
    )
}
const Patents = () => {
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
            {
                patentsList.map((patent) =>
                    <div className='card'>
                        <div className="obj"><span>Name : </span>{Capitalize(patent.name)}</div>
                        <div className="obj"><span>Country : </span>{Capitalize(patent.country)}</div>
                        <div className="obj"><span>Year : </span>{Capitalize(patent.year)}</div>
                        <div className="obj"><span>Award Number : </span>{Capitalize(patent.awardNo)}</div>
                        <div className="obj"><span>Status : </span>{Capitalize(patent.status)}</div>
                    </div>)
            }

        </div>
    )
}
export default Projects