import React from 'react';
import { Link } from 'react-router-dom';

const Register2 = () => {
  return (
    <div className="frame2">
            <div className="registration">
                    <span>Registration</span>
                    <form action="" className='form'>
                    <input name="name"  type="text" placeholder="Full name"/>
                    <input name="email"  type="email" placeholder="Email"/>
                    <input name="username"  type="text" placeholder="username"/>
                    <input name="password"  type="password" placeholder="password"/>
                    <input name="ph"  type="text" placeholder="contact number (optional)"/>
                    <input name="qualification"  type="text" placeholder="qualification (optional) "/>
                    {/* <MultipleSelectPlaceholder names={departmentNames} defaultLabel='Department' department={department} setDepartment={setDepartment}/> */}

                    </form>
                    <p>Already a User ? <Link to="/v2/login">Login</Link></p>
                    {/* <div className='warn'>{errorMsg}</div> */}
                    <button><span>Create</span></button>
              </div>
        </div>
  );
}

export default Register2