import { CancelOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './Edit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddAuthor from './AddAuthors'
import DatePicker from './DatePicker'
import { addPaper, editPaper } from '../../../api_calls/Papers'
import { removeBooks, removeChapters, removeConferences, removeJournals } from '../../../redux/papersRedux'
import AddEditor from './AddEditor'
const EditResearchPaper = ({ setOpenEditor, type, paper, setPaper }) => {
  return (
    <div className="edit">
      <div className="wrapper">
        <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setOpenEditor(false)} />
        {type == 'Journals' && <EditJournal setPaper={setPaper} paper={paper} setOpenEditor={setOpenEditor} />}
        {type == 'Book Chapter' && <EditChapter setPaper={setPaper} paper={paper} setOpenEditor={setOpenEditor} />}
        {type == 'Books' && <EditBook setPaper={setPaper} paper={paper} setOpenEditor={setOpenEditor} />}
        {type == 'Conference Papers' && <EditConference setPaper={setPaper} paper={paper} setOpenEditor={setOpenEditor} />}
      </div>
    </div>
  )
}

const EditBook = ({ paper, setPaper, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [authors, setAuthors] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    //need to implement checks here
    var res = {};
    setSending(true);
    setError(null);
    const { title, ...rest } = inputs;
    if (location.state === null) {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, publishedOn: date };
      console.log(paper)
      res = await addPaper(paper, 'book', token);
    }
    else {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, pid: inputs._id, publishedOn: date };
      console.log(paper)
      res = await editPaper(paper, 'book', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeBooks());
      setPaper(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (paper) {
      const { authors, uid, createdAt, updatedAt, publishedOn, ...others } = paper;
      setDate(publishedOn);
      setInputs(others);
      setAuthors(authors);
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{paper ? 'Edit Book' : 'Add new book'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi} />
        </div>
        <div className="obj">
          <span>Publisher: </span>
          <input name="publisher" onChange={handleChange} type="text" placeholder="Publisher" value={inputs.publisher} />
        </div>
        <div className="obj">
          <span>ISBN: </span>
          <input name="isbn" onChange={handleChange} type="text" placeholder="ISBN" value={inputs.isbn} />
        </div>
        <div className="obj">
          <span>Edition: </span>
          <input onChange={handleChange} type="text" placeholder="Edition" value={inputs.edition} />
        </div>
        <DatePicker date={date} setDate={setDate} title="Publication Date" />
        <AddAuthor authors={authors} setAuthors={setAuthors} students={false} />
      </div>
      <div className="error">{error}</div>
      <button className='savebutton' onClick={handleSubmit} disabled={sending}>Save</button>
    </div>
  )
}
const EditChapter = ({ paper, setPaper, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [authors, setAuthors] = useState([]);
  const [editors, setEditors] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);


  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    //need to implement checks here
    var res = {};
    setError(null);
    setSending(true);
    const { title, ...rest } = inputs;
    //title lowercase me to enhance search
    if (location.state === null) {
      const paper = { ...rest, title: title.toLowerCase(), authors, editors, _id: user._id, publishedOn: date };
      console.log(paper)
      res = await addPaper(paper, 'chapter', token);
    }
    else {
      const paper = { ...rest, title: title.toLowerCase(), authors, editors, _id: user._id, pid: inputs._id, publishedOn: date };
      console.log(paper)
      res = await editPaper(paper, 'chapter', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeChapters());
      setPaper(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (paper) {
      const { authors, editors, uid, createdAt, updatedAt, publishedOn, ...others } = paper;
      setDate(publishedOn);
      setInputs(others);
      setAuthors(authors);
      setEditors(editors);
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>Edit Book Chapter</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>Book Title: </span>
          <input name="bookTitle" onChange={handleChange} type="text" placeholder="Book Title" value={inputs.bookTitle} />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi} />
        </div>
        <div className="obj">
          <span>Publisher: </span>
          <input name="publisher" onChange={handleChange} type="text" placeholder="Publisher" value={inputs.publisher} />
        </div>
        <div className="obj">
          <span>ISBN: </span>
          <input name="isbn" onChange={handleChange} type="text" placeholder="ISBN" value={inputs.isbn} />
        </div>
        <div className="obj">
          <span>Page Range: </span>
          <input name="pageRange" onChange={handleChange} type="text" placeholder="Page Range" value={inputs.pageRange} />
        </div>
        <DatePicker date={date} setDate={setDate} title="Publication Date" />

        <AddAuthor authors={authors} setAuthors={setAuthors} />

        <AddEditor editors={editors} setEditors={setEditors} />
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      <div className="error">{error}</div>
    </div>
  )
}
const EditJournal = ({ paper, setPaper, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [authors, setAuthors] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    //need to implement checks here
    var res = {};
    setError(null);
    setSending(true);
    const { title, ...rest } = inputs;
    if (location.state === null) {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, publishedOn: date };
      console.log(paper)
      res = await addPaper(paper, 'journal', token);
    }
    else {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, pid: inputs._id, publishedOn: date };
      console.log(paper)
      res = await editPaper(paper, 'journal', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeJournals());
      setPaper(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (paper) {
      const { authors, uid, createdAt, updatedAt, publishedOn, ...others } = paper;
      setDate(publishedOn);
      setInputs(others);
      setAuthors(authors);
    }
  }, [])

  return (
    <div className="frame">
      <div className="heading">
        <h1>{paper ? 'Edit Journal' : 'Add new Journal'}</h1>
      </div>
      <div className="field">

        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi} />
        </div>
        <div className="obj">
          <span>Journal Title: </span>
          <input name="journalTitle" onChange={handleChange} type="text" placeholder="Journal Title" value={inputs.journalTitle} />
        </div>
        <div className="obj">
          <span>ISSN: </span>
          <input name="issn" onChange={handleChange} type="text" placeholder="ISSN" value={inputs.issn} />
        </div>
        <div className="obj">
          <span>Volume: </span>
          <input name="volume" onChange={handleChange} type="text" placeholder="Volume" value={inputs.volume} />
        </div>
        <div className="obj">
          <span>Issue: </span>
          <input name="issue" onChange={handleChange} type="text" placeholder="Issue" value={inputs.issue} />
        </div>
        <div className="obj">
          <span>Page Range: </span>
          <input name="pageRange" onChange={handleChange} type="text" placeholder="Page Range" value={inputs.pageRange} />
        </div>
        <DatePicker date={date} setDate={setDate} title="Publication Date" />

        <AddAuthor authors={authors} setAuthors={setAuthors} />

      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      <div className="error">{error}</div>
    </div>
  )
}
const EditConference = ({ paper, setPaper, setOpenEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token);
  const [inputs, setInputs] = useState({});
  const [authors, setAuthors] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [conferenceDate, setConferenceDate] = useState(null);

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    //need to implement checks here
    var res = {};
    setError(null);
    setSending(true);
    const { title, ...rest } = inputs;
    if (location.state === null) {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, publishedOn: date, conferenceDate: conferenceDate };
      console.log(paper)
      res = await addPaper(paper, 'conference', token);
    }
    else {
      const paper = { ...rest, title: title.toLowerCase(), authors, _id: user._id, pid: inputs._id, publishedOn: date, conferenceDate: conferenceDate };
      console.log(paper)
      res = await editPaper(paper, 'conference', token);
    }
    console.log(res)
    if (res.status === 200) {
      dispatch(removeConferences());
      setPaper(null);
      setOpenEditor(false);
    }
    else setError(res.response.data.message);
    setSending(false);
  }
  useEffect(() => {
    if (paper) {
      const { authors, uid, createdAt, updatedAt, publishedOn, conferenceDate, ...others } = paper;
      setDate(publishedOn);
      setConferenceDate(conferenceDate);
      setInputs(others);
      setAuthors(authors);
    }
  }, [])
  return (
    <div className="frame">
      <div className="heading">
        <h1>{paper ? 'Edit Conference Paper' : 'Add new Conference Paper'}</h1>
      </div>
      <div className="field">
        <div className="obj">
          <span>Title: </span>
          <input name="title" onChange={handleChange} type="text" placeholder="Title" value={inputs.title} />
        </div>
        <div className="obj">
          <span>DOI: </span>
          <input name="doi" onChange={handleChange} type="text" placeholder="DOI" value={inputs.doi} />
        </div>
        <div className="obj">
          <span>Conference Title: </span>
          <input name="conferenceTitle" onChange={handleChange} type="text" placeholder="Conference Title" value={inputs.conferenceTitle} />
        </div>
        <div className="obj">
          <span>Publisher: </span>
          <input name="publisher" onChange={handleChange} type="text" placeholder="Publisher" value={inputs.publisher} />
        </div>
        <div className="obj">
          <span>ISBN: </span>
          <input name="isbn" onChange={handleChange} type="text" placeholder="ISBN" value={inputs.isbn} />
        </div>
        <div className="obj">
          <span>Conference Location: </span>
          <input name="location" onChange={handleChange} type="text" placeholder="Conference Location" value={inputs.location} />
        </div>
        <DatePicker date={date} setDate={setDate} title="Publication Date" />
        <DatePicker date={conferenceDate} setDate={setConferenceDate} title="Conference Date" />
        <AddAuthor authors={authors} setAuthors={setAuthors} />
      </div>
      <button onClick={handleSubmit} disabled={sending}>Save</button>
      <div className="error">{error}</div>
    </div>
  )
}

export default EditResearchPaper