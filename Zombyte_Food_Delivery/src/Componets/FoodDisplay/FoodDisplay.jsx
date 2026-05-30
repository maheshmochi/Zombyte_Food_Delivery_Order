import React from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import Fooditem from '../Fooditem/Fooditem'

function FoodDisplay({ category }) {

    // ✅ correct variable name
    const { foodList } = React.useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>

            <h2>Top dishes near you</h2>

            <div className="food-display-list">

                {foodList.map((item, index) => {

                    if (
                        category === "All" ||
                        category === item.category
                    ) {

                        return (
                            <Fooditem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        )
                    }

                    return null;

                })}

            </div>

        </div>
    )
}

export default FoodDisplay