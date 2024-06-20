import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import "../styles/Wishlist.css";
import Loading from "./Loading";
import EmptyBox from "../assets/giftBox.png";

const Wishlist = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSection = (product) => {
    const sectionRegex = /https:\/\/kharthikasarees\.s3\.eu-north-1\.amazonaws\.com\/([^/]+)\//;
    const thumbnail = product.thumbnail || '';
    const match = thumbnail.match(sectionRegex);
    return match ? match[1] : "";
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistedProducts(storedWishlist);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchWishlistedProducts = async () => {
      try {
        const sections = [
          "cotton",
          "Silkcotton",
          "Pochampalli",
          "KottaCotton",
          "Softsilk",
        ];
        const productPromises = sections.map((section) =>
          axios.get(
            `https://kharthikasarees.s3.eu-north-1.amazonaws.com/${section}/ProductDetails.json`
          )
        );
        const productResponses = await Promise.all(productPromises);
        const allProducts = productResponses.flatMap(
          (response) => response.data
        );

        setWishlistedProducts(
          allProducts.filter((product) => wishlist.includes(product.id))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlisted products:", error);
        setError("Error fetching wishlisted products");
        setLoading(false);
      }
    };

    fetchWishlistedProducts();
  }, [wishlist]);

  const handleToggleWishlist = (productId) => {
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
    <div>
      <h2 className="product-title">Wishlist</h2>
      {wishlistedProducts.length === 0 ? (
        <div className="emptyBox-container">
            <img src={EmptyBox} alt="emptyBox" className="emptyBox"></img>
            <p className="emptyBox-text">You'r wishlist is Empty!!..</p>
        </div>
      ) : (
        <div className="wishlist">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="wishlist-item">
              <Link
                to={`/${getSection(product)}/${product.id}`} 
                style={{ textDecoration: "none" }}
              >
                <img src={product.thumbnail} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                </div>
              </Link>
              <span
                className={`material-symbols-outlined heart-icon ${
                  wishlist.includes(product.id) ? "filled" : ""
                }`}
                onClick={() => handleToggleWishlist(product.id)}
              >
                favorite
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
