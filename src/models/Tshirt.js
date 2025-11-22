const mongoose = require('mongoose');

const tshirtSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  thumbnailImage: {
    type: String,
    required: true,
    trim: true
  },
  otherImages: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    required: true
  }],
  colors: [{
    type: String,
    required: true,
    trim: true
  }]
}, {
  timestamps: true
});

tshirtSchema.index({ name: 1 });
tshirtSchema.index({ price: 1 });

module.exports = mongoose.model('Tshirt', tshirtSchema);
