import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { myContext } from '../../App';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { editdata, fetchdatafromapi } from '../../utils/Api';
import Header from '../../component/header/Header';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
    const email = localStorage.getItem("email")
    const [user, setuser] = useState({});
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target
        setuser(prev => ({...prev, ...{[name] : value}}))
    }
    const onsubmit = (e) => {
        e.preventDefault()
        editdata("/api/user/update", user).then(res => {
            console.log('message',res)
            navigate('/')
        })
    }
console.log("user", user)
    useLayoutEffect(() => {

        fetchdatafromapi("/api/user/").then(data => {
            const user = data.filter(u => u.email === email)
            console.log('user', user, data)
            setuser(user[0]);
          })

        

    },[])


    return (
        <section className='cartSection mb-5 checkoutPage'>
            <Header/>
            <div className='container'>
                <form>
                    <div className='row'>
                                    <div className='col-md-12 d-flex justify-content-center'>
                            <div className='form w-50 mt-4 p-5 h-100 shadow'>
                                <FontAwesomeIcon icon={faUserCircle} style={{fontSize: "70px", marginLeft: "43%", marginBottom: "10px", opacity: ".4"}}/>
                                <h3 className='text-center mb-3'>Profile</h3>
                                <div className='form-group mb-3 mt-4'>
                                    Name : 
                                    <TextField id="outlined-basic1" placeholder="Enter Full Name" variant="outlined" className='w-100' value={user?.name} onChange={handleChange} name="name" />
                                </div>
                              
                                <div className='form-group mb-3'>
                                    Phone : 
                                    <TextField id="outlined-basic2" placeholder="Enter Phone Number." variant="outlined" className='w-100' value={user?.phone} onChange={handleChange} name="phone" />
                                </div>
                                <div className='form-group'>
                                    Address : 
                                    <TextField id="outlined-basic3" placeholder="Enter Full Address" variant="outlined" className='w-100' multiline
                                        rows={4} value={user?.address} onChange={handleChange} name="address" />
                                </div>
                                    <br/><br/>
                                    <Button className='btn-blue btn-lg' style={{textTransform: "capitalize", width: "100%", padding: "12px", fontSize: "18px", color: "white", backgroundColor: "rgb(8, 68, 77)"}} onClick={onsubmit}>Confirm</Button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UserProfile;