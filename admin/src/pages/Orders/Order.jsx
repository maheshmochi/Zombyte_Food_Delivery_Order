import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Order({ url }) {

  const [orders, setOrders] = useState([]);

  // ================= FETCH ALL ORDERS =================
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to load orders");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ================= STATUS UPDATE =================
  const statusHandler = async (event, orderId) => {
    try {

      const token = localStorage.getItem("token"); // 🔥 IMPORTANT

      const res = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            token
          }
        }
      );

      if (res.data.success) {
        toast.success("Status Updated");
        fetchAllOrders(); // refresh UI
      } else {
        toast.error(res.data.message || "Update failed");
      }

    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  return (
    <div className='order'>

      <h2>Order Page</h2>

      <div className="order-list">

        {orders.map((order) => (
          <div className="order-card" key={order._id}>

            {/* LEFT ICON */}
            <div className="order-img">
              📦
            </div>

            {/* ITEMS + ADDRESS */}
            <div className="order-items">

              <p>
                {order.items?.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <div className="order-address">
                <p><b>{order.address?.firstName}</b></p>
                <p>{order.address?.street}</p>
                <p>{order.address?.city}, {order.address?.state}</p>
                <p>{order.address?.phone}</p>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="order-right">

              <p><b>Items:</b> {order.items?.length}</p>
              <p><b>₹{order.amount}</b></p>

              {/* STATUS DROPDOWN */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancel">Cancel Order</option>
              </select>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Order;