// import React, { useEffect, useState } from 'react'
// import { Button, Link, Rating } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faCaretUp, faCircleXmark, faDeleteLeft, faDrumSteelpan, faHeart, faIndianRupee, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// import '../cart/Cart.css';
// import Quantitybox from '../../component/quantitybox/Quantitybox';
// import { Maximize } from '@mui/icons-material';
// import QuantityboxCart from '../../component/quantitybox/Quantitybox';
// import Payment from './Payment';
// import Header from '../../component/header/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCountCart } from '../../redux/actions';
// import { isUserLogin } from '../../utils/utils';
// import { useNavigate } from 'react-router-dom';



// function Cart() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const reduxCart = useSelector(state => state.cart)
//     const cartCount = reduxCart.cartCount
//     const CartData = JSON.parse(localStorage.getItem("productArr"))
//     const email = localStorage.getItem("email")
//     const CardArray = CartData?.[email]
//     console.log("CardArray", CardArray)
//     const [cartData, setcartdata] = useState(CardArray)
//     const [quantity, setquantity] = useState(1)
//     const [update, setUpdate] = useState(false)
    
// const totalPrices = cartData?.reduce((total, item) => {
//   return total + (item.unitPrice * item.quantity);
// }, 0) ?? 0;    
// console.log("totalPrices", totalPrices)

    
//     useEffect(()=> {
//         localStorage.setItem("productArr", JSON.stringify({[email] : cartData}))

//     },[update])
//     // const total = 0;
//     // for(let i in totalPrices) {
//     //     total = total + totalPrices[i];
//     // }
//     // console.log(total)

//     useEffect(() => {
//         setcartdata(cartData)
//       }, [update])

      
//       const deleteCartItem  = (idx) => {
//         const updatedCart = cartData.filter((item, index) => index !== idx) 
//         setcartdata(updatedCart)
//         if (cartCount && cartCount !== 0){
//             dispatch(setCountCart(cartCount - 1))
//         }

//         localStorage.setItem("productArr", JSON.stringify({[email] : updatedCart}))

        
//       }

//   return (
//     <>
//     <Header/>
//         <section className='cartpage'>
//             <div className='breadcrumbWrapper'>
//                 <div className='container-fluid'>
//                     <ul class="breadcrumb breadcrumb2 mb-0">
//                     <li><Link>Home</Link></li>
//                     <li><Link>Cart</Link></li>
//                     </ul>
//                 </div>
//             </div>
            
//             <div className='container-fluid'>
                
//                 <div className='row'>
//                     <div className='col-md-8'>
//                         <div className='table-responsive tablebox'>
//                             <table className='table'>
//                                 <thead>
//                                     <tr>
//                                         <th width='5%'></th>
//                                         <th width='50%'>Product</th>
//                                         <th width='15%'>Rate</th>
//                                         <th width='15%'>Quantity</th>
//                                         <th width='15%'>Price</th>
//                                     </tr>
//                                 </thead>
//                             <tbody>
//                                 {
//                                     cartData?.map((item, index) => {
//                                         return(
//                                             <tr>
//                                     <td><span  onClick={() => deleteCartItem(index)} className='delete'><FontAwesomeIcon icon={faCircleXmark}/></span></td>
//                                     <td>
//                                         <Link to="/product/1">
//                                             <div className='d-flex align-items-center cartitemimgwrapper'>
//                                                 <div className='imgwrapper w-50'>
//                                                     <img className='img-fluid' src={item.images[0]}/>
//                                                 </div>
//                                                 <div className='info px-3'>
//                                                     <h5>{`${item.name.slice(0,25)}...`}</h5>
//                                                     <p>{item.size}</p>
//                                                     <p>GNRM0032089_GREY</p>
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     </td>
//                                     <td style={{fontSize:'19px', color:'rgb(8, 68, 77)'}}><FontAwesomeIcon icon={faIndianRupee}/> {item.newprice}</td>
//                                     <td>
//                                         <div className='addcartsection d-flex align-items-center'>
                                            
//                                 <QuantityboxCart 
//                                 editable={true} 
//                                 oldprice={item.unitPrice}  // Pass unit price, not total
//                                 cartData={cartData} 
//                                 setCartData={setcartdata} 
//                                 index={index} 
//                                 update={update}  
//                                 setUpdate={setUpdate}
//                     />                                            
//                                         </div>



//                                     </td>
//                                     <td style={{fontSize:'19px', color:'orange-red'}}><FontAwesomeIcon icon={faIndianRupee}/> {item.newprice}</td>
//                                 </tr>
//                                         )
//                                     })
//                                 }
//                             </tbody>
                            
//                             </table>
//                         </div>
//                     </div>

//                     <div className='col-md-4'>
//                         <div className='cart p-3 cartdetail'>
//                             <h3>CART TOTAL</h3>
//                             <div className='total p-3'>
//                                 <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
//                                     <span style={{fontSize:'18px', color:'rgb(146, 146, 146)'}}>SUBTOTAL</span>
//                                     <span className='totalprice text-g'><FontAwesomeIcon icon={faIndianRupee}/> {totalPrices}</span>
//                                 </div>
//                                 {/* <div className='d-flex align-items-center mb-4 p-2 pt-1'>
//                                     <span style={{fontSize:'18px', color:'rgb(146, 146, 146)'}}>SUBTOTLE</span>
//                                     <span className='totalprice text-g'><FontAwesomeIcon icon={faIndianRupee}/> 20,000</span>
//                                     <br></br>
//                                     <br></br>
//                                 </div> */}

//                                 <br/>
// {isUserLogin() ? (
//   <Button
//     className='hoverbtn'
//     style={{ width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize" }}
//     onClick={() => navigate('/order')}
//   >
//     Continue
//   </Button>
// ) : (
//   <Button
//     className='hoverbtn'
//     style={{ width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize" }}
//     onClick={() => {
//       localStorage.setItem("redirectAfterLogin", "/cart");
//       navigate('/signin');
//     }}
//   >
//     Login to Pay
//   </Button>
// )}
//                                 {/* <Button className='checkout'>Proceed to checkout</Button> */}
//                                 {/* <p>we except all major credit cards.</p> */}
//                                 <div className='d-flex align-items-center'>
//                                     {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png'/>
//                                     <img src={require('../../asset/image/paytm.jpg')}/>
//                                     <img src='https://1000logos.net/wp-content/uploads/2017/03/MasterCard-Logo-1979.png'/> */}
                                    
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     </>
//   )
// }

// export default Cart



import React, { useEffect, useState } from 'react'
import { Button, Link, Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCircleXmark, faDeleteLeft, faDrumSteelpan, faHeart, faIndianRupee, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import '../cart/Cart.css';
import Quantitybox from '../../component/quantitybox/Quantitybox';
import { Maximize } from '@mui/icons-material';
import QuantityboxCart from '../../component/quantitybox/Quantitybox';
import Payment from './Payment';
import Header from '../../component/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCountCart } from '../../redux/actions';
import { isUserLogin } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const reduxCart = useSelector(state => state.cart)
    const cartCount = reduxCart.cartCount
    const CartData = JSON.parse(localStorage.getItem("productArr"))
    const email = localStorage.getItem("email")
    const CardArray = CartData?.[email]
    console.log("===== CART DATA FROM LOCALSTORAGE =====")
    console.log("CardArray:", CardArray)
    if (CardArray) {
        CardArray.forEach((item, idx) => {
            console.log(`Item ${idx}:`, {
                name: item.name || item.productTitle,
                price: item.price,
                unitPrice: item.unitPrice,
                oldprice: item.oldprice,
                originalPrice: item.originalPrice,
                subTotal: item.subTotal,
                newprice: item.newprice,
                quantity: item.quantity
            });
        });
    }
    console.log("=========================================")
    
    // Initialize cart data with proper price field - PRESERVE ORIGINAL UNIT PRICE
    const [cartData, setcartdata] = useState(() => {
        if (!CardArray) return CardArray;
        
        // Ensure each item has the correct price structure
        // CRITICAL: Store the ORIGINAL unit price separately so it never gets overwritten
        return CardArray.map(item => {
            // Priority order for finding the original unit price:
            // 1. If originalPrice exists, use it
            // 2. If unitPrice exists, use it
            // 3. If price exists, use it
            // 4. Calculate from subTotal/quantity
            // 5. Use oldprice as last resort
            
            let originalUnitPrice = item.originalPrice || item.unitPrice || item.price;
            
            // If still not found, calculate from subTotal/quantity
            if (!originalUnitPrice && item.subTotal && item.quantity && item.quantity > 0) {
                originalUnitPrice = item.subTotal / item.quantity;
            }
            
            // Last resort: use oldprice
            if (!originalUnitPrice) {
                originalUnitPrice = item.oldprice || 0;
            }
            
            console.log(`Initializing item ${item.name || item.productTitle}: originalPrice=${originalUnitPrice}, price=${item.price}, unitPrice=${item.unitPrice}, oldprice=${item.oldprice}`);
            
            return {
                ...item,
                originalPrice: originalUnitPrice,  // ← NEVER changes, always the original unit price
                price: originalUnitPrice,
                unitPrice: originalUnitPrice,
                subTotal: item.subTotal || item.newprice || (originalUnitPrice * (item.quantity || 1))
            };
        });
    })
    const [update, setUpdate] = useState(false)
    
    // Calculate total price using subTotal or newprice
    const totalPrices = cartData?.reduce((total, item) => {
      return total + (item.subTotal || item.newprice || 0);
    }, 0) ?? 0;    
    console.log("totalPrices", totalPrices)

    // Update localStorage whenever cartData changes
    useEffect(() => {
        if (cartData) {
            localStorage.setItem("productArr", JSON.stringify({[email] : cartData}))
        }
    }, [cartData, email])

    const deleteCartItem = (idx) => {
        const updatedCart = cartData.filter((item, index) => index !== idx) 
        setcartdata(updatedCart)
        if (cartCount && cartCount !== 0) {
            dispatch(setCountCart(cartCount - 1))
        }
    }

    return (
        <>
        <Header/>
            <section className='cartpage'>
                <div className='breadcrumbWrapper'>
                    <div className='container-fluid'>
                        <ul className="breadcrumb breadcrumb2 mb-0">
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
                                            <th width='5%'></th>
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
                                                <tr key={index}>
                                        <td><span onClick={() => deleteCartItem(index)} className='delete'><FontAwesomeIcon icon={faCircleXmark}/></span></td>
                                        <td>
                                            <Link to="/product/1">
                                                <div className='d-flex align-items-center cartitemimgwrapper'>
                                                    <div className='imgwrapper w-50'>
                                                        <img className='img-fluid' src={item.images[0]} alt={item.name}/>
                                                    </div>
                                                    <div className='info px-3'>
                                                        <h5>{`${item.name.slice(0,25)}...`}</h5>
                                                        <p>{item.size}</p>
                                                        <p>GNRM0032089_GREY</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td style={{fontSize:'19px', color:'rgb(8, 68, 77)'}}>
                                            <FontAwesomeIcon icon={faIndianRupee}/> {item.price || item.unitPrice || 0}
                                            {/* Debug: show what price is being used */}
                                            {!item.price && <span style={{color:'red', fontSize:'12px'}}> (Missing price!)</span>}
                                        </td>
                                        <td>
                                            <div className='addcartsection d-flex align-items-center'>
                                    <QuantityboxCart 
                                        editable={true} 
                                        oldprice={item.originalPrice || item.price || item.unitPrice}
                                        cartData={cartData} 
                                        setCartData={setcartdata} 
                                        index={index} 
                                        update={update}  
                                        setUpdate={setUpdate}
                                    />                                            
                                            </div>
                                        </td>
                                        <td style={{fontSize:'19px', color:'orangered'}}>
                                            <FontAwesomeIcon icon={faIndianRupee}/> {item.subTotal || item.newprice || 0}
                                        </td>
                                    </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                
                                </table>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='cart p-3 cartdetail'>
                                <h3>CART TOTAL</h3>
                                <div className='total p-3'>
                                    <div className='d-flex align-items-center p-2 pt-1 border-bottom'>
                                        <span style={{fontSize:'18px', color:'rgb(146, 146, 146)'}}>SUBTOTAL</span>
                                        <span className='totalprice text-g'><FontAwesomeIcon icon={faIndianRupee}/> {totalPrices}</span>
                                    </div>

                                    <br/>
                                    {isUserLogin() ? (
                                      <Button
                                        className='hoverbtn'
                                        style={{ width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize" }}
                                        onClick={() => navigate('/order')}
                                      >
                                        Continue
                                      </Button>
                                    ) : (
                                      <Button
                                        className='hoverbtn'
                                        style={{ width: "100%", backgroundColor: "rgb(8, 68, 77)", padding: "10px", color: "white", fontSize: "18px", textTransform: "capitalize" }}
                                        onClick={() => {
                                          localStorage.setItem("redirectAfterLogin", "/cart");
                                          navigate('/signin');
                                        }}
                                      >
                                        Login to Pay
                                      </Button>
                                    )}
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

export default Cart