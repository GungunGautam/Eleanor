import React from 'react'
import '../privacypolicy/PrivacyPolicy.css'
import { Link } from 'react-router-dom'
import Header from '../../component/header/Header'

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className='privacypolicysection'>
                <div className='breadcrumb'>
                    <div className='breadcrumbWrapper'>
                        <div className='container-fluid'>
                            <ul class="breadcrumb breadcrumb2 mb-0">
                                <li><Link to={'/'}>Home</Link></li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='info'>
                    <h1>PRIVACY POLICY</h1>
                    <p>Eleanor Fashion is committed to protecting all the information you share with us. We follow stringent procedures to help protect the confidentiality, security, and integrity of data stored on our systems. We are committed to ensuring that your privacy is protected. </p>
                    <h2>What information do we collect from you? </h2>
                    <ul className='listinfo list-inline'>
                        <li>Your name</li>
                        <li>Your mailing address</li>
                        <li>Your e-mail address</li>
                        <li>Your phone number</li>
                        <li>Location information</li>
                    </ul>
                    <h3>Automatic Information</h3>
                    <p>We use a third-party server to host our website which automatically logs the IP address you use to access our website. Like other websites, we also collect information through cookies. Through cookies, we collect browser and device characteristics, referring URLs, and a record of your interactions with our websites. By the use of cookies, we can create a more personalized shopping experience on our website. </p>
                    <p>To help us understand and enhance our interactions with visitors to our websites, we may permit web analytics providers to collect information on our websites using automated tools like cookies. We also may share personal information with those providers. We may have similar arrangements with interest-based advertisers. Interest-based advertising is covered in more detail below.</p>
                    <p>Our website also collects certain information such as your specific location to help you with your local currency and shipping cost.</p>
                    <h3>Public Information</h3>
                    <p>We offer publicly accessible blogs and reviews on our website. You should be aware that if you have provided any information on this area will be accessed publically.</p>
                    <h2>HOW DO WE PROTECT THE INFORMATION WE COLLECT</h2>
                    <p>Whether you are shopping on the web or in our stores, we utilize sensible safety efforts to safeguard the secrecy of individual data under our influence and properly limit admittance to it. Eleanor Fashion can't guarantee or warrant the security of any data you send to us and you go ahead despite copious advice to the contrary.</p>
                    <h2>YOUR CHOICES REGARDING THE INFORMATION WE COLLECT</h2>
                    <h3>You may choose to:</h3>
                    <ul className='listinfo list-inline'>
                        <li>Stop receiving marketing or promotional e-mails, direct mail, phone, and mobile marketing communications</li>
                        <li>Update and correct your personal information</li>
                        <li>Request the removal of your personal information from our blog or community forum</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy