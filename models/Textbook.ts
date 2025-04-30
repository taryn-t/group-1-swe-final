import mongoose, { Schema, model } from "mongoose";

export interface PaginatedTextbookResponse {
  success: boolean;
  results: TextbookDocument[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}
export interface TextbookDocument extends mongoose.Document {
    _id: string;
    isbn: string;
    name: string;
    edition: string;
    price: number;
    author: string;
    publisher: string;
    section_id: string;
    instock: boolean;
    stock: number
}

const TextbookSchema = new Schema<TextbookDocument>({
  isbn: { type: String, required: true },
  name: { type: String, required: true },
  edition: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  section_id: { type: String, required: true },
  instock: { type: Boolean, required: true },
  stock:  { type: Number, required: true },
});

const Textbook = mongoose.models.Textbook || model<TextbookDocument>("Textbook", TextbookSchema);
export default Textbook;