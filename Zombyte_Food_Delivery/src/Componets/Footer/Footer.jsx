import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {

    return (

        <div className='Footer' id='Footer'>

            <div className="footer-content">

                <div className="footer-content-left">

                    <img className='Logo_Zom' src={assets.Logo_Zom} alt="Logo" />

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda exercitationem id repellendus laboriosam reprehenderit non quod accusamus at itaque optio nisi
                        voluptas voluptatibus sit excepturi, rerum repellat similique recusandae officia!

                    </p>

                    <div className="footer-social-icons">
                        <a href="#">                        <img src={assets.facebook_icon} alt="Facebook" />
                        </a>
                        <a href="#">
                            <img src={assets.linkedin_icon} alt="LinkedIn" />
                        </a>
                        <a href="#">
                            <img src={assets.twitter_icon} alt="Twitter" />
                        </a>
                    </div>

                </div>

                <div className="footer-content-center">

                    <h2>COMPANY</h2>

                    <ul>
                     <a href="#"><li>Home</li></a>
                        <a href="#"><li>About Us</li></a>
                        <a href="#"><li>Delivery</li></a>
                        <a href="#"><li>Privacy Policy</li></a> 
                    </ul>

                </div>

                <div className="footer-content-right">

                    <h2>GET IN TOUCH</h2>

                    <ul>
                        <li>Contact Us</li>
                        <li>+1-212-456-7890</li>
                        <a href="mailto:support@zombyte.com">support@zombyte.com</a>
                    </ul>

                </div>

            </div>

            <hr />

            <p className='footer-copyright'>
                &copy; 2026 Zombyte. All rights reserved.
            </p>

        </div>
    )
}

export default Footer