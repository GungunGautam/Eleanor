import React, { useState } from 'react';
import '../Listing/Listing.css';
import Productitem from '../../component/productitem/Productitem';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { fetchdatafromapi } from '../../utils/Api';
import Slider from '../home/slider/Sliderbar';
import Header from '../../component/header/Header';

function Listing() {

    const [productview, setproductview] = useState('four');
    const [productdata, setproductdata] = useState([]);
    const {id} = useParams();

    useEffect(() => {
      fetchdatafromapi(`/api/products/category?catName=${id}`).then(res => {
        console.log(res);
        setproductdata(res)
      })
    },[id])
    
  return (
    <>
    <Header/>
      <section className='productlistpage'>
        <div className='container-fluid'>
            <div className='listcontent mt-4'>
                <div className='listitembanner'>
                    <div className='listinfo'>

                    </div>
                </div>
                <div className='productlisting'>
                  {
                    productdata?.map((item, index) => {
                      return(
                        <Productitem key={index} itemview={productview} item={item}/>
                      )
                    })
                  }
                </div>

            </div>
        </div>
      </section>
    </>
  )
}

export default Listing