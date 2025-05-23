import React from 'react'
import '../about/About.css';
import Header from '../../component/header/Header';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Header />

      <div className='aboutsection' >
        <h1>About Us</h1>

        <div className='breadcrumb'>
          <div className='breadcrumbWrapper'>
            <div className='container-fluid'>
              <ul class="breadcrumb breadcrumb2 mb-0">
                <li><Link to={'/'}>Home</Link></li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='smileyface mt-4'>
          <img src={require("../../asset/image/smiling-emoticon-square-face.png")} />
        </div>

        <h2>Royalty of Indian Heritage</h2>

        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='img'>
                <img src='https://cdn-appdata.seasonsindia.com/uploads/gallery_images/1-47503.jpg' />
              </div>
            </div>
            <div className='col-md-6 textfirstimg'>
              <h3>Eleanor Fashion</h3>
              <br />
              <p>Eleanor Fashion is all about Indian heritage and beauty. Eleanor Fashion is all about timeless Indian fashion rooted in contemporary style. Our clothes embody the spirit of Indian modern women from minimal to heavily embellished. How the name suggests the Indian royalty and heritage our aim is to women reach all the women living in India and outside Indian had access to modern and ethnic fashion. </p>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-md-6 textfirstimg'>
              <h3>Our approach</h3>
              <br />
              <p>We are a one-stop online platform offering the widest range of Indian trendy fashion. Eleanor Fashion offers all you need in ethnic fashion like Saree, Salwar Kameez, Lehenga Choli, and much more attires.</p>
            </div>
            <div className='col-md-6'>
              <div className='img2'>
                <img src='https://cdn.shopify.com/s/files/1/0049/3649/9315/files/Header_480x480.jpg?v=1582097107' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col textlast'>
              <h1 className='text-center'>Look great ! Feel even better.</h1>
              <br/>
              <p>We have thousand of the latest Indian fashionable cloths at the best prices. Eleanor Fashion allows you to make the perfect look for every occasion. Whether it is designer saree, party wear lehenga, festive wear salwar kameez or cocktail gown everything available on Eleanor Fashion.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About