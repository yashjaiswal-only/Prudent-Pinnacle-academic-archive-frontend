import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material';
import './style.scss'
import EditActivities from './EditRecords/EditActivities';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecord } from '../../api_calls/Record';
import { updateSociety, updateTalks } from '../../redux/recordsRedux';
import { Capitalize } from '../../services';

const Activities = () => {
  const location = useLocation();
  const [openEditor, setOpenEditor] = useState(false);
  return (
    <div className="page">
      <div className="icon">
        <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
      </div>
      {openEditor && <EditActivities setOpenEditor={setOpenEditor} type={location.state.type} />}
      {location.state.type == 'Invited Talk' && <Invitedtalk />}
      {location.state.type == 'Society Membership' && <Society />}
    </div>
  )
}

const Invitedtalk = () => {
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
      {
        talkList.map((talk) =>
          <div className="card">
            <div className="obj"><span>Title : </span>{Capitalize(talk.title)}</div>
            <div className="obj"><span>Venue : </span>{Capitalize(talk.venue)}</div>
            <div className="obj"><span>Date : </span>{Capitalize(talk.date)}</div>
          </div>
        )}
    </div>
  )
}
const Society = () => {
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
      {
        societyList.map((society) =>
          <div className="card">
            <div className="obj"><span>Name : </span>{Capitalize(society.societyName)}</div>
            <div className="obj"><span>Duration : </span>{Capitalize(society.duration)}</div>
          </div>
        )}
    </div>
  )
}

export default Activities