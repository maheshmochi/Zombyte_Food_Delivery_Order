import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// ✅ FIX: absolute safe uploads path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage });

// 🔥 IMPORTANT ROUTE
foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;