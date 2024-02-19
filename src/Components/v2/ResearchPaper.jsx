import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'

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

const Book = () => {
  return (
    <div className="slide">
        <div className="heading">
            Books
        </div>
        <div className="card">
            <div className="obj">
                <span>Title: </span>
                Artificial prey-predator (app): an efficient approach for numerical function optimization
            </div>
            <div className="obj">
            <span>Authors : </span>
            <ul>
              <li>Nishant</li>
              <li>Yash</li>
            </ul>
            </div>
            <div className="obj">
                <span>Publisher : </span>
                Expert Systems with Applications Eng
            </div>
            <div className="obj">
                <span>Published on : </span>
                2006-12-02
            </div>

            <div className="obj">
                <span>DOI : </span>
                https://doi.org/10.1057/9874330369955_14
            </div>
            <div className="obj">
                <span>ISBN : </span>
                841265521
            </div>
        </div>
    </div>
  )
}
const Chapter = () => {
  return (
    <div className="slide">
        <div className="heading">
            Book Chapter
        </div>
        <div className="card">
            <div className="obj">
                <span>Title: </span>
                Artificial prey-predator (app): an efficient approach for numerical function optimization
            </div>
            <div className="obj">
            <span>Authors : </span>
            <ul>
              <li>Nishant</li>
              <li>Yash</li>
            </ul>
            </div>
            <div className="obj">
            <span>Editors : </span>
            <ul>
              <li>Jan</li>
              <li>Chan</li>
            </ul>
            </div>
            <div className="obj">
                <span>Book Title : </span>
                Expert Systems with Applications Eng
            </div>
            <div className="obj">
                <span>Publisher : </span>
                RD Sharma
            </div>
            <div className="obj">
                <span>Published on : </span>
                2006-12-02
            </div>

            <div className="obj">
                <span>DOI : </span>
                https://doi.org/10.1057/9874330369955_14
            </div>
            <div className="obj">
                <span>ISBN : </span>
                841-265-521
            </div>
            <div className="obj">
                <span>Page Range : </span>
                1-30
            </div>
        </div>
    </div>
  )
}
const Conference = () => {
  return (
    <div className="slide">
        <div className="heading">
            Conferences
        </div>
        <div className="card">
            <div className="obj">
                <span>Title: </span>
                Artificial prey-predator (app): an efficient approach for numerical function optimization
            </div>
            <div className="obj">
            <span>Authors : </span>
            <ul>
              <li>Nishant</li>
              <li>Yash</li>
            </ul>
            </div>
            <div className="obj">
                <span>Conference Title : </span>
                Expert Systems with Applications Eng
            </div>
            <div className="obj">
                <span>Conference Date : </span>
                2006-12-02
            </div>
            <div className="obj">
                <span>Published on: </span>
                2006-12-02
                
            </div>
            <div className="obj">
                <span>Publisher : </span>
                Spring
            </div>

            <div className="obj">
                <span>DOI : </span>
                https://doi.org/10.1057/9874330369955_14
            </div>
        </div>
    </div>
  )
}
const Journals = () => {
  return (
    <div className="slide">
        <div className="heading">
            Journals
        </div>
        <div className="card">
            <div className="obj">
                <span>Title: </span>
                Artificial prey-predator (app): an efficient approach for numerical function optimization
            </div>
            <div className="obj">
            <span>Authors : </span>
            <ul>
              <li>Nishant</li>
              <li>Yash</li>
            </ul>
            </div>
            <div className="obj">
                <span>Journal Title : </span>
                Expert Systems with Applications Eng
            </div>
            <div className="obj">
                <span>Published on : </span>
                2006-12-02
            </div>

            <div className="obj">
                <span>DOI : </span>
                https://doi.org/10.1057/9874330369955_14
            </div>
            <div className="obj">
                <span>ISSN : </span>
                841265521
            </div>
            <div className="obj">
                <span>ISSN : </span>
                841265521
            </div>
            <div className="obj">
                <span>Volume : </span>
                3
            </div>
            <div className="obj">
                <span>Issue : </span>
                1
            </div>
            <div className="obj">
                <span>Page Range : </span>
                1-30
            </div>
        </div>
    </div>
  )
}
export default ResearchPaper