import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material';
import './style.scss'
import EditStudentProject from './EditRecords/EditStudentProject';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecord } from '../../api_calls/Record';
import { updateBtp, updateMtp, updatePhd } from '../../redux/recordsRedux';
import { Capitalize } from '../../services';


const Students = () => {
  const location = useLocation();
  const [openEditor, setOpenEditor] = useState(false);
  return (
    <div className="page">
      <div className="icon">
        <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
      </div>
      {openEditor && <EditStudentProject setOpenEditor={setOpenEditor} type={location.state.type} />}
      {location.state.type == 'B.Tech. Projects' && <Btp />}
      {location.state.type == 'M.Tech. Projects' && <Mtp />}
      {location.state.type == 'Phd.Scholars' && <Phd />}
    </div>
  )
}
const Btp = () => {
  const [btpList, setBtpList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { btp } = useSelector(state => state.records)
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();

  const get = async () => {
    setError(false);
    setFetching(true);
    const res = await getAllRecord(user._id, 'btp', token);
    console.log(res)
    if (res.status === 200) {
      dispatch(updateBtp(res.data));
      setBtpList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(() => {
    if (btp) setBtpList(btp);
    else get();
    console.log(btp)
  }, [])
  return (
    <div className="slide">
      <div className="heading">
        B.Tech Projects
      </div>
      {
        btpList.map(project => <div className="card">
          <div className="obj">
            <span>Title: </span>{Capitalize(project.title)}
          </div>
          <div className="obj">
            <span>Students : </span>
            <ul>
              {project.students.map((a) =>
                <li>
                  {`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}
                  {a.rollno ? " (" + `${a.rollno}` + ") " : ''}
                </li>)}
            </ul>
          </div>
          <div className="obj">
            <span>Year : </span>{project.year}
          </div>
          <div className="obj">
            <span>Major/Minor : </span>{Capitalize(project.type)}
          </div>
        </div>)
      }
    </div>
  )
}
const Mtp = () => {
  const [mtpList, setMtpList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { mtp } = useSelector(state => state.records)
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();

  const get = async () => {
    setError(false);
    setFetching(true);
    const res = await getAllRecord(user._id, 'mtp', token);
    console.log(res)
    if (res.status === 200) {
      dispatch(updateMtp(res.data));
      setMtpList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(() => {
    if (mtp) setMtpList(mtp);
    else get();
    console.log(mtp)
  }, [])
  return (
    <div className="slide">
      <div className="heading">
        M.Tech Projects
      </div>
      {
        mtpList.map(project =>
          <div className="card">
            <div className="obj">
              <span>Title: </span>{Capitalize(project.title)}
            </div>
            <div className="obj">
              <span>Students : </span>
              <ul>
                {project.student && <li>
                  {`${project.student.first}` + " " + `${project.student.middle ? project.student.middle : ''}` + " " + `${project.student.last}`}
                  {project.student.rollno ? " (" + `${project.student.rollno}` + ") " : ''}
                </li>}
              </ul>
            </div>
            <div className="obj">
              <span>Year : </span>{project.year}
            </div>
          </div>)
      }
    </div>
  )
}
const Phd = () => {
  const [phdList, setPhdList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { phd } = useSelector(state => state.records)
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();

  const get = async () => {
    setError(false);
    setFetching(true);
    const res = await getAllRecord(user._id, 'phd', token);
    console.log(res)
    if (res.status === 200) {
      dispatch(updatePhd(res.data));
      setPhdList(res.data);
    }
    else setError(res.response.data.message);
    setFetching(false);
  }
  useEffect(() => {
    if (phd) setPhdList(phd);
    else get();
    console.log(phd)
  }, [])
  return (
    <div className="slide">
      <div className="heading">
        Phd. Scholars
      </div>
      {
        phdList.map(scholars =>
          <div className="card">
            <div className="obj">
              <span>Title: </span>{Capitalize(scholars.phdTitle)}
            </div>
            <div className="obj">
              <span>Scholar Name : </span>{Capitalize(scholars.scholarName)}
            </div>
            <div className="obj">
              <span>Enrolment Date : </span>{Capitalize(scholars.enrolmentDate)}
            </div>
            <div className="obj">
              <span>Status : </span>{Capitalize(scholars.status)}
            </div>
          </div>)
      }
    </div>
  )
}
export default Students