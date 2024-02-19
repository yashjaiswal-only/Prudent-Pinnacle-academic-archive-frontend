import React from 'react'
import { useLocation } from 'react-router-dom'
import Mtp from './Records/Mtp';
import Btp from './Records/Btp';
import './style.scss'


const Students = () => {
    const location=useLocation();
  return (
    <div className='page'>
        Student Projects - {location.state&&location.state.type}
        <Btp/>
        <Mtp/>
    </div>
  )
}

export default Students