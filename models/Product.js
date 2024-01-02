// models/Product.js

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  item: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  availableQnty: { type: Number },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
