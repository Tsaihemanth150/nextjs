import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  address: { type: String },
  phone: { type: Number },
  pincode: { type: Number },
  wallate:{type:Number,default:0},
  isStaf: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false } 
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
