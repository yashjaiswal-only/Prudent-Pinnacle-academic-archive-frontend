import React from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'

const EditCourses = ({setOpenEditor,type}) => {
  return (
    <div className="edit">
        <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            {type=='Faculty Development Program'&&<EditFdp/>}
            {type=='Short Term Courses'&&<EditStc/>}
        </div>
    </div>
  )
}

const EditFdp=()=>{
    
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Faculty Developement Program</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Name of Program: </span>
              <input name="name" onChange={ ()=>{}} type="text" placeholder="Name "  />
            </div>
            <div className="obj">
              <span>Duration of Program: </span>
              <input name="duration" onChange={ ()=>{}} type="text" placeholder="Duration"  />
            </div>
            <div className="obj">
              <span>Organizer of Program: </span>
              <input name="organiser" onChange={ ()=>{}} type="text" placeholder="Organiser"  />
              
            </div>
            {/* form start date and end date wala */}
          </div>
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'Error!!'}</div>
        </div>
    )
}
const EditStc=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Short Term Courses</h1>
      </div>
      <div className="field">
        <div className="obj">
            <span>Name of Program: </span>
            <input name="name" onChange={ ()=>{}} type="text" placeholder="Name "  />
        </div>
        <div className="obj">
            <span>Duration of Program: </span>
            <input name="duration" onChange={ ()=>{}} type="text" placeholder="Duration"  />
        </div>
        <div className="obj">
            <span>Organizer of Program: </span>
            <input name="organiser" onChange={ ()=>{}} type="text" placeholder="Organiser"  />
            
        </div>
        {/* form start date and end date wala */}
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}


export default EditCourses