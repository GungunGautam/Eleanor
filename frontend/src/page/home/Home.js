import React, { useEffect, useState } from 'react'
import Homebanner from '../home/slider/Sliderbar';
import '../home/Home.css';
import Productitem from '../../component/productitem/Productitem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HomeCatrgory from '../../component/Homecategory/Category';
import { fetchdatafromapi } from '../../utils/Api';
import Header from '../../component/header/Header';

function Home() {

  const [catdata, setcatdata] = useState([]);
  const [featuredproduct, setfeaturedproduct] = useState([]);

  useEffect(() => {

    fetchdatafromapi('/api/category/').then(res => {
      setcatdata(res);
      console.log("setcatdata(res);", res)
    })

    fetchdatafromapi('/api/products/featured').then(res => {
      setfeaturedproduct(res);
    })

  }, [])

  return (
    <>
      <Header />
      <Homebanner />
      {
        catdata?.length !== 0 && <HomeCatrgory catdata={catdata} />
      }


      <section className='homeproducts'>

        <div className='container-fluid productrow'>
          <div className='row'>
            <div className='col w-100'>
              <div className='d-flex align-items-center'>
                <div className='info w-100'>
                  <hr className='text-light'></hr>
                  <h3 className='mb-0 hd'>Trending Highlights</h3>
                  <p className='text-light text-sml mb-2'>Top View In This Week<span /></p>
                  <hr className='text-light'></hr>
                </div>
              </div>

              <div className='product_col productcol2 w-100 mt-4 d-flex'>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  navigation={true}
                  slidesPerGroup={1}
                  modules={[Navigation]}
                  className="mySwiper"
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

              <div className='d-flex mt-5 mb-5 bannersection'>
                <div className='banner'>
                  <img src={require('../../asset/image/Homebanner/sale9.png')} />
                  <div className='info info1'>
                    <h2 className='mb-4'>
                      Statement <br/> Style!
                    </h2>
                  </div>
                </div>
                <div className='banner '>
                  <img src={require('../../asset/image/Homebanner/sale10.png')} />
                  <div className='info info2'>
                    <h2 className='mb-4'>
                      Pre-Wedding
                    </h2>
                    <h1 className='mb-4'>
                      Festival Fits
                    </h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      <section className='newsletter mt-3 mb-3 d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col md-6'>
              <h2 className='text-white'>The Ultimate In-Store Experience Via <br /> 24*7 Shopping</h2>
              {/* <p className='text-light'>Subscribe Our Newsletter And Get Latest Offers And News</p> */}

              {/* <form>
                <FontAwesomeIcon icon={faEnvelope} />
                <input type='text' placeholder='Enter Your Email' />
                <Button className='subscribe'>Subscribe</Button>
              </form> */}

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home