    import express from "express";
import Region from "../models/Region.js";

const router = express.Router();

// GET: Fetch all regions
router.get("/region", async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new region
router.post("/region/new", async (req, res) => {
    const { region, sub_region } = req.body;
    console.log("Request Body:", req.body); // Log the body
    console.log(region, sub_region);
  
    try {
      const newRegion = new Region({ region, sub_region });
      const savedRegion = await newRegion.save();
      res.status(201).json(savedRegion);
    } catch (error) {
      console.error("Error while saving region:", error.message);
      res.status(400).json({ message: error.message });
    }
  });
  
// PUT: Update a region
router.put("/region/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRegion = await Region.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedRegion) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.status(200).json(updatedRegion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a region
router.delete("/region/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRegion = await Region.findByIdAndDelete(id);
    if (!deletedRegion) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
