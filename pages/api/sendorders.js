// pages/api/orders.js
import connectDB from '../../middleware/connectDB';
import Order from '../../models/Orders';


const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await connectDB();

      // Extract order data from the request body
      const { UserId, products, amount, status } = req.body;
      
      
 

      // Map the received data to the Mongoose model schema
      const order = new Order({
        UserId,
        products: products.map(({ productId, quantity, name, category }) => ({ productId, quantity, name, category })),
        amount,
        status,
      });

      // Save the order to the database
    
      await order.save();

      // Respond with a success message
      res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error processing order:", error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    // Respond with a method not allowed error for non-POST requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
