import React, { useEffect, useState } from 'react';
import '../nav/Nav.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { fetchdatafromapi } from '../../../utils/Api';

function Nav() {

  const [productdata, setproductdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchdatafromapi('/api/category').then(res => {
      setcategorydata(res);
    });

    fetchdatafromapi('/api/products?subcat=Kanjivaram_Silk').then(res => {
      setproductdata(res);
    });
  }, []);

  return (
    <div className='nav d-flex align-items-center'>
      <div className='container-fluid'>
        <div className='row position-relative'>
          <div className='col-md-0 part2 d-flex align-items-center justify-content-center position-static'>
            <nav>
              <ul className='list list-inline mb-0'>

                {/* Shop All */}
                <li className='list-inline-item'>
                  <Button component={Link} to="/">
                    Shop All
                  </Button>
                </li>

                {/* Categories */}
                {categorydata?.length > 0 &&
                  categorydata.map((item, index) => (
                    <li className='list-inline-item position-static' key={index}>
                      <Button component={Link} to={`/category/${item.name}`}>
                        {item.name}
                      </Button>
                    </li>
                  ))
                }

              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
