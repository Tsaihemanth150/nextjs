// Import necessary modules and models
import Restaurant from "@/models/Restaurant";
import connectDb from "@/middleware/connectDB";

// Define the API route handler
const handler = async (req, res) => {
  try {
    // Check the request method
    if (req.method === 'POST') {
      // Validate the request body
      if (!req.body || !req.body.productId || !req.body.updatedProduct) {
        throw new Error("Invalid request body");
      }

      const productId = req.body.productId;
      const updatedProduct = req.body.updatedProduct;
      
     
      // Update the product based on the productId
      const result = await Restaurant.findByIdAndUpdate(productId, updatedProduct);

      if (!result) {
        throw new Error("Product not found");
      }

      // Send a success response
      res.status(200).json({ success: "Product is updated" });
    } else {
      // Send an error response for unsupported method
      res.status(400).json({ error: "Invalid method" });
    }
  } catch (error) {
    // Send an error response for any unexpected errors
    res.status(500).json({ error: error.message });
  }
};

export default connectDb(handler);
