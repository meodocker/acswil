const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Tour name pls'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'Tour price pls'] },
});

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;
