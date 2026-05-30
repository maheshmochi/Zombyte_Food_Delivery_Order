import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

function List({url}) {


  const [list, setList] = useState([])

  // 🔹 Fetch list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)

      if (response.data.success) {
        setList(response.data.data || response.data.foods || [])
      } else {
        toast.error("Error fetching list")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  // 🔹 Delete item
  const removeItem = async (id) => {
    try {

      if (!window.confirm("Are you sure you want to delete this item?")) return

      const response = await axios.post(`${url}/api/food/remove`, { id })

      if (response.data.success) {
        toast.success("Item removed successfully")
        fetchList() // refresh
        console.log(id);
      } else {
        toast.error("Failed to remove item")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      <div className="list-table">

        {/* Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Data */}
        {list.length === 0 ? (
          <p>No data found</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className='list-table-format'>

              <img
                src={`${url}/images/${item.image || item.Image}`}
                alt="food"
              />

              <p>{item.name || item.Name}</p>
              <p>{item.category || item.Category}</p>
              <p>${item.price || item.Price}</p>

              <p
                className="cursor"
                onClick={() => removeItem(item._id || item.id)}
              >
                ❌
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default List