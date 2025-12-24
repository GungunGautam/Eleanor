import React, { useContext, useState } from 'react';
import '../signup/Signup.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { myContext } from '../../App';
import { postdata } from '../../utils/Api';

function Signup() {

  const context = useContext(myContext);
  const [showpassword, setshowpassword] = useState(false);

  const [formFields, setformFields] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: ""
  });

  const onchangeInput = (e) => {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value
    });
  };

  const register = (e) => {
    e.preventDefault();

    const { name, phone, email, password, address } = formFields;

    if (!name || !phone || !email || !password || !address) {
      context.setalert({
        open: true,
        error: true,
        msg: "Please fill all fields"
      });
      return;
    }

    postdata('/api/user/signup', formFields)
      .then(() => {
        context.setalert({
          open: true,
          error: false,
          msg: "Registration successful"
        });

        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      })
      .catch(error => {
        context.setalert({
          open: true,
          error: true,
          msg: error.response?.data?.message || "Registration failed"
        });
      });
  };

  return (
    <section className="signinpage">
      <div className='breadcrumbWrapper'>
                <div className='container-fluid'>
                  <ul class="breadcrumb breadcrumb2 mb-0">
                    <li><Link to="/" >Home</Link></li>
                    <li><Link>Sign In</Link></li>
                  </ul>
                </div>
              </div>
      <div className="container-fluid loginpage d-flex ">
         <div className='col-md-7 signinimg'>
              <img src="main.jpg"/>
        </div>
        <div className="card">
          <h4>SIGN UP</h4>

          <form onSubmit={register}>
            <TextField label="Name" name="name" className="w-100" onChange={onchangeInput} />
            <TextField label="Email" name="email" className="w-100 mt-3" onChange={onchangeInput} />
            <TextField label="Mobile Number" name="phone" type="text" className="w-100 mt-3" onChange={onchangeInput} />
            <TextField label="Address" name="address" className="w-100 mt-3" onChange={onchangeInput} />

            <div className="mt-3 position-relative">
             <TextField id="password" type={showpassword === false ? 'password' : 'text'} label="Password" name='password' className='w-100' onChange={onchangeInput} />
                                 <Button className='visible' onClick={() => setshowpassword(!showpassword)}>
                                   {
                                     showpassword === false ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                                   }
                                 </Button>
            </div>
                                   <br/>
        <div className='formgroup mt-3 d-flex align-items-center justify-content-center'>
                  <Button type='submit' className='signinbtn' style={{ color: 'white', backgroundColor: 'rgb(8, 68, 77, .8)', fontSize: '18px', padding: '8px', width: '130px', borderRadius: '0px', textTransform: 'capitalize' }}>SignUp </Button>
                </div>           
          </form>

          <p className="mt-3">
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
