import React, { useContext, useEffect, useRef, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { url, token } = useContext(StoreContext);

    const called = useRef(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                url + "/api/order/userOrders",
                {},
                {
                    headers: { token }
                }
            );

            setData(response.data?.data || []);

        } catch (error) {
            console.log(error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!token) return;

        if (called.current) return;

        called.current = true;

        fetchOrders();

    }, [token]);

    // 🔥 status color helper
    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered":
                return "delivered";
            case "Out for delivery":
                return "out";
            default:
                return "processing";
        }
    };

    return (
        <div className='my-orders'>
            <h2 className='my'>My Orders</h2>

            <div className="container">

                {loading ? (
                    <p>Loading orders...</p>
                ) : data.length === 0 ? (
                    <div className="empty">
                        <img src={assets.parcel_icon} alt="" />
                        <p>No orders found</p>
                    </div>
                ) : (
                    data.map((order) => (
                        <div className="my-orders-order" key={order._id}>

                            <img src={assets.parcel_icon} alt="parcel" />

                            <div className="order-info">

                                <p className="items">
                                    {order.items?.map((item, i) => (
                                        <span key={i}>
                                            {item.name} x {item.quantity}
                                            {i !== order.items.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>

                                <p className="amount">₹{order.amount}</p>
                                <p className="count">Items: {order.items?.length}</p>

                                <p className={`status ${getStatusClass(order.status)}`}>
                                    ● {order.status || "Processing"}
                                </p>

                                <button className="track-btn">Track Order</button>

                            </div>

                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default MyOrders;