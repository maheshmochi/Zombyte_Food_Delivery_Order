import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {

  const {
    getTotalCartAmount,
    token,
    foodList,
    cartItems,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // ================= FORM STATE =================
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= CART VALIDATION =================
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  // ================= PLACE ORDER =================
  const placeOrder = async (event) => {
    event.preventDefault();

    try {

      const orderItems = foodList
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        }));

      if (orderItems.length === 0) {
        alert("Cart is empty!");
        return;
      }

      const subtotal = getTotalCartAmount();
      const delivery = subtotal === 0 ? 0 : 2;

      const orderData = {
        address: data,
        items: orderItems,
        amount: subtotal + delivery
      };

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token }
        }
      );

      console.log("ORDER RESPONSE =", response.data);

      if (response.data.success) {

        const { session_url } = response.data;

        if (session_url) {
          window.location.href = session_url; // Stripe redirect
        } else {
          alert("Payment URL missing!");
        }

      } else {
        alert("Order failed!");
      }

    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong!");
    }
  };

  const subtotal = getTotalCartAmount();
  const delivery = subtotal === 0 ? 0 : 2;
  const total = subtotal + delivery;

  return (
    <form onSubmit={placeOrder} className='place-order'>

      {/* LEFT SIDE */}
      <div className="place-order-left">

        <p className='title'>Delivery Information</p>

        <div className='multi-fields'>
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First Name" required />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
        </div>

        <input name="email" value={data.email} onChange={onChangeHandler} placeholder="Email" required />
        <input name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" required />

        <div className='multi-fields'>
          <input name="city" value={data.city} onChange={onChangeHandler} placeholder="City" required />
          <input name="state" value={data.state} onChange={onChangeHandler} placeholder="State" required />
        </div>

        <div className='multi-fields'>
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip Code" required />
          <input name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" required />
        </div>

        <input name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" required />

      </div>

      {/* RIGHT SIDE */}
      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${delivery}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>

          <button type='submit'>
            PROCEED TO PAYMENT
          </button>

        </div>

      </div>

    </form>
  );
}

export default PlaceOrder;