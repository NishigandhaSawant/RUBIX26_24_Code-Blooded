const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  totalBeds: {
    type: Number,
    required: true,
    min: 0
  },
  occupiedBeds: {
    type: Number,
    required: true,
    min: 0
  },
  inventory: [{
    itemName: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    expiryDate: {
      type: Date,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);
