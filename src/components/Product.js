import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Product.css";
import Loading from "./Loading";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { category, productId } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart, removeFromCart } = useCart();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://kharthikasarees.s3.amazonaws.com/${category}/ProductDetails.json`
        );
        const products = response.data;
        const product = products.find((p) => p.id === productId);
        if (!product) {
          setError("Product not found");
        } else {
          setProductData(product);
          setIsInWishlist(wishlist.includes(productId));
          setIsInCart(cart.some((item) => item.id === productId));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [category, productId, wishlist, cart]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productId);
      setIsInWishlist(false);
    } else {
      addToWishlist(productId);
      setIsInWishlist(true);
    }
  };

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(productId);
      setIsInCart(false);
    } else {
      addToCart({ ...productData, category });
      setIsInCart(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-container">
      <div className="product-title-container">
        <h1 className="product-title">Product Page</h1>
      </div>
      <div className="content-container">
        <div className="vertical-queue">
          {[1, 2, 3, 4, 5].map((index) => {
            const imageUrl = productData[`image${index}`];
            return <img key={index} src={imageUrl} alt={`Product ${index}`} />;
          })}
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {[1, 2, 3, 4, 5].map((index) => {
              const imageUrl = productData[`image${index}`];
              return (
                <div key={index}>
                  <img src={imageUrl} alt={`Product ${index}`} />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="buttons-container">
          <h2 className="spe-pro-title">{productData.name}</h2>
          <button
            className="add-to-cart-button"
            onClick={handleCartToggle}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
          <button
            className="add-to-wishlist-button"
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <p className="description">{productData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
