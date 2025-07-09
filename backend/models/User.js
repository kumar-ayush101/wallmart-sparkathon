import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  monthlyPoints: { type: Number, default: 0 },
  lastUpdatedMonth: { type: String }, // e.g. "2025-07"
  quests: { type: Map, of: Object },  // key -> { progress, completed }
});

export default mongoose.model('User', userSchema);
