import { Button, Link, Rating } from '@mui/material';
import React, { useContext, useEffect, useId } from 'react';
import { useState } from 'react';
import '../productmodel/Model.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowUpShortWide, faArrowsUpToLine, faBagShopping, faCaretDown, faCaretUp, faHeart, faIndianRupee, faRupee, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import InnerImageZoom from 'react-inner-image-zoom';
import Productitem from '../../component/productitem/Productitem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import Quantitybox from '../../component/quantitybox/Quantitybox';
import { myContext } from '../../App';
import { useParams } from 'react-router-dom';
import { fetchProductbyId, fetchdatafromapi } from '../../utils/Api';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setCountCart, updateCartAction } from '../../redux/actions';
import Header from '../../component/header/Header';

function Model(props) {

  //product images
  // const zoomslider = useRef();
  const { id } = useParams();
  const context = useContext(myContext);
  const [product, setProduct] = useState({})
  const [zoomimage, setzoomimage] = useState()
  const [bigimagesize, setbigimagesize] = useState([1800, 1800]);
  const [featuredproduct, setfeaturedproduct] = useState([]);
  const [smallimagesize, setsmallimagesize] = useState([120, 120]);
  const [itemSize, setItemSize] = useState('S')
  const [quantity, setquantity] = useState(1)
  const email = localStorage.getItem("email")

  useEffect(() => {

    // fetchdatafromapi('/api/category/').then(res => {
    //   setcatdata(res);
    //   console.log("setcatdata(res);", res)
    // })

    fetchdatafromapi('/api/products/featured').then(res => {
      setfeaturedproduct(res);
    })

  }, [])


  const goto = (url) => {
    setzoomimage(url);
  }

  //product size

  const [activesize, setactivesize] = useState(0); //set default index(0)

  useEffect(() => {

    fetchProductbyId(`/api/products/${id}`).then(data => {
      console.log(data)
      setProduct(data)
      setzoomimage(data.images[0])
    })

  }, [])

  const handleSize = (size, index) => {

    setactivesize(index);
    setItemSize(size);
  }



  //reviews and more
  const CartData = JSON.parse(localStorage.getItem("productArr"))
  const localCartCount = CartData?.[email]?.length
  const [activetabs, setactivetabs] = useState(0);
  // const [count, setCount] = useLocalStorage('count', 0);
  const [count, setCount] = useState(localCartCount || 0);

  const dispatch = useDispatch()
  const reduxCart = useSelector(state => state.cart)
  console.log("reduxState", reduxCart)

  const addtoCart = () => {
    // context.addtoCart(id)
    setCount(count + 1)
    dispatch(setCountCart(count + 1))
    // const cartProduct = { ...product, ...{ quantity: quantity }, ...{ size: itemSize } }
    if (Object.values(product).length > 0) {
      const cartProduct = { ...product, ...{ quantity: quantity }, ...{ size: itemSize } }
      const productArr = localStorage.getItem("productArr") ? localStorage.getItem("productArr") : JSON.stringify({ [email]: [cartProduct] })
      const oldProducts = JSON.parse(productArr)[email] ? JSON.parse(productArr)[email] : []
      const newProducts = [...oldProducts, ...[cartProduct]]
      console.log("newProducts", newProducts)
      localStorage.setItem("productArr", JSON.stringify({ [email]: newProducts }))
      // localStorage.setItem("cartLength")
      console.log("Add to cart working.....")

    }

    console.log("Add to cart working.....")

  }



  return (
    <>
      <Header />

      <section className='detailpage'>

        <div className='breadcrumbWrapper'>
          <div className='container-fluid'>
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li><Link>Home</Link></li>
              <li><Link>{product?.catName}</Link></li>
            </ul>
          </div>
        </div>

        <div className='container-fluid detailcontainer'>
          <div className='row'>
            <div className='col-md-100 part1'>
              <div className='row'>

                <div className='col-md-1 mt-5 zoomimages'>

                  {
                    product?.images?.length > 0 && product?.images?.map((imageUrl, index) => (
                      <div className='item'>
                        <img src={imageUrl}
                          onClick={() => goto(imageUrl, index)} />
                      </div>
                    )) 
                  }


                </div>

                <div className='col-md-5 mt-5'>
                  <div className='productzoom'>

                    {/* <InnerImageZoom src={${zoomimage}_${bigimagesize[0]}x${bigimagesize[0]}} zoomType='hover' zoomScale={1} /> */}
                    <img src={`${zoomimage}`} zoomtype='hover' zoomscale={1} />

                  </div>
                </div>

                <div className='col-md-6 mt-5 productinfo'>
                  <h1>{product?.name}</h1>
                  <div className='d-flex align-items-center mt-3'>
                    <Rating name='half-rating-read' defaultValue={3.5} precision={0.5} readOnly />
                    <span className='text-light'>(3 reviews)</span>
                  </div>

                  <div className='pricesection d-flex align-items-center'>
                    <span className='text-g pricelarge'><FontAwesomeIcon icon={faIndianRupee} /> {product?.newprice}</span>
                    <div className='d-flex'>
                      <span className='text-light' style={{ textDecoration: 'line-through', marginRight: '10px' }}><FontAwesomeIcon icon={faIndianRupee} /> {product?.oldprice}</span>
                      <span className='text-org'>20% off</span>
                    </div>
                  </div>


                  <p className='textsize'>Size Chart</p>

                  <div className='productsize d-flex align-items-center'>
                    <span>Size</span>
                    <ul className='list list-inline mb-0'>
                      <li className='list-inline-item'><a className={`tag ${activesize === 0 ? 'active' : ''}`} onClick={() => handleSize('S', 0)}>S</a></li>
                      <li className='list-inline-item'><a className={`tag ${activesize === 1 ? 'active' : ''}`} onClick={() => handleSize('M', 1)}>M</a></li>
                      <li className='list-inline-item'><a className={`tag ${activesize === 2 ? 'active' : ''}`} onClick={() => handleSize('L', 2)}>L</a></li>
                    </ul>
                  </div>

                  <div className='addcartsection pt-4 pb-2 d-flex align-items-center'>
                    <Quantitybox inputvalue={quantity} setinputvalue={setquantity} />

                    <Button onClick={() => addtoCart()} className='addtocart'><FontAwesomeIcon icon={faShoppingBag} />Add to Cart</Button>
                    {/* <a href='/cart'><Button className='wishlist'><FontAwesomeIcon icon={faShoppingCart} /> Buy Now</Button></a> */}

                  </div>

                  <hr></hr>

                  <div className='materialdetails mt-4'>
                    <ul className='detail1 list-inline mb-0'>
                      <h5 className='detail1heading'>Product Details</h5>
                      {
                        product?.description?.length !== 0 && product?.description?.map((item, index) => {
                          return(
                            <li className='list-inline-item text-capitalize' key={index}>{"- "+product?.description[index]}</li>
                          )
                        })
                      }
                      {/* <li className='list-inline-item text-capitalize'>{"- "+product?.description[1]}</li>
                      <li className='list-inline-item text-capitalize'>{"- "+product?.description[2]}</li>
                      <li className='list-inline-item text-capitalize'>{"- "+product?.description[3]}</li>
                      <li className='list-inline-item text-capitalize'>{"- "+product?.description[4]}</li> */}
                    </ul>
                    <br></br>
                  </div>

                  <hr></hr>

                </div>
              </div>
            </div>
          </div>

          <div className='card mt-5 pt-2 detailpagetabs'>
            <div className='customtabs'>
              <ul className='list list-inline'>
                <li className='list-inline-item'>
                  <Button className={`${activetabs === 0 && 'active'}`} onClick={() => setactivetabs(0)}>Product Specifications</Button>
                </li>
                <li className='list-inline-item'>
                  <Button className={`${activetabs === 1 && 'active'}`} onClick={() => setactivetabs(1)}>Shipping Information</Button>
                </li>
                <li className='list-inline-item'>
                  <Button className={`${activetabs === 2 && 'active'}`} onClick={() => setactivetabs(2)}>More Information</Button>
                </li>
                <li className='list-inline-item'>
                  <Button className={`${activetabs === 3 && 'active'}`} onClick={() => setactivetabs(3)}>Reviews (3)</Button>
                </li>
              </ul>

              {
                activetabs === 0 &&
                <div className='tabcontent mt-4'>
                  <ul className='list'>
                    <li className='list-inline-item'><b>Product Category:</b> {product?.catName}</li><br></br>
                    <li className='list-inline-item'><b>Fabric:</b> Raw Silk</li><br></br>
                    <li className='list-inline-item'><b>Work:</b> Cutdana</li><br></br>
                    <li className='list-inline-item'><b>Color:</b> {product?.color}</li><br></br>
                    <li className='list-inline-item'><b>Secondary Work:</b> sequins</li><br></br>
                    <li className='list-inline-item'><b>Neckline:</b> V neck</li><br></br>
                    <li className='list-inline-item'><b>Product Piece:</b> {product?.countInStock}</li><br></br>
                    <li className='list-inline-item'><b>Length:</b> Floor Length</li>
                  </ul>
                </div>
              }

              {
                activetabs === 1 &&
                <div className='tabcontent mt-4'>
                  <ul className='list'>
                    <li className='list-inline-item'><b>Dispatch:</b> Within 48 Hours*</li><br></br>
                    <li className='list-inline-item'><b>Delivery time (Metro Cities):</b> 1-3* business days</li><br></br>
                    <li className='list-inline-item'><b>Delivery time (Non-Metro Cities):</b> 3-5* business days</li><br></br>
                    <li className='list-inline-item'><b>Return/Exchange:</b> If you don't like your purchase, Return/Exchange within 7 days</li>
                  </ul>
                </div>
              }

              {
                activetabs === 2 &&
                <div className='tabcontent mt-4'>
                  <ul className='list'>
                    <h5 style={{ color: 'rgb(0,0,0,.6)', fontSize: '19px' }}>Packed and Marketed By:</h5>
                    <li className='list-inline-item'>Akya Retail Private Limited,</li><br></br>
                    <li className='list-inline-item'>19, Kamaraj Road,</li><br></br>
                    <li className='list-inline-item'>Bangalore-560001</li><br></br>
                    <li className='list-inline-item'>Country of Origin: India</li>
                  </ul>
                </div>
              }

              {
                activetabs === 3 &&
                <div className='tabcontent mt-4'>
                  <div className='row'>
                    <div className='col'>
                      <h4>Ratings & Reviews</h4>
                      <div className='card p-3 reviewcard flex-row'>
                        <div className='image'>
                          <div className='round-circle'>
                            <img src='https://images.unsplash.com/photo-1615022702095-ff2c036f3360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D' />
                          </div>
                          <span className='text-g d-block text-center font-weight-bold'>Antara</span>
                        </div>

                        <div className='info'>
                          <div className='d-flex align-items-center'>
                            <h5 className='text-light'>Oct, 2022</h5>
                            <div className='rating'>
                              <Rating name='half-rating-read' defaultValue={5} precision={0.5} readOnly style={{ fontSize: '20px' }} />
                            </div>
                          </div>
                          <p>Beautiful </p>
                        </div>

                      </div>
                      <div className='card p-3 reviewcard flex-row'>
                        <div className='image'>
                          <div className='round-circle'>
                            <img src={require('../../asset/image/pexels-gabiguerino-1839904.jpg')} />
                          </div>
                          <span className='text-g d-block text-center font-weight-bold'>Antara</span>
                        </div>

                        <div className='info'>
                          <div className='d-flex align-items-center'>
                            <h5 className='text-light'>Oct, 2022</h5>
                            <div className='rating'>
                              <Rating name='half-rating-read' defaultValue={5} precision={0.5} readOnly style={{ fontSize: '20px' }} />
                            </div>
                          </div>
                          <p>Beautiful </p>
                        </div>

                      </div>
                      <div className='card p-3 reviewcard flex-row'>
                        <div className='image'>
                          <div className='round-circle'>
                            <img src={require('../../asset/image/pexels-tomaz-barcellos-999425-1987301.jpg')} />
                          </div>
                          <span className='text-g d-block text-center font-weight-bold'>Antara</span>
                        </div>

                        <div className='info'>
                          <div className='d-flex align-items-center'>
                            <h5 className='text-light'>Oct, 2022</h5>
                            <div className='rating'>
                              <Rating name='half-rating-read' defaultValue={5} precision={0.5} readOnly style={{ fontSize: '20px' }} />
                            </div>
                          </div>
                          <p>Beautiful </p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>

          <hr></hr>

          <div className='moreproducts'>

            <h2>Related Products</h2>

            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              navigation={true}
              slidesPerGroup={1}
              modules={[Navigation]}
              className="moreproduct"
            >
              {
                featuredproduct?.length !== 0 && featuredproduct?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Productitem item={item} />
                    </SwiperSlide>
                  )
                })
              }

            </Swiper>

          </div>

        </div>
      </section>
    </>
  )
}

export default Model