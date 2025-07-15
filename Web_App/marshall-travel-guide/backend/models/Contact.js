const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
