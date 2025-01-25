import express from "express";
import Vehicle from "../models/Vechicle.js";

const router = express.Router();

// GET: Fetch all vehicles
router.get("/vehicle", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("region_id", "name");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new vehicle
router.post("/vehicle/new", async (req, res) => {
  const { type, price, regionSubregion} = req.body;
  console.log("Request Body:", req.body); // Log the body
  try {
    const newVehicle = new Vehicle({ type, price, regionSubregion });
    const savedVehicle = await newVehicle.save();
    res.status(200).json(savedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update a vehicle
router.put("/vehicle/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a vehicle
router.delete("/vehicle/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Use ES module export
export default router;
