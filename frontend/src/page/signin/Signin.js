import React, { useContext } from 'react';
import { useState } from 'react';
import '../signin/Signin.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from 'bootstrap';
import { Button } from '@mui/material';
import { myContext } from '../../App';
import { postdata } from '../../utils/Api';

function Signin() {

  const context = useContext(myContext);

  const [showpassword, setshowpassword] = useState(false);

  const [formFields, setformFields] = useState({
    email: "",
    password: "",
  })

  const onchangeInput = (e) => {
    setformFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  }

  const login =  (e) => {
    console.log(formFields);
    e.preventDefault();

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
    try {
       postdata('/api/user/signin', formFields).then((res) => {


        console.log("res", res.data.token)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", formFields.email)
        // localStorage.setItem("userId", res.user?.id)
        // context.setuser({
        //   name: res.user?.name,
        //   email: res.user?.email,
        // })

        // localStorage.setItem("user", JSON.stringify(context.user));

        context.setalert({
          open: true,
          error: false,
          msg: "Login successfully"
        })

        setTimeout(() => {
          window.location.href = "/"
          // context.isLogin(true)

        }, 2000)


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
              <li><Link>Sign In</Link></li>
            </ul>
          </div>
        </div>

        <div className='container-fluid loginpage'>
          <div className='row'>
            <div className='col-md-7 signinimg'>
              <img src='https://apiserver.seasonsindia.com/uploads/feature_images/Seasons-22-Mar-2108-01-01-01.jpg' />
            </div>

            <div className='card'>
              <h4 style={{ paddingTop: '150px' }}>SIGN IN</h4>
              <h3>WELCOME BACK</h3>

              <form onSubmit={login}>
                <div className='formgroup'>
                  <TextField id="email" type='email' label="Email Address" name='email' className='w-100' onChange={onchangeInput} />
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
                {/* <div className='formgroup mt-1'>
                  <Button className='forgetpswd' style={{ color: 'rgb(135, 135, 135)', backgroundColor: 'transparent', fontSize: '14px', width: 'auto', marginLeft: '367px', borderRadius: '0px', textTransform: 'capitalize' }}>Forget Password?</Button>
                </div> */}
                <div className='formgroup mt-3 d-flex align-items-center justify-content-center'>
                  <Button type='submit' className='signinbtn' style={{ color: 'white', backgroundColor: 'rgb(8, 68, 77, .8)', fontSize: '18px', padding: '8px', width: '130px', borderRadius: '0px', textTransform: 'capitalize' }}>Sign In</Button>
                </div>

                <div className='formgroup mt-3 d-flex align-items-center justify-content-center'>
                  <p style={{ color: 'rgb(135, 135, 135)' }}>Don't have an account? <Link to={'/signup'} style={{ textDecoration: 'none', color: 'rgb(8, 68, 77)' }}>Sign Up</Link></p>
                </div>

              </form>

            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default Signin;