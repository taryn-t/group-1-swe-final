import mongoose, { Schema, model } from "mongoose";

export interface CourseDocument extends mongoose.Document {
  id: string;
  name: string;
  subject_id: string;
}

const CourseSchema = new Schema<CourseDocument>({
  id: { type: String, required: true, unique: false },
  name: { type: String, required: true },
  subject_id: { type: String, required: true },
});

const Course = mongoose.models.Course || model<CourseDocument>("Course", CourseSchema);
export default Course;