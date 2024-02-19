import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'

const Programs = () => {
    const location=useLocation();
  return (
    <>
    {location.state?
      <div className='page'>
          {location.state.type=='Faculty Development Program'&&<Fdp/>}
          {location.state.type=='Short Term Courses'&&<Stc/>}
      </div>
    :''}
    </>
  )
}

const Fdp = () => {
  return (
    <div className="slide">
        <div className="heading">
            Faculty Development Programs
        </div>
        <div className="card">
            <div className="obj">
                <span>Name: </span>
                Raj Khurana
            </div>
            <div className="obj">
            <span>Duration : </span>
                2 Months
            </div>
            <div className="obj">
                <span>Organiser : </span>
                IIT Delhi
            </div>
            <div className="obj">
                <span>Start Date : </span>
                2006-12-02
            </div>

            <div className="obj">
                <span> End Date :</span>
                2006-12-02
            </div>
        </div>
    </div>
  )
}

const Stc = () => {
  return (
    <div className="slide">
        <div className="heading">
            Short Term Courses
        </div>
        <div className="card">
            <div className="obj">
                <span>Name: </span>
                Raj Khurana
            </div>
            <div className="obj">
            <span>Duration : </span>
                2 Months
            </div>
            <div className="obj">
                <span>Organiser : </span>
                IIT Delhi
            </div>
            <div className="obj">
                <span>Start Date : </span>
                2006-12-02
            </div>

            <div className="obj">
                <span> End Date :</span>
                2006-12-02
            </div>
        </div>
    </div>
  )
}

export default Programs