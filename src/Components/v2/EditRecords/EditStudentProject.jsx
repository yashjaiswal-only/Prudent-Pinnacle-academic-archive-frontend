import React from 'react'
import { CancelOutlined } from '@mui/icons-material'
import './Edit.scss'

const EditStudentProject = ({setOpenEditor,type}) => {
  return (
    <div className="edit">
        <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            { type=='B.Tech. Projects'&&<EditBtp/>}
            { type=='M.Tech. Projects'&&<EditMtp/>}
            { type=='Phd.Scholars'&&<EditPhd/>}
        </div>
    </div>
  )
}

const EditBtp=()=>{
    
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit B.Tech Project</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Project Title: </span>
              <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
            </div>
            <div className="obj">
              <span>Year: </span>
              <input name="year" onChange={ ()=>{}} type="text" placeholder="Year"  />
            </div>
            <div className="obj">
              <span>Project Type: </span>
              {/* Multiselector major/minor ka */}
            </div>
            {/* form author wala */}
          </div>
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'Error!!'}</div>
        </div>
    )
}
const EditMtp=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit M.Tech Project</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Name: </span>
          <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
        </div>
        <div className="obj">
          <span>Year: </span>
          <input name="year" onChange={ ()=>{}} type="text" placeholder="Year"  />
        </div>
        {/* Author ka form banana hai yahan */}
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}
const EditPhd=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Scholar</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Scholar Name: </span>
          <input name="scholarName" onChange={ ()=>{}} type="text" placeholder="Scholar Name"  />
        </div>
        <div className="obj">
          <span>Phd Title: </span>
          <input name="doi" onChange={ ()=>{}} type="text" placeholder="DOI"  />
        </div>
        <div className="obj">
          <span>Status: </span>
          {/* Multiselector */}
        </div>
        {/* Set date ka banana ha */}
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}

export default EditStudentProject