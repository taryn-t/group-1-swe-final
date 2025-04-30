import mongoose, { model } from "mongoose";

export interface CartDocument extends mongoose.Document {
  textbooks: mongoose.Types.ObjectId[]; 
  merchandise: mongoose.Types.ObjectId[]; 
  user_id: string;
}


const CartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  textbooks: { type: [mongoose.Schema.Types.ObjectId], ref: "Textbook", default: [] },
  merchandise: { type: [mongoose.Schema.Types.ObjectId], ref: "Merchandise", default: [] },
}, { timestamps: true });

const Cart = mongoose.models.Cart || model<CartDocument>("Cart", CartSchema);
export default Cart;