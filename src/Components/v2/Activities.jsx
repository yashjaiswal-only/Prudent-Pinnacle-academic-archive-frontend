import React from 'react'
import { useLocation } from 'react-router-dom'
import Society from './Records/Society';
import Invitedtalk from './Records/Invitedtalk';
import './style.scss'

const Activities = () => {
    const location=useLocation();
  return (
    <div className='page'>
        Activities - {location.state&&location.state.type}
        <Invitedtalk/>
        <Society/>
    </div>
  )
}

export default Activities