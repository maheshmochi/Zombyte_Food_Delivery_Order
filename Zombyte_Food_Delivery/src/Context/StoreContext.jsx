import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    // ================= BASE URL =================
    const url = "https://backend-food-delivery-gnm3.onrender.com/";

    // ================= FOOD LIST =================
    const [foodList, setFoodList] = useState([]);

    // ================= CART =================
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    // ================= TOKEN =================
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    // ================= SAVE CART =================
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // ================= SAVE TOKEN =================
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // ================= FETCH FOOD LIST =================
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);

            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Food List Error:", error);
        }
    };

    // ================= LOAD CART =================
    const loadCartData = async (currentToken) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                {
                    headers: {
                        token: currentToken,
                    },
                }
            );

            if (response.data.success) {
                const backendCart = response.data.cartData || {};
                const localCart =
                    JSON.parse(localStorage.getItem("cartItems")) || {};

                setCartItems({
                    ...backendCart,
                    ...localCart,
                });
            }
        } catch (error) {
            console.error("Cart Load Error:", error);
        }
    };

    // ================= INITIAL LOAD =================
    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();

            if (token) {
                await loadCartData(token);
            }
        };

        loadData();
    }, [token]);

    // ================= ADD TO CART =================
    const addToCart = async (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    {
                        headers: {
                            token,
                        },
                    }
                );
            } catch (error) {
                console.error("Add Cart Error:", error);
            }
        }
    };

    // ================= REMOVE FROM CART =================
    const removeFromCart = async (itemId) => {

        setCartItems((prev) => {
            const updatedCart = { ...prev };

            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }

            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    {
                        headers: {
                            token,
                        },
                    }
                );
            } catch (error) {
                console.error("Remove Cart Error:", error);
            }
        }
    };

    // ================= TOTAL AMOUNT =================
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {

            const quantity = cartItems[itemId];

            if (quantity > 0) {

                const itemInfo = foodList.find(
                    (item) => item._id === itemId
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }

        return totalAmount;
    };

    // ================= CONTEXT VALUE =================
    const contextValue = {
        url,
        foodList,
        setFoodList,
        cartItems,
        setCartItems,
        token,
        setToken,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
