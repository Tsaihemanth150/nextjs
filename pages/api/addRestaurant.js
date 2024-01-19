// pages/api/addProduct.js

import Restaurant from '@/models/Restaurant';
import connectDb from '@/middleware/connectDB';



const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const requestData = Array.isArray(req.body) ? req.body : [req.body];

      for (const data of requestData) {
        const r = new Restaurant({
            name: data.name,
            maxSeats: data.maxSeats,
            bookedSeats: data.bookedSeats,
            availableSeats: data.availableSeats,
            price: data.price,
            address: data.address,
            img:data.img
        });

        // Validate the product data before saving (optional)
        const validationError = r.validateSync();
        if (validationError) {
          throw new Error(`Validation error: ${validationError.message}`);
        }

       
        await r.save();
      }

      res.status(200).json({ success: "restarunat added successfully" });
    } else {
      res.status(400).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
   
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

export default connectDb(handler);
