import { Link } from 'react-router-dom';
import '../footer/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
    return(

        <>
        <footer>
        <div className='container-fluid'>
                    <div className='row mt-5 linkwrap'>
                        <div className='col'>
                            <h4>Company</h4>
                            <ul>
                                <li><Link to={'https://www.google.com/maps'} className='text-decoration-none'><FontAwesomeIcon icon={faLocationDot}/> 41, Second Floor, Navjivan Industrial &emsp;&emsp;Society, Laxmi Nagar, Agra, Uttar &emsp;&emsp;Pradesh 282003</Link></li>
                                <li className='list-inline-item cursor'><Link to={'mailto: eleanorfashion@gmail.com'} className='text-decoration-none'><FontAwesomeIcon icon={faEnvelope}/>eleanorfashion@gmail.com</Link></li>
                                <Link to={'tel: ‪+91-7927293310‬'} className='text-decoration-none'><li><FontAwesomeIcon icon={faPhone}/>‪+91-7927293310‬</li></Link>

                        </ul>
                        </div>

                        <div className='col'>
                            <h4>Account</h4>
                            <ul>
                                <li><Link to = '/footer/about'>About Us</Link></li>
                                <li><Link to = '/footer/termandcondition'>Terms & Contitions</Link></li>
                                {/* <li><Link to = '#'>Returns & Exchanges</Link></li> */}
                                <li><Link to = '/footer/privacypolicy'>Privacy Policy</Link></li>

                            </ul>
                        </div>

                        <div className='col'>
                            <h4>Useful Links</h4>
                            <ul>
                                <li><Link to = '/footer/contactus'>Contact Us</Link></li>
                                {/* <li><Link to = '#'>My Account</Link></li> */}

                            </ul>
                        </div>

                        <div className='col icon'>
                            <h4>Social Media</h4>
                            <h5>Follow Us:</h5>
                            <ul className='list list-inline ml-auto mb-0 d-flex mt-4'>
                                <li className='list-inline-item'><FacebookOutlinedIcon/></li>
                                <li className='list-inline-item'><InstagramIcon/></li>
                                <li className='list-inline-item'><TwitterIcon/></li>
                                <li className='list-inline-item'><TelegramIcon/></li>

                            </ul>
                        </div>
                    </div>

                    <div className='copyright mt-3 pt-3 pb-3'>
                        <p className='mb-0'>Copyright 2024. All rights reserved</p>
                    </div>

                </div> 
            </footer>
            </>

    )
}
export default Footer


