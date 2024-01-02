// pages/api/getOrders.js

import connectDB from "../../middleware/connectDB";
import OrderModel from "../../models/Orders";

export default async function handler(req, res) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch orders from the database
    const orders = await OrderModel.find().sort({ createdAt: -1 });

    // Send the orders as JSON response
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
