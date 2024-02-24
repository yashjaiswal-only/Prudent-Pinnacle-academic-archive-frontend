import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material';
import './style.scss'
import EditActivities from './EditRecords/EditActivities';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecord } from '../../api_calls/Record';
import { updateSociety, updateTalks } from '../../redux/recordsRedux';
import { Capitalize } from '../../services';
import EditIcon from '@mui/icons-material/Edit';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Activities = () => {
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
      {openEditor && <EditActivities setOpenEditor={setOpenEditor} type={location.state.type} record={record} setRecord={setRecord} />}
      {location.state.type == 'Invited Talk' && <Invitedtalk handleEditClick={handleEditClick} />}
      {location.state.type == 'Society Membership' && <Society handleEditClick={handleEditClick} />}
    </div>
  )
}

const Invitedtalk = ({ handleEditClick }) => {
  const [talkList, setTalkList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { talks } = useSelector(state => state.records)
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();

  const get = async () => {
    setError(false);
    setFetching(true);
    const res = await getAllRecord(user._id, 'talk', token);
    console.log(res)
    if (res.status === 200) {
      dispatch(updateTalks(res.data));
      setTalkList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(() => {
    if (talks) setTalkList(talks);
    else get();
    console.log(talks)
  }, [])
  return (
    <div className="slide">
      <div className="heading">
        Invited Talks
      </div>
      {fetching === false && booksList.length === 0 ?
        <EmptyList qoute={'Nothing to show here. Please add your Books'} />
        : ''}
      {fetching === false ?
        talkList.map((talk) =>
          <div className="card">
            <EditIcon onClick={() => handleEditClick(book)} />
            <div className="obj"><span>Title : </span>{Capitalize(talk.title)}</div>
            <div className="obj"><span>Venue : </span>{Capitalize(talk.venue)}</div>
            <div className="obj"><span>Date : </span>{Capitalize(talk.date)}</div>
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
const Society = ({ handleEditClick }) => {
  const [societyList, setSocietyList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { society } = useSelector(state => state.records)
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();

  const get = async () => {
    setError(false);
    setFetching(true);
    const res = await getAllRecord(user._id, 'society', token);
    console.log(res)
    if (res.status === 200) {
      dispatch(updateSociety(res.data));
      setSocietyList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(() => {
    if (society) setSocietyList(society);
    else get();
    console.log(society)
  }, [])
  return (
    <div className="slide">
      <div className="heading">
        Society Memberships
      </div>
      {fetching === false && booksList.length === 0 ?
        <EmptyList qoute={'Nothing to show here. Please add your Books'} />
        : ''}
      {fetching === false ?
        societyList.map((society) =>
          <div className="card">
            <EditIcon onClick={() => handleEditClick(book)} />
            <div className="obj"><span>Name : </span>{Capitalize(society.societyName)}</div>
            <div className="obj"><span>Duration : </span>{Capitalize(society.duration)}</div>
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

export default Activities