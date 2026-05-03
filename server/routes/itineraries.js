const express = require('express');
const Itinerary = require('../models/Itinerary');
const router = express.Router();

// Get user itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.query.userId });
    res.status(200).json(itineraries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching itineraries' });
  }
});

// Create new itinerary
router.post('/', async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error creating itinerary' });
  }
});

module.exports = router;
