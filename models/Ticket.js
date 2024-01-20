// models/Ticket.js

import mongoose from 'mongoose';

const  TicketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  question:{type:String,required:true},
  Answer:{type:String},
  status: { type: String, default: 'Open', required: true },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema); 