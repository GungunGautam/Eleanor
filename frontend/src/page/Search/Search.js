import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../component/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './Search.css';
import fallback from "../../asset/image/fallback.jpg";

function Search() {
  const location = useLocation();

  // ✅ normalize query safely
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get('q') || '').trim().toLowerCase();
  }, [location.search]);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch products ONCE
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        if (isMounted && Array.isArray(res.data)) {
          setAllProducts(res.data);
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => (isMounted = false);
  }, []);

  // ✅ filter products correctly
  const results = useMemo(() => {
    if (!query) return allProducts;

    return allProducts.filter(p =>
      p.name?.toLowerCase().includes(query) ||
      p.brand?.toLowerCase().includes(query) ||
      p.catName?.toLowerCase().includes(query) ||
      p.color?.toLowerCase().includes(query)
    );
  }, [query, allProducts]);

  return (
    <>
      <Header />

      <div className="search-page">
        <div className="container mt-4">
          <h2>
            Search Results for: <span>"{query || 'All Products'}"</span>
          </h2>
          <p>{loading ? 'Loading...' : `${results.length} products found`}</p>

          {loading ? (
            <p>Loading products...</p>
          ) : results.length > 0 ? (
            <div className="row">
              {results.map(product => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div className="product-card">
                      <img
                        src={product.images?.[0] || fallback}
                        alt={product.name}
                        onError={(e) => (e.target.src = fallback)}
                      />
                      <h5>{product.name}</h5>
                      <p>
                        <FontAwesomeIcon icon={faIndianRupee} /> {product.newprice}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <Link to="/">Back to Home</Link>
            </div>
          )}

        </div>
      </div>

      
    </>
  );
}

export default Search;


