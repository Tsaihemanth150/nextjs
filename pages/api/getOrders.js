// pages/api/getOrders.js
import connectDB from '../../middleware/connectDB';
import Order from '../../models/Orders';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      await connectDB();

      // Extract the token from the request headers
      const token = req.headers.authorization?.replace('Bearer ', '');

      // Decode the JWT token to get user email
      const decodedToken = jwt.verify(token, 'key123'); // Replace 'your_jwt_secret' with your actual JWT secret

      // Fetch orders for the specific user using the decoded user email
      const orders = await Order.find({ UserId: decodedToken.email });

      // Respond with the orders
      res.status(200).json({ orders });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with a method not allowed error for non-GET requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
