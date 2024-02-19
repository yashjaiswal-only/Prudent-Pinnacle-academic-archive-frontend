import { CancelOutlined } from '@mui/icons-material'
import React from 'react'
import './Edit.scss'
const EditResearchPaper = ({setOpenEditor,type}) => {
  return (
    <div className="edit">
        <div className="wrapper">
            <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
            { type=='Journals'&&<EditJournal/>}
            { type=='Book Chapter'&&<EditChapter/>}
            { type=='Books'&&<EditBook/>}
            { type=='Conference Papers'&&<EditConference/>}
        </div>
    </div>
  )
}

const EditBook=()=>{
    
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Book</h1>
          </div>
          {/* <div className="field">
            <div className="obj">
              <span>Name: </span>
              <input name="name" onChange={ ()=>{}} type="text" placeholder="Full name" value={inputs.name} />
            </div>
            <div className="obj">
              <span>Email: </span>
              <input name="email" onChange={ ()=>{}} type="email" placeholder="Email" value={inputs.email} />
            </div>
            <div className="obj">
              <span>Qualification: </span>
              <input name="qualification" onChange={ ()=>{}} type="text" placeholder="qualification" value={inputs.qualification} />
            </div>
            <div className="obj">
              <span>Contact Number: </span>
              <input name="ph" onChange={ ()=>{}} type="text" placeholder="contact number" value={inputs.ph} />
            </div>
          </div> */}
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'error'}</div>
        </div>
    )
}
const EditChapter=()=>{
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Book Chapter</h1>
          </div>
          {/* <div className="field">
            <div className="obj">
              <span>Name: </span>
              <input name="name" onChange={ ()=>{}} type="text" placeholder="Full name" value={inputs.name} />
            </div>
            <div className="obj">
              <span>Email: </span>
              <input name="email" onChange={ ()=>{}} type="email" placeholder="Email" value={inputs.email} />
            </div>
            <div className="obj">
              <span>Qualification: </span>
              <input name="qualification" onChange={ ()=>{}} type="text" placeholder="qualification" value={inputs.qualification} />
            </div>
            <div className="obj">
              <span>Contact Number: </span>
              <input name="ph" onChange={ ()=>{}} type="text" placeholder="contact number" value={inputs.ph} />
            </div>
          </div> */}
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'error'}</div>
        </div>
    )
}
const EditJournal=()=>{
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Journal Paper</h1>
          </div>
          {/* <div className="field">
            <div className="obj">
              <span>Name: </span>
              <input name="name" onChange={ ()=>{}} type="text" placeholder="Full name" value={inputs.name} />
            </div>
            <div className="obj">
              <span>Email: </span>
              <input name="email" onChange={ ()=>{}} type="email" placeholder="Email" value={inputs.email} />
            </div>
            <div className="obj">
              <span>Qualification: </span>
              <input name="qualification" onChange={ ()=>{}} type="text" placeholder="qualification" value={inputs.qualification} />
            </div>
            <div className="obj">
              <span>Contact Number: </span>
              <input name="ph" onChange={ ()=>{}} type="text" placeholder="contact number" value={inputs.ph} />
            </div>
          </div> */}
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'error'}</div>
        </div>
    )
}
const EditConference=()=>{
    return (
        <div className="frame">
          <div className="heading">
            <h1>Edit Conference Paper</h1>
          </div>
          {/* <div className="field">
            <div className="obj">
              <span>Name: </span>
              <input name="name" onChange={ ()=>{}} type="text" placeholder="Full name" value={inputs.name} />
            </div>
            <div className="obj">
              <span>Email: </span>
              <input name="email" onChange={ ()=>{}} type="email" placeholder="Email" value={inputs.email} />
            </div>
            <div className="obj">
              <span>Qualification: </span>
              <input name="qualification" onChange={ ()=>{}} type="text" placeholder="qualification" value={inputs.qualification} />
            </div>
            <div className="obj">
              <span>Contact Number: </span>
              <input name="ph" onChange={ ()=>{}} type="text" placeholder="contact number" value={inputs.ph} />
            </div>
          </div> */}
          <button onClick={ ()=>{}} >Save</button>
          <div className="error">{'error'}</div>
        </div>
    )
}

export default EditResearchPaper