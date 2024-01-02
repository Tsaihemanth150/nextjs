// pages/api/updateorderdetails.js

import Product from "@/models/Orders";
import connectDb from "@/middleware/connectDB";

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      if (!req.query.userId || !req.body.updatedProduct) {
        throw new Error("Invalid request parameters");
      }

      const userId = req.query.userId;
      const updatedProduct = req.body.updatedProduct;

   

      // Check if the product exists before updating
      const existingOreder = await Product.findOne({ _id: userId });

      if (!existingOreder) {
        throw new Error("Oredr not found");
      }

      // Use findOneAndUpdate with a query object based on userId
      const result = await Product.findOneAndUpdate({ _id: userId }, updatedProduct);

      res.status(200).json({ success: "Order is updated" });
    } else {
      res.status(400).json({ error: "Invalid method" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: error.message });
  }
};

export default connectDb(handler);
