import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import '../signup/Signup.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from 'bootstrap';
import { Button } from '@mui/material';
import { myContext } from '../../App';
import { postdata } from '../../utils/Api';

function Signup() {

  const context = useContext(myContext);

  const [showpassword, setshowpassword] = useState(false);
  // const [showpassword1, setshowpassword1] = useState(false);

  const [formFields, setformFields] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    isAdmin: false,
  });

  const onchangeInput = (e) => {
    setformFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  }

  const register = (e) => {
    console.log(formFields);
    e.preventDefault();

    try {
      if (formFields.name === "") {
        context.setalert({
          open: true,
          error: true,
          msg: "Please fill all fields"
        })
        return false;
      }

      if (formFields.phone === "") {
        context.setalert({
          open: true,
          error: true,
          msg: "Please fill all fields"
        })
        return false;
      }
      
      if (formFields.address === "") {
        context.setalert({
          open: true,
          error: true,
          msg: "Please fill all fields"
        })
        return false;
      }

      if (formFields.email === "") {
        context.setalert({
          open: true,
          error: true,
          msg: "Please fill all fields"
        })
        return false;
      }

      if (formFields.password === "") {
        context.setalert({
          open: true,
          error: true,
          msg: "Please fill all fields"
        })
        return false;
      }

      postdata('/api/user/signup', formFields).then((res) => {
        // console.log(res)

        context.setalert({
          open: true,
          error: false,
          msg: "Registration successful"
        })

        setTimeout(() => {
          window.location.href = "/signin";

        }, 2000)

      }).catch(error => {
        console.error("Register error", error);
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className='signinpage'>
        <div className='breadcrumbWrapper'>
          <div className='container-fluid'>
            <ul class="breadcrumb breadcrumb2 mb-0">
              <li><Link to="/" >Home</Link></li>
              <li><Link>Sign Un</Link></li>
            </ul>
          </div>
        </div>

        <div className='container-fluid loginpage'>
          <div className='row'>
            <div className='col-md-7 signinimg'>
              <img src='https://apiserver.seasonsindia.com/uploads/feature_images/Seasons-22-Mar-2108-01-01-01.jpg' />
            </div>

            <div className='card'>
              <h4>SIGN UP</h4>
              <h3>CREATE ACCOUNT</h3>

              <form onSubmit={register}>
                <div className='formgroup'>
                  <TextField id="name" type='name' label="Name" name='name' className='w-100' onChange={onchangeInput} />
                </div>
                <div className='formgroup mt-4'>
                  <TextField id="email" type='email' label="Email Address" name='email' className='w-100' onChange={onchangeInput} />
                </div>
                <div className='formgroup mt-4'>
                  <TextField id="number" type='number' label="Mobile Number" name='phone' className='w-100' onChange={onchangeInput} />
                </div>
                <div className='formgroup mt-4'>
                  <TextField id="address" type='text' label="Address" name='address' className='w-100' onChange={onchangeInput} />
                </div>
                <div className='formgroup mt-4'>
                  <div className='position-relative'>
                    <TextField id="password" type={showpassword === false ? 'password' : 'text'} label="Password" name='password' className='w-100' onChange={onchangeInput} />
                    <Button className='visible' onClick={() => setshowpassword(!showpassword)}>
                      {
                        showpassword === false ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                      }
                    </Button>
                  </div>
                </div>
                {/* <div className='formgroup mt-4'>
                  <div className='position-relative'>
                    <TextField id="cinfirm_password" type={showpassword1 === false ? 'password' : 'text'} label="Confirm Password" name='confirm_password' className='w-100' />
                    <Button className='visible' onClick={() => setshowpassword1(!showpassword1)}>
                      {
                        showpassword1 === false ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                      }
                    </Button>
                  </div>
                </div> */}
                <div className='formgroup mt-5 d-flex align-items-center justify-content-center'>
                  <Button type='submit' className='signinbtn' style={{ color: 'white', backgroundColor: 'rgb(8, 68, 77, .8)', fontSize: '18px', padding: '8px', width: '130px', borderRadius: '0px', textTransform: 'capitalize' }}>Sign Un</Button>
                </div>

                <div className='formgroup mt-3 d-flex align-items-center justify-content-center'>
                  <p style={{ color: 'rgb(135, 135, 135)' }}>Already have an account? <Link to={'/signin'} style={{ textDecoration: 'none', color: 'rgb(8, 68, 77)' }}>Login</Link></p>
                </div>

              </form>

            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default Signup