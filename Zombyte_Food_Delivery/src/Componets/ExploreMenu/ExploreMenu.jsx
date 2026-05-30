import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

function ExploreMenu({category, setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h2>Explore Our Menu</h2>
        <p className='explore-menu-text'> Check out our delicious range of dishes, carefully crafted to satisfy your taste buds.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
            return (
                <div className="menu-item" key={index}  onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name )}>
                    <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
                    <p>{item.menu_name}</p>
                </div>
            )
        })  }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu