import React from 'react'
import { useLocation } from 'react-router-dom'
import Consultancy from './Records/Consultancy';
import Grants from './Records/Grants';
import Patents from './Records/Patents';
import './style.scss'


const Projects = () => {
    const location=useLocation();
  return (
    <div className='page'>
        Projects - {location.state&&location.state.type}
        <Grants/>
        <Consultancy/>
        <Patents/>
    </div>
  )
}

export default Projects