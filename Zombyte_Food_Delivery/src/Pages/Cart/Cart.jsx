import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

function Cart() {

  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">

      <div className="cart-items">

        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />
        <br />

        {
          foodList.map((item) => {

            if (cartItems[item._id] > 0) {

              return (
                <div
                  key={item._id}
                  className="cart-item-title cart-items-item"
                >

                  <img
                    className='cart-items-item-img'
                    src={url + "/images/" + item.image}
                    alt={item.name}
                  />

                  <p>{item.name}</p>

                  <p>${item.price}</p>

                  <p>{cartItems[item._id]}</p>

                  <p>
                    ${item.price * cartItems[item._id]}
                  </p>

                  <p
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>

                </div>
              );
            }

            return null;
          })
        }

      </div>

      <div className="cart-bottom">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>

              <b>
                ${getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2}
              </b>

            </div>

          </div>

          <button onClick={() => navigate('/placeorder')}>
            PROCEED TO CHECKOUT
          </button>

        </div>

        <div className="cart-prompcode">

          <div>

            <p>If you have a promo code, Enter it here</p>

            <div className="cart-promocpde-input">

              <input
                type="text"
                placeholder='Promo Code (Ex: SAVE10)'
              />

              <button>
                Submit Here
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart