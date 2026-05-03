const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: String, enum: ['Backpacker', 'Comfort', 'Luxury'], required: true },
  travelMode: { type: String, enum: ['Flight', 'Train', 'Bus', 'Auto'], required: true },
  plan: [{
    day: Number,
    activities: [{
      time: String,
      title: String,
      description: String,
      location: String,
      cost: Number
    }]
  }],
  totalCost: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
