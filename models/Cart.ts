import mongoose, { Schema, model } from "mongoose";

export interface CartDocument extends mongoose.Document {
  textbooks: mongoose.Types.ObjectId[]; // change this!
  user_id: string;
}

const CartSchema = new Schema<CartDocument>({
  textbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Textbook' }], // change this!

   user_id: { type: String, required: true },
});

const Cart = mongoose.models.Cart || model<CartDocument>("Cart", CartSchema);
export default Cart;