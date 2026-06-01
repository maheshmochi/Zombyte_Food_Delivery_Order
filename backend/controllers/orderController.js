import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACE ORDER
const placeOrder = async (req, res) => {
    const FRONTEND_URL = "https://frontend-bca3.onrender.com/";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
            status: "Food Processing",
            date: Date.now()
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 200
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// VERIFY
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// USER ORDERS
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.body.userId
        }).sort({ date: -1 });

        res.json({ success: true, data: orders });

    } catch (error) {
        res.json({ success: false });
    }
};

// LIST
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false });
    }
};

// 🔥 STATUS UPDATE
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const updated = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            data: updated
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateOrderStatus
};
