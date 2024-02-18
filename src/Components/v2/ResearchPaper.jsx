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
    <div className="page">ResearchPaper - {location.state&&location.state.type}
      <Journals/>
      {/* <Book/>
      <Conference/>
      <Chapter/> */}
    </div>
  )
}

export default ResearchPaper