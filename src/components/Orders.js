import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail) {
        try {
          const response = await axios.get(
            "https://kharthikasarees-backend.onrender.com/api/get-order-details",
            {
              params: { email: userEmail },
            }
          );

          if (response.status === 200) {
            setOrderData(response.data);
            console.log(response.data);
          } else {
            console.error("Failed to fetch order data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="order-page">
      <div className="orders-container">
        <h2>Order Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orderData.length > 0 ? (
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>NO. OF PRODUCTS</th>
                  <th>STATUS</th>
                  <th>TOTAL</th>
                  <th>DATE ADDED</th>
                  <th>Product ID's</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.transaction_id}</td>
                    <td>{`${order.user_firstname} ${order.user_lastname}`}</td>
                    <td>{order.items.length}</td> {/* Assuming items is an array */}
                    <td>{order.status}</td> {/* Assuming status is provided by backend */}
                    <td>{order.total}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.items.map((item, index) => (
                        <span key={index}>{item.productId}{index < order.items.length - 1 ? ', ' : ''}</span>
                      ))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No order data found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
