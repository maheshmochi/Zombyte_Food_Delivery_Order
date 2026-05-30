import foodModel from "../models/foodModel.js";
import fs from "fs";

// ➤ ADD FOOD (FINAL FIXED)
const addFood = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // 🔴 FIX 1: file check
    if (!req.file) {
      return res.json({
        success: false,
        message: "Image not uploaded"
      });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food Added Successfully",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

// ➤ LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      data: foods,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching food list",
    });
  }
};

// ➤ REMOVE FOOD
const removeFood = async (req, res) => {
  try {

    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food not found",
      });
    }

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food Removed Successfully",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error removing food",
    });
  }
};

export { addFood, listFood, removeFood };