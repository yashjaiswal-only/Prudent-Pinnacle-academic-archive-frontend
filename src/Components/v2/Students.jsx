import React from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'


const Students = () => {
  const location = useLocation();
  console.log(location.state.type)
  return (
    <>
      {location.state ?
        <div className='page'>
          {location.state.type == 'B.Tech. Projects' && <Btp />}
          {location.state.type == 'M.Tech. Projects' && <Mtp />}
          {location.state.type == 'Phd.Scholars' && <Phd />}
        </div>
        : ''
      }
    </>
  )
}
const Btp = () => {
  return (
    <div className="slide">
      <div className="heading">
        B.Tech Projects
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>
        <div className="obj">
          <span>Major/Minor : </span>
          Major
        </div>

      </div>
    </div>
  )
}
const Mtp = () => {
  return (
    <div className="slide">
      <div className="heading">
        M.Tech Projects
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>

      </div>
    </div>
  )
}
const Phd = () => {
  return (
    <div className="slide">
      <div className="heading">
        Phd. Scholars
      </div>
      <div className="card">
        <div className="obj">
          <span>Title: </span>
          Artificial prey-predator (app): an efficient approach for numerical function optimization
        </div>
        <div className="obj">
          <span>Students : </span>
          <ul>
            <li>Nishant</li>
            <li>Yash</li>
          </ul>
        </div>
        <div className="obj">
          <span>Year : </span>
          2020
        </div>
      </div>
    </div>
  )
}
export default Students