import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
function AppDownload() {
    return (
        <div className='app-download' id='app-download'>
            <p>Download our app for the best food delivery experience!</p>
            <div className="app-download-platforms">
                <a href="#">
                    <img src={assets.play_store} alt="Google Play Store" />
                </a>
                <a href="#">
                    <img src={assets.app_store} alt="Apple App Store" />
                </a>
            </div>


        </div>
    )
}

export default AppDownload