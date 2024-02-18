import React from 'react'

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

export default Book