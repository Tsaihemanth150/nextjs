// Import necessary modules and models
import Restaurant from "@/models/Restaurant";
import connectDb from "@/middleware/connectDB";

// Define the API route handler
const handler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const productId = req.body.productId;

      const result = await Restaurant.findByIdAndDelete(productId);

      if (!result) {
        throw new Error("Restaurant not found");
      }

      res.status(200).json({ success: "Restaurant is deleted" });
    } else {
      res.status(400).json({ error: "Invalid method" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default connectDb(handler);
