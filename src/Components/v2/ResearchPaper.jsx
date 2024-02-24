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
import EditIcon from '@mui/icons-material/Edit';
import EmptyList from '../v1/EmptyList';
import Loader from '../v1/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const ResearchPaper = () => {
    const location = useLocation();
    const [openEditor, setOpenEditor] = useState(false);
    const [paper, setPaper] = useState(null);
    const handleEditClick = (s) => {
        setPaper(s);
        setOpenEditor(true);
    }
    return (
        <div className="page">
            <div className="icon">
                <AddCircleOutline sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpenEditor(true)} />
            </div>
            {openEditor && <EditResearchPaper setOpenEditor={setOpenEditor} type={location.state.type} paper={paper} setPaper={setPaper} />}
            {location.state.type == 'Journals' && <Journals handleEditClick={handleEditClick} />}
            {location.state.type == 'Book Chapter' && <Chapter handleEditClick={handleEditClick} />}
            {location.state.type == 'Books' && <Book handleEditClick={handleEditClick} />}
            {location.state.type == 'Conference Papers' && <Conference handleEditClick={handleEditClick} />}
        </div>
    )
}

const Book = ({ handleEditClick }) => {
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
            {fetching === false && booksList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                booksList.map((book) => (
                    <div className="card">
                        <EditIcon onClick={() => handleEditClick(book)} />
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
                        <div className="obj">
                            <span>Refered/Non-Refered : </span>{book.refType}
                        </div>
                        <div className="obj">
                            <span>Nationality : </span>{book.nationality}
                        </div>
                        <div className="obj">
                            <span>Book Type : </span>{book.bookType}
                        </div>
                        <div className='obj'><span>Edition : </span>{book.edition}</div>
                    </div>
                ))
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
const Chapter = ({ handleEditClick }) => {
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
            {fetching === false && chaptersList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                chaptersList.map(chapter =>
                    <div className="card" key={chapter._id}>
                        <EditIcon onClick={() => handleEditClick(chapter)} />
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
                        <div className="obj">
                            <span>Nationality : </span>{chapter.nationality}
                        </div>
                        <div className="obj">
                            <span>Refered/Non-Refered : </span>{chapter.refType}
                        </div>
                    </div>)
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
const Conference = ({ handleEditClick }) => {
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
            {fetching === false && conferencesList.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                conferencesList.map(conference =>
                    <div className="card">
                        <EditIcon onClick={() => handleEditClick(conference)} />
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
                        <div className="obj">
                            <span>Nationality : </span>{conference.nationality}
                        </div>
                    </div>
                )
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
const Journals = ({ handleEditClick }) => {
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
            {fetching === false && Journals.length === 0 ?
                <EmptyList qoute={'Nothing to show here. Please add your Books'} />
                : ''}
            {fetching === false ?
                journalsList.map(journal =>
                    <div className="card">
                        <EditIcon onClick={() => handleEditClick(journal)} />
                        <div className="obj">
                            <span>Title: </span>{Capitalize(journal.title)}
                        </div>
                        <div className="obj">
                            <span>Authors : </span>
                            <ul>
                                {journal.authors.map((a) =>
                                    <li>
                                        {`${a.first}` + " " + `${a.middle ? a.middle : ''}` + " " + `${a.last}`}
                                        {a.corresponding ? <PersonIcon sx={{ color: '#8787d8' }} /> : ''}
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
                        <div className="obj">
                            <span>Refered/Non-Refered : </span>{journal.refType}
                        </div>
                    </div>)
                :
                <Loader />
            }
            {error ?
                <div className='error'><ReportProblemIcon />Unable to fetch data:{error}</div>
                : ''}
        </div>
    )
}
export default ResearchPaper