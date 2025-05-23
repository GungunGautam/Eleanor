import React, { useEffect, useState } from 'react'
import '../Homecategory/Category.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

function Category(props) {

    const [catdata, setcatdata] = useState([]);
    const navigate = useNavigate()
    const opencategory = (cat) => {
        navigate(`category/${cat}`)
    }

    return (
        <>
            <section className='homecategory'>
                <div className='container-fluid'>
                    <hr className='text-light'></hr>
                    <h3 className='hd'>Shop By Category</h3>
                    <hr className='text-light'></hr>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={50}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper">

                        {
                            props.catdata?.length !== 0 && props.catdata?.map((cat, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='item text-center cursor' onClick={() => opencategory(cat.name)}>
                                            <img src={cat.images[0]} />
                                           <h5>{cat.name}</h5>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default Category