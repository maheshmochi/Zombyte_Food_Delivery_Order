import React, { useState, useContext } from 'react';
import './Login.css';
import { assets } from "/src/assets/assets.js";
import axios from "axios";
import { StoreContext } from '../../Context/StoreContext';

function Login({ setShowLogin }) {

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // ================= INPUT =================
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ================= LOGIN / SIGNUP =================
    const onLogin = async (e) => {
        e.preventDefault();

        try {

            let newUrl = url;

            if (currState === "Login") {
                newUrl += "/api/user/login";
            } else {
                newUrl += "/api/user/register";
            }

            const response = await axios.post(newUrl, data);

            console.log("RESPONSE:", response.data);

            const res = response?.data;

            // ================= SUCCESS =================
            if (res?.success === true) {

                // token safe check
                if (res?.token) {
                    setToken(res.token);
                    localStorage.setItem("token", res.token);
                }

                // reset form
                setData({
                    name: "",
                    email: "",
                    password: ""
                });

                setShowLogin(false);

            } 
            // ================= FAIL =================
            else {
                alert(res?.message || "Login failed");
            }

        } catch (error) {
            console.log("ERROR:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Server error");
        }
    };

    return (
        <div className='login'>

            <form onSubmit={onLogin} className="login-container">

                {/* TITLE */}
                <div className="login-title">
                    <h2>{currState}</h2>

                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="close"
                    />
                </div>

                {/* INPUTS */}
                <div className="login-inputs">

                    {currState === "Sign Up" && (
                        <input
                            name='name'
                            value={data.name}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='Username'
                            required
                        />
                    )}

                    <input
                        name='email'
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder='Email'
                        required
                    />

                    <input
                        name='password'
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder='Password'
                        required
                    />

                </div>

                {/* BUTTON */}
                <button type='submit'>
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {/* TERMS */}
                <div className="login-condtion">
                    <input type="checkbox" required />
                    <label>
                        By continuing, I agree to Terms & Privacy Policy
                    </label>
                </div>

                {/* SWITCH */}
                {currState === "Login" ? (
                    <p>
                        Don't have an account?
                        <span onClick={() => setCurrState("Sign Up")}>
                            {" "}Sign Up
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have account?
                        <span onClick={() => setCurrState("Login")}>
                            {" "}Login
                        </span>
                    </p>
                )}

            </form>

        </div>
    );
}

export default Login;