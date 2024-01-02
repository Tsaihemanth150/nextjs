// Import necessary modules and models
import User from "@/models/Users"; // Assuming User is the model for user profiles
import connectDb from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';

// Define the API route handler
const handler = async (req, res) => {
  try {
    // Check the request method
    if (req.method === 'POST') {
      // Validate the request body
      if (!req.body) {
        throw new Error("Invalid request body");
      }

      const updatedProfile = req.body;

      // Assuming the user is authenticated and you have a JWT token in the request headers
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user's email from the decoded token
      const userEmail = decodedToken.email;

      // Update the user profile based on the userEmail
      const result = await User.findOneAndUpdate({ email: userEmail },  updatedProfile, { new: true });
      

      if (!result) {
        throw new Error("User profile not found");
      }

      // Send a success response
      res.status(200).json({ success: "User profile is updated" });
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
