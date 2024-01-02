// pages/api/cancelOrder.js

import connectDB from "../../middleware/connectDB";
import Order from "../../models/Orders";
import Users from "../../models/Users";

connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { orderId, userId, amount } = req.body; // Corrected from UserId to userId

  try {
    // Update the order status to "Cancelled" in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedOrder) {
      console.error("Order not found for cancellation:", orderId);
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update the user's wallet by adding the refunded amount
    const user = await Users.findOneAndUpdate(
      { email: userId },
      { $inc: { wallate: amount } },
      { new: true }
    );

    if (!user) {
      console.error("User not found for wallet update:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Order cancellation successful:", updatedOrder);
    console.log("User wallet update successful:", user);

    res.status(200).json({ success: true, updatedOrder, user });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Error cancelling order" });
  }
}
