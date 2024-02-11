import React,{useEffect} from 'react'
import './profile.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Degree from '@mui/icons-material/School';
import Department from '@mui/icons-material/AccountBalance';

const MyProfile = () => {
  const user=useSelector(state=>state.user.currentUser)
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null) navigate('/v2/login');
  },[])
  return (
    <>
    {user?<div className='frame'>
      <div className="details">
          <div className="heading">
            <h1>{user.name}</h1>
            <h2>@{user.username}</h2>
          </div>
          <div className="labels">
            <div className="obj"><EmailIcon fontSize="large"/> {user.email}</div>
            <div className="obj"><PhoneIcon fontSize="large"/>{user.ph} </div>
            <div className="obj"><Degree fontSize="large"/> {user.qualification}</div>
            <div className="obj"><Department fontSize="large"/> {user.department}</div>
          </div>
      </div>
      <div className="pic">
        <img src={user.avatar}/>
      </div>
    </div>:''}
    </>
  )
}

export default MyProfile