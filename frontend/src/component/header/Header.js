import React, { useEffect, useState } from 'react'
import '../header/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faLocationDot, faHeart, faCartShopping, faUser, faGear, faSignOut, faMapLocation, faBars, faAddressBook, faCircleInfo, faContactCard, faPhone, faPencil, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Nav from "../header/nav/Nav";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from '../../App';
import { fetchdatafromapi } from '../../utils/Api';
import { useSelector } from 'react-redux';
import { isUserLogin } from '../../utils/utils';


const Header = () => {

  const context = useContext(myContext);
  const email = localStorage.getItem("email")
  const reduxCart = useSelector(state => state.cart)
  const CartData = JSON.parse(localStorage.getItem("productArr"))
  const localCartCount = CartData?.[email]?.length
  const cartCount = reduxCart.cartCount === 0 ? localCartCount : reduxCart.cartCount
  console.log("reduxState inside header", cartCount, localCartCount)
  const [accountopendropdown, setaccountopendropdown] = useState(false);
  const [catdata, setcatdata] = useState([]);
  const [featuredproduct, setfeaturedproduct] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [cartCounter, setCartCounter] = useState(cartCount)
  const [user, setuser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    setCartCounter(cartCount)
  }, [cartCount])

  const [isLogin, setisLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  if (!searchQuery.trim()) return;

  const timer = setTimeout(() => {
    navigate(`/search?q=${searchQuery.trim()}`);
  }, 600); // debounce delay

  return () => clearTimeout(timer);
}, [searchQuery, navigate]);  


  useEffect(() => {

    fetchdatafromapi('/api/category/').then(res => {
      setcatdata(res);
    })

    fetchdatafromapi('/api/products/featured').then(res => {
      setfeaturedproduct(res);
    })

    fetchdatafromapi('/api/subcategory/').then(res => {
      setsubcatdata(res);
    })

      fetchdatafromapi("/api/user/").then(data => {
        const userArray = Array.isArray(data) ? data : data?.users || [];
        const user = userArray.filter(u => u.email === email);
        console.log('user', user, data);
        setuser(user[0]);
      });

  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    window.location.reload(true)
  }

 const handleSearch = (e) => {
  e.preventDefault();

  if (!searchQuery.trim()) return;

  navigate(`/search?q=${searchQuery.trim()}`);
};



  return (
    <>
      <header>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-5 homeimg'>
              <img src={require('../../asset/image/WhatsApp Image 2024-06-08 at 11.40.34_4b5e508d1.jpg')} />
            </div>
            
            {/* Search Bar */}
            <div className='col-sm-3 d-flex align-items-center'>
              <div className='headersearch w-100'>
                <form onSubmit={handleSearch} className='search-form'>
                  <div className='search-wrapper'>
                    <input 
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />

                 <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} className="searchicon" />
                </button>

                  </div>
                </form>
              </div>
            </div>

            <div className='col-sm-4 d-flex align-items-center'>
              <div className='ml-auto d-flex align-items-center'>
                <ClickAwayListener onClickAway={() => setaccountopendropdown(false)}>
                  <ul className='list list-inline mb-0 headertab'>
                    <a href={'/cart/'}>
                      <li className='list-inline-item'>
                        <span><FontAwesomeIcon icon={faCartShopping} className='wishlisticon' />
                          <span className='wishlist bg-success rounded-circle'>{cartCounter}</span>
                        </span>
                      </li>
                    </a>
                    <a href={'/userprofile/'}>
                      <li className='list-inline-item'>
                        <div className='userimg'>
                          <FontAwesomeIcon icon={faUserCircle}/>
                          <p>{user?.name}</p>
                        </div>
                        <span>
                          <span className='wishlist pencilicon'><FontAwesomeIcon icon={faPencil}/></span>
                        </span>
                      </li>
                    </a>
                    <li className='list-inline-item'>
                      {
                        isUserLogin() ? <Link to={'/signin'}><Button onClick={logout} className='logout' style={{ background: "rgb(8, 68, 77)", opacity: ".8", color: "white", textTransform: "capitalize", fontSize: "18px", borderRadius: "40px", width: "100px" }}>Logout</Button></Link> : <Link to={'/signin'}><Button className='logout' style={{ background: "rgb(8, 68, 77)", opacity: ".8", color: "white", textTransform: "capitalize", fontSize: "18px", borderRadius: "40px", width: "100px", top: "-7px" }}>Sign In</Button></Link>
                      }
                    </li>
                  </ul>
                </ClickAwayListener>
              </div>
            </div>
          </div>
        </div>
      </header>

      {
        context.categorydata?.length !== 0 && <Nav navData={context.categorydata} />
      }
    </>
  )
}

export default Header