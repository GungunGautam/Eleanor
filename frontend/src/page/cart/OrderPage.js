import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Link, Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCircleXmark, faDeleteLeft, faDrumSteelpan, faHeart, faIndianRupee, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import '../cart/Cart.css';
import Quantitybox from '../../component/quantitybox/Quantitybox';
import { Maximize } from '@mui/icons-material';
import QuantityboxCart from '../../component/quantitybox/Quantitybox';
import Payment from '../home/Payment';
import Header from '../../component/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCountCart } from '../../redux/actions';
import { isUserLogin } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { fetchdatafromapi } from '../../utils/Api';

function OrderPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const email = localStorage.getItem("email")
    const reduxCart = useSelector(state => state.cart)
    const cartCount = reduxCart.cartCount
    const CartData = JSON.parse(localStorage.getItem("productArr"))
    const CardArray = CartData?.[email]
    console.log("CardArray", CardArray)
    const [cartData, setcartdata] = useState(CardArray)
    const [quantity, setquantity] = useState(1)
    const [update, setUpdate] = useState(false)
    
    const totalPrices = cartData.map(item  => item.newprice).reduce((a, b) => (a + b))
    console.log("totalPrices", totalPrices)

    const [user, setuser] = useState({});

    // const total = 0;
    // for(let i in totalPrices) {
    //     total = total + totalPrices[i];
    // }
    // console.log(total)

    useEffect(() => {
        setcartdata(cartData)
      }, [update])

      useLayoutEffect(() => {

        fetchdatafromapi("/api/user/").then(data => {
            const user = data.filter(u => u.email === email)
            console.log('user', user, data)
            setuser(user[0]);
            // console.log(res);
          })

    },[])

  return (
    <>
    <Header/>
        <section className='cartpage'>
            <div className='breadcrumbWrapper'>
                <div className='container-fluid'>
                    <ul class="breadcrumb breadcrumb2 mb-0">
                    <li><Link>Home</Link></li>
                    <li><Link>Cart</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className='container-fluid'>
                
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='table-responsive tablebox'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th width='50%'>Product</th>
                                        <th width='15%'>Rate</th>
                                        <th width='15%'>Quantity</th>
                                        <th width='15%'>Price</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {
                                    cartData?.map((item, index) => {
                                        return(
                                            <tr>
                                    <td>
                                        <Link to="/product/1">
                                            <div className='d-flex align-items-center cartitemimgwrapper'>
                                                <div className='imgwrapper w-50'>
                                                    <img className='img-fluid' src={item.images[0]}/>
                                                </div>
                                                <div className='info px-3'>
                                                    <h5>{`${item.name.slice(0,25)}...`}</h5>
                                                    <p>{item.size}</p>
                                                    <p>GNRM0032089_GREY</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td style={{fontSize:'19px', color:'rgb(8, 68, 77, .8)'}}><FontAwesomeIcon icon={faIndianRupee}/> {item.newprice}</td>
                                    <td>
                                        <div className='addcartsection d-flex align-items-center'>
                                            
                                            <QuantityboxCart editable={false} oldprice= {CardArray[index].newprice} cartData={cartData} setCartData={setcartdata} index={index} update={update}  setUpdate={setUpdate}/>
                                            
                                        </div>
                                    </td>
                                    <td style={{fontSize:'19px', color:'red', opacity: ".7"}}><FontAwesomeIcon icon={faIndianRupee}/> 20,000</td>
                                </tr>
                                        )
                                    })
                                }
                            </tbody>
                            
                            </table>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='cart cartdetail'>
                            <div className='total shadow p-3'>
                            <h3 className='text-center'>ORDER</h3>
                                <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                    <span style={{fontSize:'18px', color:'rgb(146, 146, 146)'}}>Subtotal</span>
                                    <span className='totalprice text-g'><FontAwesomeIcon icon={faIndianRupee}/> {totalPrices}</span>
                                </div>
                                <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                    <span style={{fontSize:'18px', color:'rgb(146, 146, 146)'}}>Delivery</span>
                                    <span className='totalprice text-g ml-4'> Free </span>
                                </div>

                                <br/>
                                
                             <Button className='hoverbtn' style={{width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize"}} onClick={() => navigate('/thankyou')}>Place Order</Button>
                                
                                <div className='d-flex align-items-center'>
                                    
                                    
                                </div>
                            </div>

                            <div className='order mt-5 shadow border p-3'>
                                <h3 className='text-center'>DELIVERY ADDRESS</h3>
                                <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                    <span style={{fontSize:'18px', color:'rgb(0, 0, 0, .8)'}}>{user?.name}</span>
                                </div>
                                <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                    <span style={{fontSize:'18px', color:'rgb(0, 0, 0, .8)'}}>{user?.address}</span>
                                </div>
                                <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                    <span style={{fontSize:'18px', color:'rgb(0, 0, 0, .8)'}}>{user?.phone}</span>
                                </div>

                                <br/>
                                
                             <Button className='hoverbtn' style={{width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize"}} onClick={() => navigate('/checkout')}>Change</Button>
                                
                                <div className='d-flex align-items-center'>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}

export default OrderPage