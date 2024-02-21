import React from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'


const EditProjects = ({setOpenEditor,type}) => {
    return (
      <div className="edit">
          <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            {type=='Project Grants'&&<EditGrants/>}
            {type=='Consultancy Projects'&&<EditConsultancy/>}
            {type=='Patents'&&<EditPatents/>}
          </div>
      </div>
    )
}

const EditGrants=()=>{
    
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Project</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Project Title: </span>
              <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
            </div>
            <div className="obj">
              <span>Awarding Agency: </span>
              <input name="awardingAgency" onChange={ ()=>{}} type="text" placeholder="Awarding Agency"  />
            </div>
            <div className="obj">
              <span>Project Cost: </span>
              <input name="cost" onChange={ ()=>{}} type="text" placeholder="Project Cost"  />
            </div>
            <div className="obj">
              <span>Project Status: </span>
              {/* Multiselector dalna hai yahan */}
            </div>
          </div>
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'Error!!'}</div>
        </div>
    )
}
const EditConsultancy=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Consultancy Project</h1>
      </div>
      <div className="field">
            <div className="obj">
              <span>Project Title: </span>
              <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
            </div>
            <div className="obj">
              <span>Awarding Agency: </span>
              <input name="awardingAgency" onChange={ ()=>{}} type="text" placeholder="Awarding Agency"  />
            </div>
            <div className="obj">
              <span>Project Cost: </span>
              <input name="cost" onChange={ ()=>{}} type="text" placeholder="Project Cost"  />
            </div>
            <div className="obj">
              <span>Project Status: </span>
              {/* Multiselector dalna hai yahan */}
            </div>
        </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}
const EditPatents=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Patent</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span> Name of Patent: </span>
          <input name="name" onChange={ ()=>{}} type="text" placeholder="Name of Patent"  />
        </div>
        <div className="obj">
          <span>Country: </span>
          <input name="country" onChange={ ()=>{}} type="text" placeholder="Country"  />
        </div>
        <div className="obj">
            <span>Year: </span>
            <input name="year" onChange={ ()=>{}} type="text" placeholder="Year"  />
        </div>
        <div className="obj">
            <span>Award Number: </span>
            <input name="awardNo" onChange={ ()=>{}} type="text" placeholder="Award Number"  />
        </div>
        <div className="obj">
          <span>Status: </span>
          {/* Multiselector */}
        </div>
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}

export default EditProjects