import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  tag: String,
  goal: Number,
  points: Number,
  dayOfWeek: { type: String, required: true }
});

export default mongoose.model('Quest', questSchema);
