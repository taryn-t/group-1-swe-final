import mongoose, { Schema, model } from "mongoose";

export interface SectionDocument extends mongoose.Document {
  id: string;
  number: string;
  textbook_link: string;
  course_id: string;
  user_id?: mongoose.Types.ObjectId[]
}

const SectionSchema = new Schema<SectionDocument>({
  id: { type: String, required: true, unique: false },
  number: { type: String, required: true },
  textbook_link: { type: String, required: true },
  course_id: { type: String, required: true },
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

const Section = mongoose.models.Section || model<SectionDocument>("Section", SectionSchema);
export default Section;