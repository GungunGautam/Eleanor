import React from 'react';
import '../nav/Nav.css';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faHeadphonesAlt, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchdatafromapi } from '../../../utils/Api';
import { useContext } from 'react';
import { myContext } from '../../../App';

function Nav(props) {

  const [productdata,  setproductdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const naviagte = useNavigate()
  console.log("categorydata", categorydata)
  useEffect(() => {

    fetchdatafromapi('/api/category').then(res => {
      setcategorydata(res);
    })

    fetchdatafromapi('/api/products?subcat=Kanjivaram_Silk').then(res => {
      setproductdata(res);
    })

  }, [])

  return (
    <div className='nav d-flex align-items-center'>
      <div className='container-fluid'>
        <div className='row position-relative'>

          <div className='col-md-0 part2 d-flex align-items-center justify-content-center position-static'>
            <nav>
              <ul className='list list-inline mb-0'>
                <li className='list-inline-item'>
                  <Button><Link to={'/'}>Shop All</Link></Button>
                </li>
                {
                  categorydata?.length && categorydata?.map((item, index) => {
                    return (
                      <li className='list-inline-item position-static'>
                        <Button onClick={() => `naviagte(/category/${item?.name})`}><Link>{item.name}</Link></Button>
                      </li>
                      
                    )
                  })
                }

              </ul>
            </nav>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Nav