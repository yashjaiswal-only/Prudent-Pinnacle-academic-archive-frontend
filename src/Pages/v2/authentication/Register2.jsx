import React from 'react';
import { Link } from 'react-router-dom';
import MultipleSelectPlaceholder from '../../../Components/v1/DepartmentSelector';
import { departmentNames } from '../../../data';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUser, register } from '../../../api_calls/Auth';
import { CircularProgress } from '@mui/material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../firebase";


const Register2 = () => {
  const [inputs, setInputs] = useState({});
  const [department, setDepartment] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleClick = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!inputs.username || !inputs.password) {
      if (!inputs.username) setError('Username is Required');
      if (!inputs.password) setError('Password is Required');
      setLoading(false);
      return;
    }

    const a = await checkUser(inputs.username)
    console.log(a);
    if (a.status !== 200 || (a.status === 200 && a.data.found)) {
      setError('Username already exists');
      setLoading(false);
      return;
    }

    if (file) {
      console.log(file)
      const fileName = new Date().getTime() + file ? file.name : '';
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default: console.log('upload stoped default')
          }
        },
        (error) => {
          console.log(error)
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            const user = { ...inputs, department, avatar: downloadURL };
            // console.log(downloadURL)
            console.log(user);
            const res = await register(dispatch, user);
            console.log(res)
            if (res.status == 200) navigate('/login', { state: { newlyRegister: true } });
            else setError('Something went wrong, unable to register..')
          });
        }
      );
    }
    else {
      const user = { ...inputs, department };
      console.log(user)
      const res = await register(dispatch, user);
      console.log(res)
      if (res.status == 200) navigate('/login', { state: { newlyRegister: true } });
      else setError('Something went wrong, Unable to register..')
    }
    setLoading(false)
  }
  return (
    <div className="frame2">
      <div className="registration">
        <span>Registration</span>
        <form action="" className='form'>
          <input name="name" onChange={handleChange} type="text" placeholder="Full name" />
          <input name="email" onChange={handleChange} type="email" placeholder="Email" />
          <input name="username" onChange={handleChange} type="text" placeholder="username" />
          <input name="password" onChange={handleChange} type="password" placeholder="password" />
          <input name="ph" onChange={handleChange} type="text" placeholder="contact number (optional)" />
          <input name="qualification" onChange={handleChange} type="text" placeholder="qualification (optional) " />
        </form>
        <MultipleSelectPlaceholder names={departmentNames} defaultLabel='Department' department={department} setDepartment={setDepartment} />
        <div className='imagebox'>
          <label htmlFor="avatar">YOUR IMAGE:</label>
          <input name="avatar" id='avatar' onChange={e => setFile(e.target.files[0])} type="file" />
        </div>
        <p>Already a User ? <Link to="/login">Login</Link></p>
        <div className='warn'>{error}</div>
        <button onClick={handleClick} disabled={loading}>
          <span>Create</span>
          {loading && <CircularProgress />}
        </button>
      </div>
    </div>
  );
}

export default Register2