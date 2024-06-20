import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cotton from "./components/Cotton";
import Kora from "./components/Kotta";
import SoftSilk from "./components/Softsilk";
import Pochampalli from "./components/Pochampalli";
import SilkCotton from "./components/Silkcotton";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Index from "./components/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Account from "./components/Account";
import ProductPage from "./components/Product";
import Wishlist from "./components/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";
import Forgotpassword from "./components/Forgotpassword";
import Cart from './components/Cart';
import { CartProvider } from "./context/CartContext"; // Import CartProvider

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Header onSearch={(query) => setSearchQuery(query)} />
      <WishlistProvider>
        <CartProvider> {/* Wrap your Routes with CartProvider */}
          <Routes>
            <Route path="/" element={<Index searchQuery={searchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgotpassword />} />
            <Route
              path="/cotton"
              element={
                <ProtectedRoute>
                  <Cotton searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kotta"
              element={
                <ProtectedRoute>
                  <Kora searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-silk"
              element={
                <ProtectedRoute>
                  <SoftSilk searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pochampalli"
              element={
                <ProtectedRoute>
                  <Pochampalli searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/silk-cotton"
              element={
                <ProtectedRoute>
                  <SilkCotton searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:category/:productId"
              element={
                <ProtectedRoute>
                  <ProductPage searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart searchQuery={searchQuery} />
                </ProtectedRoute>
              }
            />
            {/* Add other routes here */}
          </Routes>
        </CartProvider>
      </WishlistProvider>
      <Footer />
    </Router>
  );
};

export default App;
