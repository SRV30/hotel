import express from "express";  
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Get all hotels
router.get("/hotel", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/hotel/:id", async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      console.log(hotel);
      // If no hotel is found, send a 404 error

      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
  
      res.json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Add a new hotel
router.post("/new/hotel", async (req, res) => {
  const { name, price, address, region_subregion } = req.body;
  try {
    const hotel = new Hotel({ name, price, address, region_subregion });
    await hotel.save();
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a hotel
router.put("/hotel/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a hotel
router.delete("/hotel/:id", async (req, res) => {
  try {
    console.log("Request Body:", req); // Log the body
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
