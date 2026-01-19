const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

// POST /add - Create a new hospital
router.post('/add', async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /heatmap-data - Return hardcoded dengue outbreak data for Mumbai
router.get('/heatmap-data', (req, res) => {
  const mumbaiLat = 19.07;
  const mumbaiLng = 72.87;
  
  const heatmapData = [];
  for (let i = 0; i < 50; i++) {
    const latOffset = (Math.random() - 0.5) * 0.3; // ±0.15 degrees
    const lngOffset = (Math.random() - 0.5) * 0.3; // ±0.15 degrees
    const intensity = 0.5 + Math.random() * 0.5; // 0.5 to 1.0
    
    heatmapData.push({
      lat: mumbaiLat + latOffset,
      lng: mumbaiLng + lngOffset,
      intensity: intensity
    });
  }
  
  res.json(heatmapData);
});

module.exports = router;
