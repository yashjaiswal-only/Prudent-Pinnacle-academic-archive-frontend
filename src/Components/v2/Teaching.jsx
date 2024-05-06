import { AddCircleOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import EditTeaching from './EditRecords/EditTeaching';
import { getAllRecord } from '../../api_calls/Record';
import { updateDuty, updateExcellence, updateMaterial } from '../../redux/recordsRedux';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EditIcon from '@mui/icons-material/Edit';
import { Capitalize } from '../../services';
import { excellenceFields } from '../../data';

const Teaching = () => {
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
    const [excellenceList, setExcellenceList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { excellence } = useSelector(state => state.records)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        var resArr = [];
        var res = await getAllRecord(user._id, 'Cat1Record', token);
        if (res.status == 200 && res.data.length > 0) resArr.push(res.data[0]);
        var res = await getAllRecord(user._id, 'Cat2Record', token);
        if (res.status == 200 && res.data.length > 0) resArr.push(res.data[0]);
        if (resArr.length > 0) {
            dispatch(updateExcellence(resArr));
            setExcellenceList(resArr);
        }
        else setError('Unable to fetch data');
        setFetching(false);
    }
    useEffect(() => {
        if (excellence) setExcellenceList(excellence);
        else get();
        console.log(excellence)
    }, [excellence])
    console.log(excellenceList)
    return (
        <div className="slide">
            <div className="heading">
                Academic Excellence.
            </div>
            {fetching === false && excellenceList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your duties'} />
                : ''}
            {fetching === false && excellenceList.length ?
                (
                    <>
                        {excellenceList[0] && <div className="card">
                            <EditIcon onClick={() => handleEditClick({...excellenceList[0],...excellenceList[1]})} />
                            <div className="obj">
                                <span>Category : </span>{excellenceList[0].type}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[0] + " : "}</span>{excellenceList[0].four1}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[1] + " : "}</span>{excellenceList[0].four21}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[2] + " : "}</span>{excellenceList[0].four22}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[3] + " : "}</span>{excellenceList[0].four23}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[4] + " : "}</span>{excellenceList[0].four3}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[5] + " : "}</span>{excellenceList[0].four4}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[6] + " : "}</span>{excellenceList[0].four5}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[7] + " : "}</span>{excellenceList[0].four6}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[8] + " : "}</span>{excellenceList[0].four7}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[9] + " : "}</span>{excellenceList[0].five1}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[10] + " : "}</span>{excellenceList[0].five2}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[11] + " : "}</span>{excellenceList[0].five3}
                            </div>
                        </div>}
                        {excellenceList[1] && <div className="card">
                            <EditIcon onClick={() => handleEditClick({...excellenceList[0],...excellenceList[1]})} />
                            <div className="obj">
                                <span>Category : </span>{excellenceList[1].type}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[12] + " : "}</span>{excellenceList[1].cat21}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[13] + " : "}</span>{excellenceList[1].cat22}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[14] + " : "}</span>{excellenceList[1].cat23}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[15] + " : "}</span>{excellenceList[1].cat24}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[16] + " : "}</span>{excellenceList[1].cat25}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[17] + " : "}</span>{excellenceList[1].cat26}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[18] + " : "}</span>{excellenceList[1].cat27}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[19] + " : "}</span>{excellenceList[1].cat28}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[20] + " : "}</span>{excellenceList[1].cat29}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[21] + " : "}</span>{excellenceList[1].cat210}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[22] + " : "}</span>{excellenceList[1].cat211}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[23] + " : "}</span>{excellenceList[1].cat212}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[24] + " : "}</span>{excellenceList[1].cat213}
                            </div>
                            <div className="obj1">
                                <span>{excellenceFields[25] + " : "}</span>{excellenceList[1].cat214}
                            </div>
                        </div>}
                    </>

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

export default Teaching