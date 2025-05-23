import React from 'react'
import '../contactus/Contact.css'
import Header from '../../component/header/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    return (
        <>
            <Header />

            <div className='contactsection'>

                <h1>Contact</h1>

                <div className='breadcrumb'>
                    <div className='breadcrumbWrapper'>
                        <div className='container-fluid'>
                            <ul class="breadcrumb breadcrumb2 mb-0">
                                <li><Link to={'/'}>Home</Link></li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='row mt-5'>
                        <div className='col-md-6 d-flex justify-content-center flex-direction-column'>
                            <div className='info m-5'>
                                <h2>Contact information</h2>
                                <br/>
                                <p>We love to hear from you on our customer service, merchandise, website or any topics you want to share with us. Your comments and suggestions will be appreciated. Please complete the form below.</p>
                                <br/>
                                <ul className='list-inline'>
                                    <li className='list-inline-item'><Link to={'https://www.google.com/maps'} className='text-decoration-none'> <FontAwesomeIcon icon={faLocationDot}/> 41, Second Floor, Navjivan Industrial Society, Laxmi Nagar, Agra, Uttar Pradesh &emsp;&emsp;282003</Link></li>
                                    <Link to={'tel: ‪+91-7927293310‬'} className='text-decoration-none'><li><FontAwesomeIcon icon={faPhone}/>‪+91-7927293310‬</li></Link>
                                    <li className='list-inline-item cursor'><Link to={'mailto: eleanorfashion@gmail.com'} className='text-decoration-none'><FontAwesomeIcon icon={faEnvelope}/>eleanorfashion@gmail.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='img'>
                                <img src='https://www.lashkaraa.com/cdn/shop/collections/1_543dcdef-9b5f-409f-bf79-993c0d588ee9.jpg?v=1706367211&width=1500'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact