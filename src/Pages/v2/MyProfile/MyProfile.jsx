import React,{useEffect, useState} from 'react'
import './profile.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Degree from '@mui/icons-material/School';
import Department from '@mui/icons-material/AccountBalance';
import { CancelOutlined, CreateOutlined } from '@mui/icons-material';

const MyProfile = () => {
  const user=useSelector(state=>state.user.currentUser)
  const [editProfile,setEditProfile]=useState(true);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null) navigate('/v2/login');
  },[])
  return (
    <>
    {user?<div className='frame'>
      {editProfile&&<Edit setEditProfile={setEditProfile}/>}
      <div className="details">
          <div className="heading">
              <img className="pic" src={user.avatar}/>
              <section>
                <h1>{user.name}</h1>
                <h2>@{user.username}</h2>
              </section>
              <CreateOutlined sx={{fontSize:'2rem',color:'white',cursor:'pointer'}} onClick={()=>setEditProfile(true)}/>
          </div>
          <div className="labels">
            <div className="obj"><EmailIcon fontSize="large"/> {user.email}</div>
            <div className="obj"><PhoneIcon fontSize="large"/>{user.ph} </div>
            <div className="obj"><Degree fontSize="large"/> {user.qualification}</div>
            <div className="obj"><Department fontSize="large"/> {user.department}</div>
          </div>
      </div>
    </div>:''}
    </>
  )
}


const Edit=({setEditProfile})=>{
  return (
    <div className='edit'>
        <div className="wrapper">
          <CancelOutlined sx={{fontSize:'2rem',cursor:'pointer'}} onClick={()=>setEditProfile(false)}/>
          <div className="frame">
            <div className="heading">
              <h1>Edit Profile</h1>
            </div>
            <div className="field">
              <div className="obj">
              <span>Name: </span>
              <input name="name"  type="text" placeholder="Full name" />
              </div>
              <div className="obj">
              <span>Email: </span>
              <input name="email" type="email" placeholder="Email"/>
        
              </div>
              <div className="obj">
              <span>Qualification: </span>
              <input name="qualification"  type="text" placeholder="Qualification"/>
        
              </div>
              <div className="obj">
              <span>Department: </span>
              {/* <MultipleSelectPlaceholder  defaultLabel='Department' /> */}
              </div>
            </div>
            <button>Save</button>
          </div>
        </div>
    </div>
  )
}
export default MyProfile