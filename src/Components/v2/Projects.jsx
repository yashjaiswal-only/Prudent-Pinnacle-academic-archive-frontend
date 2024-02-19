import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'


const Projects = () => {
    const location=useLocation();
  return (
    <>
    {location.state?
      <div className='page'>
          {location.state.type=='Project Grants'&&<Grants/>}
          {location.state.type=='Consultancy Projects'&&<Consultancy/>}
          {location.state.type=='Patents'&&<Patents/>}
      </div>
    :''}
    </>
  )
}
const Grants = () => {
  return (
    <div className="slide">
        <div className="heading">
            Project Grants
        </div>
        <div className="card">
            <div className="obj">
                <span>Project Title : </span>
                Academic Archieve
            </div>
            <div className="obj">
            <span>Awarding Agency : </span>
                NSUT
            </div>
            <div className="obj">
                <span>Project Cost : </span>
                4 Crore
            </div>
            <div className="obj">
                <span>Status : </span>
                Ongoing
            </div>
        </div>
    </div>
  )
}
const Consultancy = () => {
  return (
    <div className="slide">
        <div className="heading">
            Consultancy Projects
        </div>
        <div className="card">
            <div className="obj">
                <span>Project Title : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Awarding Agency :: </span>
                INDIA
            </div>
            <div className="obj">
                <span>Project Cost : </span>
                2020
            </div>
            <div className="obj">
                <span>Status : </span>
                Awarded
            </div>
        </div>
    </div>
  )
}
const Patents = () => {
  return (
    <div className="slide">
        <div className="heading">
        Patents
        </div>
        <div className="card">
            <div className="obj">
                <span>Name : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Country : </span>
                INDIA
            </div>
            <div className="obj">
                <span>Year : </span>
                2020
            </div>
            <div className="obj">
                <span>Award Number : </span>
                4980
            </div>
            <div className="obj">
                <span>Status : </span>
                Granted
            </div>
        </div>
    </div>
  )
}
export default Projects