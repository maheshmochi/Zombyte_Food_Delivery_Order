// import React from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'

// function Navbar() {
//     return (
//         <div className='navbar'>
//             <img className="logo" src={assets.kt} alt="sorry" />
//             <img className='profile' src={assets.profile_image} alt="" />

//         </div>
//     )
// }

// export default Navbar

import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

function Navbar() {
    return (
        <div className='navbar'>

            {/* Left Side */}
            <div className="navbar-left">
                <img className="logo" src={assets.kt} alt="logo" />

                <div className="navbar-title">
                    <h2>Admin Panel</h2>
                    <p>Manage your products & orders</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="navbar-right">

                <div className="admin-text">
                    <h3>Welcome Admin</h3>
                    <p>Food Delivery Dashboard</p>
                </div>

                <img
                    className='profile'
                    src={assets.profile_image}
                    alt="profile"
                />
            </div>

        </div>
    )
}

export default Navbar