import mongoose, { Schema, model } from "mongoose";

export interface DepartmentDocument extends mongoose.Document {
  id: string;
  name: string;

}

const DepartmentSchema = new Schema<DepartmentDocument>({
  id: { type: String, required: true, unique: false },
  name: { type: String, required: true },
});

const Department = mongoose.models.Department || model<DepartmentDocument>("Department", DepartmentSchema);
export default Department;