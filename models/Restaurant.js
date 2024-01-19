// models/Restaurant.js

import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true ,unique: true },
  maxSeats: { type: Number, required: true,},
  bookedSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type:String , required: true },
  img: { type:String , required: true },
  
}, { timestamps: true });

export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
