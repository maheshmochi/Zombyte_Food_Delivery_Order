import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      await mongoose.connect(
         'mongodb+srv://MAHESH:MAHESH%402026@cluster0.mewx916.mongodb.net/food-del'
      );

      console.log("DB Connected");
   } catch (error) {
      console.log(error);
   }
};