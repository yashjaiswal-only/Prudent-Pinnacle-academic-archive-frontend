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
          <div className="field">
            <div className="obj">
              <span>Title: </span>
              <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
            </div>
            <div className="obj">
              <span>DOI: </span>
              <input name="doi" onChange={ ()=>{}} type="text" placeholder="DOI"  />
            </div>
            <div className="obj">
              <span>Publisher: </span>
              <input name="publisher" onChange={ ()=>{}} type="text" placeholder="Publisher" />
            </div>
            <div className="obj">
              <span>ISBN: </span>
              <input name="isbn" onChange={ ()=>{}} type="text" placeholder="ISBN"  />
            </div>
            <div className="obj">
              <span>Edition: </span>
              <input name="edition" onChange={ ()=>{}} type="text" placeholder="Edition"  />
            </div>
          </div>
          <button onClick={ ()=>{}} disabled={false}>Save</button>
          <div className="error">{'Error!!'}</div>
        </div>
    )
}
const EditChapter=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit Book Chapter</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
        </div>
        <div className="obj">
          <span>Book Title: </span>
          <input name="bookTitle" onChange={ ()=>{}} type="text" placeholder="Book Title"  />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={ ()=>{}} type="text" placeholder="DOI"  />
        </div>
        <div className="obj">
          <span>Publisher: </span>
          <input name="publisher" onChange={ ()=>{}} type="text" placeholder="Publisher" />
        </div>
        <div className="obj">
          <span>ISBN: </span>
          <input name="isbn" onChange={ ()=>{}} type="text" placeholder="ISBN"  />
        </div>
        <div className="obj">
          <span>Page Range: </span>
          <input name="pageRange" onChange={ ()=>{}} type="text" placeholder="Page Range"  />
        </div>
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}
const EditJournal=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit  Journal Paper</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={ ()=>{}} type="text" placeholder="DOI"  />
        </div>
        <div className="obj">
          <span>Journal Title: </span>
          <input name="journalTitle" onChange={ ()=>{}} type="text" placeholder="JournalTitle"  />
        </div>
        <div className="obj">
          <span>ISSN: </span>
          <input name="issn" onChange={ ()=>{}} type="text" placeholder="ISSN"  />
        </div>
        <div className="obj">
          <span>Volume: </span>
          <input name="volume" onChange={ ()=>{}} type="text" placeholder="Volume" />
        </div>
        <div className="obj">
          <span>Issue: </span>
          <input name="issue" onChange={ ()=>{}} type="text" placeholder="Issue"  />
        </div>
        <div className="obj">
          <span>Page Range: </span>
          <input name="pageRange" onChange={ ()=>{}} type="text" placeholder="Page Range"  />
        </div>
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}
const EditConference=()=>{
    return (
      <div className="frame">
      <div className="heading">
        <h1>Edit  Journal Paper</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={ ()=>{}} type="text" placeholder="Title"  />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={ ()=>{}} type="text" placeholder="DOI"  />
        </div>
        <div className="obj">
          <span>Conference Title: </span>
          <input name="conferenceTitle" onChange={ ()=>{}} type="text" placeholder="Conference Title"  />
        </div>
        <div className="obj">
          <span>Publisher: </span>
          <input name="publisher" onChange={ ()=>{}} type="text" placeholder="Publisher" />
        </div>
        <div className="obj">
          <span>ISBN: </span>
          <input name="isbn" onChange={ ()=>{}} type="text" placeholder=" ISBN"  />
        </div>
        <div className="obj">
          <span>Conference Location: </span>
          <input name="location" onChange={ ()=>{}} type="text" placeholder="Conference Location"  />
        </div>
      </div>
      <button onClick={ ()=>{}} disabled={false}>Save</button>
      <div className="error">{'Error!!'}</div>
    </div>
    )
}

export default EditResearchPaper