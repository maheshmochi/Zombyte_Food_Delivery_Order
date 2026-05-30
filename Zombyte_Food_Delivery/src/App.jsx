import React from 'react'
import './App.css'
import Navbar from './Componets/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Componets/Footer/Footer'
import Login from './Componets/Login/Login'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'

function App() {

  const [showLogin, setShowLogin] = React.useState(false);
  return (
   <>

   { showLogin ? <Login  setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        {/* <Route path='/verify'  element={<Verify/>}  /> */}
        <Route path='/verify' element={<Verify />} />
        <Route   path='/myorders'  element={<MyOrders/>}   />
      </Routes>
    </div>
    <Footer />  
    </>
  )
}

export default App