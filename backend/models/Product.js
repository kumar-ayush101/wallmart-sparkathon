import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  tags: [String],
  imageUrl: String,
});

export default mongoose.model('Product', productSchema);
