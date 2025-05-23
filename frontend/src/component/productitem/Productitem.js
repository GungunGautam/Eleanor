import React, { useState } from 'react'
// import Rating from '@mui/material/Rating';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Model from '../../page/productmodel/Model';
import Header from '../header/Header';

function Productitem(props) {


  return (
    <>
      <a href={`/product/${props.item?._id}`} style={{textDecoration: "none"}}>
        <div className={`item productitem ${props.itemview}`}>
          <div className='imgwrapper'>
            <img src={props.item?.images[0]} />
            <img src={props.item?.images[1]} className='changeimg' />

            <span className='badge'>New</span>

            <div className='action'>

              <Button>Shop Now</Button>
            </div>
          </div>

          <div className='info'>
            <h4 className='text-capitalize'>{`${props?.item?.name.slice(0,25)}...`}</h4>

            <div className='d-flex'>
              <span className='oldprice'><FontAwesomeIcon icon={faIndianRupee} /> {props.item?.oldprice}</span>
              <span className='netprice'><FontAwesomeIcon icon={faIndianRupee} /> {props.item?.newprice}</span>
            </div>
          </div>
        </div>
      </a>



    </>
  )
}

export default Productitem