import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Footer from './component/footer/footer';
import About from './page/about/About';
import Home from './page/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Model from './page/productmodel/Model';
import Listing from './page/Listing/Listing';
import Cart from './page/cart/Cart';
import Signup from './page/signup/Signup';
import Signin from './page/signin/Signin';
import { createContext } from 'react';
import { useEffect } from 'react';
import { fetchdatafromapi } from './utils/Api';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TermsAndCondition from './page/TermsAndConditions/TermsAndCondition';
import PrivacyPolicy from './page/privacypolicy/PrivacyPolicy';
import Contact from './page/contactus/Contact';
import Checkout from './page/checkout/Checkout';
import OrderPage from './page/cart/OrderPage';
import UserProfile from './page/userprofile/UserProfile';
import Thankyou from './page/cart/Thankyou';
import Payment from './page/cart/Payment';
import Search from './page/Search/Search.js';

const myContext = createContext();

function App() {

  const [categorydata, setcategorydata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [isLogin, setisLogin] = useState(false);
  const [cartdata, setcartdata] = useState([]);
  const [alert, setalert] = useState({
    msg: "",
    error: false,
    open: false
  })

  const [user, setuser] = useState({
    name: "",
    email: "",
    token: "",
    userId: "",
    address: "",
  })


  useEffect(() => {
    const name = localStorage.getItem("name");

    if(name !== "" && name !== undefined && name !== null) {
      setisLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setuser(userData);
    } else {
      setisLogin(false);
    }
  },[isLogin]);

  useEffect(() => {
    const catArr = [];
    fetchdatafromapi("/api/category/").then(res => {
      setcategorydata(res);
    })

    fetchdatafromapi("/api/subcategory/").then(res => {
      setsubcategorydata(res);
    })

    fetchdatafromapi("/api/products/").then(res => {
      setproductdata(res);
    })

    fetchdatafromapi("/api/user/").then(res => {
      setuser(res);
    })

  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setalert({
      open: false,
    });
  };

  const addtoCart = (id) => {
    // alert(id);
  }

  const values = {
    categorydata,
    setcategorydata,
    subcategorydata,
    setsubcategorydata,
    alert, 
    setalert,
    user,
    setuser,
    addtoCart,
    cartdata, 
    setcartdata,
    productdata,
    setproductdata,
  }

  return (
    <BrowserRouter>
      <myContext.Provider value={values}>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.error === false ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>

        {/* <Header /> */}
        {/* <Slider/> */}
        <Routes>
          <Route exact={true} path='/' element={<Home />} />
          <Route exact={true} path='/about' element={<About />} />
          <Route exact={true} path='/product/:id' element={<Model />} />
          <Route exact={true} path='/category/:id' element={<Listing />} />
          <Route exact={true} path='/cart' element={<Cart />} />
          <Route exact={true} path='/signup' element={<Signup />} />
          <Route exact={true} path='/signin' element={<Signin />} />
          <Route exact={true} path='/footer/termandcondition' element={<TermsAndCondition />} />
          <Route exact={true} path='/footer/about' element={<About />} />
          <Route exact={true} path='/footer/privacypolicy' element={<PrivacyPolicy />} />
          <Route exact={true} path='/footer/contactus' element={<Contact />} />
          <Route exact={true} path='/checkout' element={<Checkout />} />
          <Route exact={true} path='/order' element={<OrderPage />} />
          <Route exact={true} path='/userprofile' element={<UserProfile />} />
          <Route exact={true} path='/thankyou' element={<Thankyou />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/search" element={<Search />} />


        </Routes>
        <Footer />
      </myContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export {myContext};