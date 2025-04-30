import mongoose, { Schema, model } from "mongoose";

export interface OrderDocument extends mongoose.Document {
  textbooks: mongoose.Types.ObjectId[]; 
  merchandise: mongoose.Types.ObjectId[]; 
  amount: number
  total: number
  user_id: string;
  shippingAddress:mongoose.Types.ObjectId;
  createdAt: Date; // ✅ added
  updatedAt: Date; // ✅ added
}

const OrderSchema = new Schema<OrderDocument>({
   textbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Textbook' }], 
   merchandise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merchandise' }], 
   amount: {type: Number, required: true, default: 0},
   total: {type: Number, required: true, default: 0},
   shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress' }, 
   user_id: { type: String, required: true },
},{timestamps:true});

const Order = mongoose.models.Order || model<OrderDocument>("Order", OrderSchema);
export default Order;