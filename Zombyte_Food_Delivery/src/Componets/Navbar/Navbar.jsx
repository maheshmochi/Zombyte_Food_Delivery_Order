import React, {
  useState,
  useContext,
  useEffect,
  useRef
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navabar.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';


function Navbar({ setShowLogin }) {

  const [menu, setMenu] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".hamburger")
      ) {
        setMobileMenu(false);
      }

    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false);
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };

  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowMenu(false);
    navigate("/");
  };

  return (
    <div className='navbar'>

      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`mobile-sidebar ${mobileMenu ? "open" : ""}`}
      >
        <div
          className="close-btn"
          onClick={() => setMobileMenu(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <li onClick={() => {
          setMenu("Home");
          setMobileMenu(false);
        }}>
          <Link to="/">Home</Link>
        </li>

        <li onClick={() => setMobileMenu(false)}>
          <a href="#explore-menu">Menu</a>
        </li>

        <li onClick={() => setMobileMenu(false)}>
          <a href="#app-download">App</a>
        </li>

        <li onClick={() => setMobileMenu(false)}>
          <a href="#Footer">Contact</a>
        </li>

      </div>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => {
          setMobileMenu(true);
          setShowMenu(false);
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/">
          <img
            className="logo"
            src={assets.Logo_Zom}
            alt="logo"
          />
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <ul className="navbar-menu">

        <li onClick={() => setMenu("Home")}>
          <Link
            to="/"
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <a href="#explore-menu">Menu</a>
        </li>

        <li>
          <a href="#app-download">App</a>
        </li>

        <li>
          <a href="#Footer">Contact</a>
        </li>

      </ul>

      {/* RIGHT */}
      <div className="navbar-right">


        <div
          className="search_icon"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img
              className='search_logo'
              src={assets.Hello}
              alt="cart"
            />
          </Link>

          {getTotalCartAmount() !== 0 && (
            <div className="dot"></div>
          )}
        </div>

        {token && (
          <div
            ref={profileRef}
            className='navbar-profile'
            onClick={() => {
              setShowMenu(!showMenu);
              setMobileMenu(false);
            }}
          >
            <i className="fa-solid fa-user user-icon"></i>

            {showMenu && (
              <ul className="nav-profile-dropdown">

                <li onClick={() => {
                  navigate('/myorders');
                  setShowMenu(false);
                }}>
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>Orders</p>
                </li>

                <hr />

                <li onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <p>Logout</p>
                </li>

              </ul>
            )}
          </div>
        )}

        {!token && (
          <button
            className='Sign_in'
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        )}

      </div>

    </div>
  );
}

export default Navbar;