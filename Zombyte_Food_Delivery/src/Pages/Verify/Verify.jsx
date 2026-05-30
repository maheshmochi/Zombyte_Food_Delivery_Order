import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

function Verify() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {

    try {

      // 🔥 prevent duplicate call even on remount
      const alreadyVerified = localStorage.getItem("verified_" + orderId);

      if (alreadyVerified) return;

      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId }
      );

      // mark as done immediately
      localStorage.setItem("verified_" + orderId, "true");

      setTimeout(() => {
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/cart");
        }
      }, 1500);

    } catch (error) {
      console.log(error);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  useEffect(() => {
    if (orderId) {
      verifyPayment();
    }
  }, [orderId]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;