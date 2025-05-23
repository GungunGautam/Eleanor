import React, { useEffect, useState } from 'react'
import '../slider/Sliderbar.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { fetchdatafromapi } from '../../../utils/Api';

function Sliderbar(props) {

  const { id } = useParams();
  const [productdata, setproductdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);

  useEffect(() => {

    fetchdatafromapi('/api/category').then(res => {
      setcategorydata(res);
    })

    fetchdatafromapi('/api/products?subcat=Kanjivaram_Silk').then(res => {
      setproductdata(res);
    })

  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    fade: true
  };

  return (
    <section className='homeslidebar'>
      <div className='container-fluid'>
        <Slider {...settings} className='homeslider'>

          <div className='item'>
            <img src={require('../../../asset/image/Slider image/sale13.png')} className='w-100' />
            <div className='info info1'>
              <h2 className='mb-4'>
                Dreamy<br />&nbsp; &nbsp; &nbsp; &nbsp; Pastels
              </h2>
              <p>Exclusive styles for destination weddings</p>
            </div>
          </div>
          <div className='item'>
            <img src={require('../../../asset/image/Slider image/sale15.png')} className='w-100' />
            <div className='info info2'>
              <h2 className='mb-4'>
                New Collection
              </h2>
              <h1 className='mb-4'>
                Jewellery
              </h1>
              <p>Just for you</p>
              {/* <Link to={}><Button>Shop Now</Button></Link> */}
            </div>
          </div>
          <div className='item'>
            <img src={require('../../../asset/image/Slider image/sale14.png')} className='w-100' />
            <div className='info info3'>
              <h2 className='mb-4'>
                Check Out <br />Our Exclusive<br /> Bridal Range<br /> Now
              </h2>
              {/* <Button>Shop Now</Button> */}
            </div>
          </div>
          <div className='item'>
            <img src={require('../../../asset/image/Slider image/sale16.png')} className='w-100' />
            <div className='info info4'>
              <h2 className='mb-4'>
                New Arrival
              </h2>
              <h1 className='mb-4'>
                WOMEN<br /> &nbsp;&nbsp;SHOES
              </h1>
              <p>Check It Now</p>
            </div>
          </div>
          <div className='item'>
            <img src={require('../../../asset/image/Slider image/sale8.png')} className='w-100' />
            <div className='info info5'>
              <h1 className='mb-4'>
                Daily Elegance .. <br /> &nbsp;  Just For You
              </h1>
              <p>Bags that add an elegant touch to every women</p>
            </div>
          </div>

        </Slider>
      </div>
    </section>
  )
}

export default Sliderbar