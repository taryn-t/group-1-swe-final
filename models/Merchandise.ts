import mongoose, { Schema, model } from "mongoose";

export interface PaginatedMerchandiseResponse {
  success: boolean;
  results: MerchandiseDocument[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface MerchandiseDocument extends mongoose.Document {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    instock: boolean;
    stock: number
}

const MerchandiseSchema = new Schema<MerchandiseDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  instock: { type: Boolean, required: true },
  stock:  { type: Number, required: true },
});

const Merchandise = mongoose.models.Merchandise || model<MerchandiseDocument>("Merchandise", MerchandiseSchema);
export default Merchandise;