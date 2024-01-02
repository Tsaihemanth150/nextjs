// pages/api/addProduct.js

import Product from '@/models/Product';
import connectDb from '@/middleware/connectDB';



const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const requestData = Array.isArray(req.body) ? req.body : [req.body];

      for (const data of requestData) {
        const p = new Product({
          title: data.title,
          item: data.item,
          desc: data.desc,
          img: data.img,
          category: data.category,
          price: data.price,
          availableQnty: data.availableQnty,
        });

        // Validate the product data before saving (optional)
        const validationError = p.validateSync();
        if (validationError) {
          throw new Error(`Validation error: ${validationError.message}`);
        }

       
        await p.save();
      }

      res.status(200).json({ success: "Product(s) added successfully" });
    } else {
      res.status(400).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
   
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

export default connectDb(handler);
