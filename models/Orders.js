const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  products: [
    {
     
      quantity: { type: Number, default: 1 },
      name: { type: String, required: true },  // Check this line
      category: { type: String, required: true },  // Check this line
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
