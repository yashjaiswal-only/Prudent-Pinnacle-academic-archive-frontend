import React, { useEffect, useState } from 'react'
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Degree from '@mui/icons-material/School';
import Department from '@mui/icons-material/AccountBalance';
import { CancelOutlined, CreateOutlined } from '@mui/icons-material';
import { departmentNames } from '../../../data';
import MultipleSelectPlaceholder from '../../../Components/v1/DepartmentSelector';
import { checkUser, updateUser } from '../../../api_calls/Auth';
import { updateCurrentUser } from '../../../redux/userRedux';

const MyProfile = () => {
  const user = useSelector(state => state.user.currentUser)
  const [editProfile, setEditProfile] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) navigate('/v2/login');
  }, [])
  return (
    <>
      {user ? <div className='frame'>
        {editProfile && <Edit setEditProfile={setEditProfile} />}
        <div className="details">
          <div className="heading">
            <img className="pic" src={user.avatar} />
            <section>
              <h1>{user.name}</h1>
              <h2>@{user.username}</h2>
            </section>
            <CreateOutlined sx={{ fontSize: '2rem', color: 'white', cursor: 'pointer' }} onClick={() => setEditProfile(true)} />
          </div>
          <div className="labels">
            <div className="obj"><EmailIcon fontSize="large" /> {user.email}</div>
            <div className="obj"><PhoneIcon fontSize="large" />{user.ph} </div>
            <div className="obj"><Degree fontSize="large" /> {user.qualification}</div>
            <div className="obj"><Department fontSize="large" /> {user.department}</div>
          </div>
        </div>
      </div> : ''}
    </>
  )
}


const Edit = ({ setEditProfile }) => {
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const [department, setDepartment] = useState(user.department);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    ph: user.ph,
    qualification: user.qualification
  });
  const dispatch = useDispatch();
  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const res = await updateUser({ ...inputs, _id: user._id, department }, token);
    if (res.status === 200) {
      const res2 = await checkUser(user.username);  //to get the new details
      console.log(res2)
      if (res2.status === 200) {
        dispatch(updateCurrentUser(res2.data))
        setLoading(false)
        setEditProfile(false)
      }
      else setError('Something went wrong, Unable to update...')
    }
    else setError('Something went wrong, Unable to update...')
    setLoading(false);
  }
  return (
    <div className='edit'>
      <div className="wrapper">
        <CancelOutlined sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setEditProfile(false)} />
        <div className="frame">
          <div className="heading">
            <h1>Edit Profile</h1>
          </div>
          <div className="field">
            <div className="obj">
              <span>Name: </span>
              <input name="name" onChange={handleChange} type="text" placeholder="Full name" value={inputs.name} />
            </div>
            <div className="obj">
              <span>Email: </span>
              <input name="email" onChange={handleChange} type="email" placeholder="Email" value={inputs.email} />
            </div>
            <div className="obj">
              <span>Qualification: </span>
              <input name="qualification" onChange={handleChange} type="text" placeholder="qualification" value={inputs.qualification} />
            </div>
            <div className="obj">
              <span>Contact Number: </span>
              <input name="ph" onChange={handleChange} type="text" placeholder="contact number" value={inputs.ph} />
            </div>
            <div className="obj">
              <span>Department: </span>
              <MultipleSelectPlaceholder names={departmentNames} defaultLabel='Department' department={department} setDepartment={setDepartment}/>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading}>Save</button>
          <div className="error">{error}</div>
        </div>
      </div>
    </div>
  )
}
export default MyProfile