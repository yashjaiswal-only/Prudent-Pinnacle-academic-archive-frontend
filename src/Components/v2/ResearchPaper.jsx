import React from 'react'
import { useLocation } from 'react-router-dom'
import Journals from './Journals.jsx'
import Book from './Book.jsx'
import './style.scss'
import Conference from './Conference.jsx'
import Chapter from './Chapter.jsx'

const ResearchPaper = () => {
    const location=useLocation();
    console.log(location)
  return (
    <div className="page">
      {location.state.type=='Journals'&&<Journals/>}
      {location.state.type=='Book Chapter'&&<Chapter/>}
      {location.state.type=='Books'&&<Book/>}
      {location.state.type=='Conference Papers'&&<Conference/>}
    </div>
  )
}

export default ResearchPaper