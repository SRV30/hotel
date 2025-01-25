import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  region: { type: String, required: true },
  sub_region: { type: String, required: true },
});

const Region = mongoose.model("Region", regionSchema);
export default Region;
