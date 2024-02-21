import React from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'

const EditActivities = ({setOpenEditor,type}) => {
  return (
    <div className="edit">
        <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            {type=='Invited Talk'&&<EditInvitedtalk/>}
            {type=='Society Membership'&&<EditSociety/>}
        </div>
    </div>
  )
}

const EditInvitedtalk=()=>{
    
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Invited Talk</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Title of Talk: </span>
              <input name="title" onChange={ ()=>{}} type="text" placeholder="Title "  />
            </div>
            <div className="obj">
              <span>Talk Venue </span>
              <input name="venue" onChange={ ()=>{}} type="text" placeholder="Venue"  />
            </div>
            {/* form datepicker */}
          </div>
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'Error!!'}</div>
        </div>
    )
}
const EditSociety=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Society Membership</h1>
      </div>
      <div className="field">
        <div className="obj">
            <span>Society Name: </span>
            <input name="societyName" onChange={ ()=>{}} type="text" placeholder="Society Name "  />
        </div>
        <div className="obj">
            <span>Duration of Membership: </span>
            <input name="duration" onChange={ ()=>{}} type="text" placeholder="Duration"  />
        </div>
        <div className="obj">
            <span>Organizer of Program: </span>
            <input name="organiser" onChange={ ()=>{}} type="text" placeholder="Organiser"  />
            
        </div>
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}

export default EditActivities