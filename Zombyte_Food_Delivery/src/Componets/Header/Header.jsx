import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your Favorite Food here..</h2>
                <p>Explore a wide variety of delicious meals, freshly prepared
                    by top restaurants near you. From spicy street food and cheesy
                    pizzas to healthy salads and sweet desserts, ZomByte brings
                    your favorite flavors right to your doorstep with fast and
                    reliable delivery service.</p>
                <button>Order Now</button>
            </div>
        </div>
    )
}

export default Header