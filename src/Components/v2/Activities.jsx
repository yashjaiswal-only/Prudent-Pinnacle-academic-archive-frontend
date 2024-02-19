import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'

const Activities = () => {
    const location=useLocation();
  return (
    <>
    {location.state?
      <div className='page'>
          {location.state.type=='Invited Talk'&&<Invitedtalk/>}
          {location.state.type=='Society Membership'&&<Society/>}
      </div>
    :''}
    </>
  )
}

const Invitedtalk = () => {
  return (
    <div className="slide">
        <div className="heading">
            Invited Talks
        </div>
        <div className="card">
            <div className="obj">
                <span>Title : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Venue: </span>
                INDIA
            </div>
            <div className="obj">
                <span>Date : </span>
                2023-12-02
            </div>
        </div>
    </div>
  )
}
const Society = () => {
  return (
    <div className="slide">
        <div className="heading">
            Society Memberships
        </div>
        <div className="card">
            <div className="obj">
                <span>Name : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Duration : </span>
                2 years
            </div>
            
        </div>
    </div>
  )
}

export default Activities