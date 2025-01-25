import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  region_subregion: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
});

export default mongoose.model("Hotel", hotelSchema);
