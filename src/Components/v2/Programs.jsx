import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import Fdp from './Records/Fdp.jsx'
import Stc from './Records/Stc.jsx'

const Programs = () => {
    const location=useLocation();
  return (
    <div className='page'>
        Programs - {location.state&&location.state.type}
        <Fdp/>
        <Stc/>
    </div>
  )
}

export default Programs