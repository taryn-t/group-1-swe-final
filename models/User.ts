import mongoose, { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  twoFactorSecret?: string;
}

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid"
    ],
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user" // ✅ Optional, but useful
  },
  twoFactorSecret: { type: String, default: null },
});

const User = mongoose.models.User || model<UserDocument>('User', UserSchema);
export default User;