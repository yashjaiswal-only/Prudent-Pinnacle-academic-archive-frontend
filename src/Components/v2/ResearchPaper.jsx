import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { AddCircleOutline } from '@mui/icons-material';
import EditResearchPaper from './EditRecords/EditResearchPaper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaper } from '../../api_calls/Papers';
import { updateBooks, updateChapters, updateConferences, updateJournals } from '../../redux/papersRedux';
import { Capitalize } from '../../services';
import PersonIcon from '@mui/icons-material/Person';


const ResearchPaper = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(false);
    return (
        <div className="page">
            <div className="icon">
                <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
            </div>
            {openEditor && <EditResearchPaper setOpenEditor={setOpenEditor} type={location.state.type} />}
            {location.state.type == 'Journals' && <Journals />}
            {location.state.type == 'Book Chapter' && <Chapter />}
            {location.state.type == 'Books' && <Book />}
            {location.state.type == 'Conference Papers' && <Conference />}
        </div>
    )
}

const Book = () => {
    const [booksList, setBooksList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { books } = useSelector(state => state.papers)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllPaper(user._id, 'book', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateBooks(res.data));
            setBooksList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (books) setBooksList(books);
        else get();
        console.log(books)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Books
            </div>
            {
                booksList.map((book) => (
                    <div className="card">
                        <div className="obj">
                            <span>Title: </span>{Capitalize(book.title)}
                        </div>
                        <div className="obj">
                            <span>Authors : </span>
                            <ul>
                                {book.authors.map((a) =>
                                    <li>
                                        {`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}
                                        {a.corresponding ? <PersonIcon sx={{ color: '#8787d8' }} /> : ''}
                                    </li>)}
                            </ul>
                        </div>
                        <div className="obj">
                            <span>Publisher : </span>{book.publisher}
                        </div>
                        <div className="obj">
                            <span>Published on : </span>{book.publishedOn}
                        </div>

                        <div className="obj">
                            <span>DOI : </span>{book.doi}
                        </div>
                        <div className="obj">
                            <span>ISBN : </span>{book.isbn}
                        </div>
                        <div className='obj'><span>Edition : </span>{book.edition}</div>

                    </div>
                ))
            }
        </div>
    )
}
const Chapter = () => {
    const [chaptersList, setChaptersList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { chapters } = useSelector(state => state.papers)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();
    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllPaper(user._id, 'chapter', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateChapters(res.data));
            setChaptersList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (chapters) setChaptersList(chapters);
        else get();
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Book Chapter
            </div>
            {
                chaptersList.map(chapter =>
                    <div className="card" key={chapter._id}>
                        <div className="obj">
                            <span>Title: </span>{Capitalize(chapter.title)}
                        </div>
                        <div className="obj">
                            <span>Authors : </span>
                            <ul>
                                {chapter.authors.map((a) =>
                                    <li>
                                        {`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}
                                        {a.corresponding ? <PersonIcon sx={{ color: '#8787d8' }} /> : ''}
                                    </li>)}
                            </ul>
                        </div>
                        <div className="obj">
                            <span>Editors : </span>
                            <ul>
                                {chapter.editors.map((a) => <li>{`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}</li>)}
                            </ul>
                        </div>
                        <div className="obj">
                            <span>Book Title : </span>{chapter.bookTitle}
                        </div>
                        <div className="obj">
                            <span>Publisher : </span>{chapter.publisher}
                        </div>
                        <div className="obj">
                            <span>Published on : </span>{chapter.publishedOn}
                        </div>

                        <div className="obj">
                            <span>DOI : </span>{chapter.doi}
                        </div>
                        <div className="obj">
                            <span>ISBN : </span>{chapter.isbn}
                        </div>
                        <div className="obj">
                            <span>Page Range : </span>{chapter.pageRange}
                        </div>
                    </div>)
            }
        </div>
    )
}
const Conference = () => {
    const [conferencesList, setConferencesList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { conferences } = useSelector(state => state.papers)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllPaper(user._id, 'conference', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateConferences(res.data));
            setConferencesList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (conferences) setConferencesList(conferences);
        else get();
        console.log(conferences)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Conferences
            </div>
            {
                conferencesList.map(conference =>
                    <div className="card">
                        <div className="obj">
                            <span>Title: </span>{Capitalize(conference.title)}
                        </div>
                        <div className="obj">
                            <span>Authors : </span>
                            <ul>
                                {conference.authors.map((a) =>
                                    <li>
                                        {`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}
                                        {a.corresponding ? <PersonIcon sx={{ color: '#8787d8' }} /> : ''}
                                    </li>)}
                            </ul>
                        </div>
                        <div className="obj">
                            <span>Conference Title : </span>{conference.conferenceTitle}
                        </div>
                        <div className="obj">
                            <span>Conference Date : </span>{conference.conferenceDate}
                        </div>
                        <div className="obj">
                            <span>Published on: </span>{conference.publishedOn}

                        </div>
                        <div className="obj">
                            <span>Publisher : </span>{conference.publisher}
                        </div>

                        <div className="obj">
                            <span>DOI : </span>{conference.doi}
                        </div>
                        <div className="obj">
                            <span>ISBN : </span>{conference.isbn}
                        </div>
                        <div className="obj">
                            <span>Location : </span>{conference.location}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
const Journals = () => {
    const [journalsList, setJournalsList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const { journals } = useSelector(state => state.papers)
    const user = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();

    const get = async () => {
        setError(false);
        setFetching(true);
        const res = await getAllPaper(user._id, 'journal', token);
        console.log(res)
        if (res.status === 200) {
            dispatch(updateJournals(res.data));
            setJournalsList(res.data);
        }
        else setError(res.response.data.message);
        setFetching(false);
    }
    useEffect(() => {
        if (journals) setJournalsList(journals);
        else get();
        console.log(journals)
    }, [])
    return (
        <div className="slide">
            <div className="heading">
                Journals
            </div>
            {
                journalsList.map(journal=>
                    <div className="card">
                <div className="obj">
                    <span>Title: </span>{Capitalize(journal.title)}
                </div>
                <div className="obj">
                    <span>Authors : </span>
                    <ul>
              {journal.authors.map((a)=>
              <li>
              {`${a.first}`+" "+`${a.middle?a.middle:''}`+" "+`${a.last}`} 
              {a.corresponding?<PersonIcon sx={{color:'#8787d8'}}/>:''}
              </li>)}
            </ul>
                </div>
                <div className="obj">
                    <span>Journal Title : </span>{journal.journalTitle}
                </div>
                <div className="obj">
                    <span>Published on : </span>{journal.publishedOn}
                </div>

                <div className="obj">
                    <span>DOI : </span>{journal.doi}
                </div>
                <div className="obj">
                    <span>ISSN : </span>{journal.issn}
                </div>
                <div className="obj">
                    <span>Volume : </span>{journal.volume}
                </div>
                <div className="obj">
                    <span>Issue : </span>{journal.issue}
                </div>
                <div className="obj">
                    <span>Page Range : </span>{journal.pageRange}
                </div>
            </div>)
            }
        </div>
    )
}
export default ResearchPaper