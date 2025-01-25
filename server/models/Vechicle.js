import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  regionSubregion: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true },
});

export default mongoose.model("Vehicle", vehicleSchema);
