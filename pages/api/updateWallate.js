// Import necessary modules and models
import User from "@/models/Users";
import connectDb from "@/middleware/connectDB";

// Define the API route handler
const handler = async (req, res) => {
  try {
    // Check the request method
    if (req.method === 'POST') {
      // Validate the request body
      const { newAmountInwallate, userEmail } = req.body;

      if (!newAmountInwallate || !userEmail) {
        throw new Error("Invalid request body or missing required fields");
      }

    

      // Update only the wallate property in the user profile based on the userEmail
      const result = await User.findOneAndUpdate(
        { email: userEmail },
        {  wallate: newAmountInwallate  },
        { new: true }
      );

      if (!result) {
        throw new Error("User profile not found");
      }

      // Send a success response
      res.status(200).json({ success: "Wallate is updated successfully" });
    } else {
      // Send an error response for unsupported method
      res.status(400).json({ error: "Invalid method" });
    }
  } catch (error) {
    // Send a detailed error response for any unexpected errors
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default connectDb(handler);
