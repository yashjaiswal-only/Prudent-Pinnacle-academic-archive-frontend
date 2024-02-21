import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material';
import './style.scss'
import EditActivities from './EditRecords/EditActivities';

const Activities = () => {
  const location=useLocation();
  const [openEditor,setOpenEditor]=useState(true);
return (
  <div className="page">
      <div className="icon">
          <AddCircleOutline sx={{fontSize:'3rem',cursor:'pointer'}} onClick={()=>setOpenEditor(true)}/>
      </div>
      {openEditor&&<EditActivities setOpenEditor={setOpenEditor} type={location.state.type}/>}
    {location.state.type=='Invited Talk'&&<Invitedtalk/>}
    {location.state.type=='Society Membership'&&<Society/>}
  </div>
)
}

const Invitedtalk = () => {
  return (
    <div className="slide">
        <div className="heading">
            Invited Talks
        </div>
        <div className="card">
            <div className="obj">
                <span>Title : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Venue: </span>
                INDIA
            </div>
            <div className="obj">
                <span>Date : </span>
                2023-12-02
            </div>
        </div>
    </div>
  )
}
const Society = () => {
  return (
    <div className="slide">
        <div className="heading">
            Society Memberships
        </div>
        <div className="card">
            <div className="obj">
                <span>Name : </span>
                Magnetic 
            </div>
            <div className="obj">
            <span>Duration : </span>
                2 years
            </div>
            
        </div>
    </div>
  )
}

export default Activities