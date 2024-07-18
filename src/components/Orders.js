import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";
import Loading from './Loading';

const Orders = () => {
  const [orderData, setOrderData] = useState(null);
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
          <Loading />
        ) : orderData ? (
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderData.transaction_id}</td>
                  <td>{`${orderData.user_firstname} ${orderData.user_lastname}`}</td>
                  <td><center>{orderData.items.length}</center></td>
                  <td>{orderData.status}</td> {/* Assuming status is pending */}
                  <td>{orderData.total}</td>
                  <td>{new Date(orderData.order_date).toLocaleDateString()}</td>
                </tr>
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
