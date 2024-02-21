import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material';
import './style.scss'
import EditStudentProject from './EditRecords/EditStudentProject';


const Students = () => {
  const location=useLocation();
    const [openEditor,setOpenEditor]=useState(true);
  return (
    <div className="page">
        <div className="icon">
            <AddCircleOutline sx={{fontSize:'3rem',cursor:'pointer'}} onClick={()=>setOpenEditor(true)}/>
        </div>
        {openEditor&&<EditStudentProject setOpenEditor={setOpenEditor} type={location.state.type}/>}
      {location.state.type=='B.Tech. Projects'&&<Btp/>}
      {location.state.type=='M.Tech. Projects'&&<Mtp/>}
      {location.state.type=='Phd.Scholars'&&<Phd/>}
    </div>
  )
}
const Btp = () => {
  return (
    <div className="slide">
      <div className="heading">
        B.Tech Projects
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>
        <div className="obj">
          <span>Major/Minor : </span>
          Major
        </div>

      </div>
    </div>
  )
}
const Mtp = () => {
  return (
    <div className="slide">
      <div className="heading">
        M.Tech Projects
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>

      </div>
    </div>
  )
}
const Phd = () => {
  return (
    <div className="slide">
      <div className="heading">
        Phd. Scholars
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>
      </div>
    </div>
  )
}
export default Students