import mongoose, { Schema, model } from "mongoose";

export interface PaginatedShippingAddressResponse {
    name: string;
    address: string;
    address_line2?: string
    city: string;
    zipcode: string;
    state: string;
    country: string;
    user_id: string
}
export interface ShippingAddressDocument extends mongoose.Document {
    name: string;
    address: string;
    address_line2?: string
    city: string;
    zipcode: string;
    state: string;
    country: string;
    user_id: string

}

const ShippingAddressSchema = new Schema<ShippingAddressDocument>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    address_line2: { type: String, required: false },

  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  user_id: { type: String, required: true },

});

const ShippingAddress = mongoose.models.ShippingAddress || model<ShippingAddressDocument>("ShippingAddress", ShippingAddressSchema);
export default ShippingAddress;