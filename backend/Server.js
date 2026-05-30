import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

// dotenv config
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// static folder
app.use("/images", express.static("uploads"));

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// server start
app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`);
});