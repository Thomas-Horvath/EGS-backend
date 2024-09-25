const mongoose = require('mongoose');
const { type } = require('../validationSchemas/userRegisterSchema');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
