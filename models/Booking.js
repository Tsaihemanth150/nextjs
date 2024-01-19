// models/Booking.js

import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  bookingDate: { type: Date, required: true },
  bookedSeats: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
