// Kotta.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/Cotton.css';
import Loading from "./Loading";
import { useWishlist } from "../context/WishlistContext";

const Pochampalli = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product details JSON
        const productDetailsResponse = await axios.get(`https://kharthikasarees.s3.eu-north-1.amazonaws.com/Pochampalli/ProductDetails.json`);
        const productData = productDetailsResponse.data;

        // Map product thumbnails to full URLs
        const productsWithThumbnails = productData.map(product => ({
          ...product,
          thumbnailLink: `${product.thumbnail}`
        }));

        setProducts(productsWithThumbnails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from S3:", error);
        setError("Error fetching data from S3");
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const handleWishlistToggle = (productId) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cotton-container">
      <div className="thumbnail-grid">
        {products.map((product) => (
          <div key={product.id} className="thumbnail-card">
            <Link to={`/Pochampalli/${product.id}`} style={{ textDecoration: 'none' }}>
              {product.thumbnailLink ? (
                <img
                  src={product.thumbnailLink}
                  alt={product.name}
                  className="thumbnail-image"
                />
              ) : (
                <div>No Image Available</div>
              )}
              <div className="thumbnail-card-text">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-price">₹{product.price}</p>
              </div>
            </Link>
            <span 
              className={`material-symbols-outlined heart-icon ${wishlist.includes(product.id) ? 'filled' : ''}`}
              onClick={() => handleWishlistToggle(product.id)}
            >
              favorite
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pochampalli;
