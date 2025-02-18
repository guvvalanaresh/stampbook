import mongoose from 'mongoose';

const stampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  seller: { type: String, required: true },
  sellerRating: { type: Number, default: 5.0 },
  listed: { type: Date, default: Date.now },
});

// Prevent duplicate model initialization
const Stamp = mongoose.models.Stamp || mongoose.model('Stamp', stampSchema);

export default Stamp; 