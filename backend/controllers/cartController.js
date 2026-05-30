import userModel from "../models/userModel.js";


// ================= ADD TO CART =================

const addToCart = async (req, res) => {

    try {

        const userData = await userModel.findById(
            req.body.userId
        );

        // current quantity
        const currentQty =
            userData.cartData.get(req.body.itemId) || 0;

        // set new quantity
        userData.cartData.set(
            req.body.itemId,
            currentQty + 1
        );

        // save user
        await userData.save();

        res.json({
            success: true,
            message: "Added To Cart"
        });

    } catch (error) {

        console.log("ADD CART ERROR :", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// ================= REMOVE FROM CART =================

const removeFromCart = async (req, res) => {

    try {

        const userData = await userModel.findById(
            req.body.userId
        );

        // current quantity
        const currentQty =
            userData.cartData.get(req.body.itemId) || 0;

        // decrease or delete
        if (currentQty > 1) {

            userData.cartData.set(
                req.body.itemId,
                currentQty - 1
            );

        } else {

            userData.cartData.delete(
                req.body.itemId
            );
        }

        // save user
        await userData.save();

        res.json({
            success: true,
            message: "Removed From Cart"
        });

    } catch (error) {

        console.log("REMOVE CART ERROR :", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// ================= GET CART =================

const getCart = async (req, res) => {

    try {

        const userData = await userModel.findById(
            req.body.userId
        );

        // convert Map to Object
        const cartData = Object.fromEntries(
            userData.cartData
        );

        res.json({
            success: true,
            cartData
        });

    } catch (error) {

        console.log("GET CART ERROR :", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// ================= EXPORT =================

export {
    addToCart,
    removeFromCart,
    getCart
};