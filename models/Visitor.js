const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  // user: it'll work to identify who registered the visitor
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  // todo: be able to add more than one. at email & cellphone (could be with an array)
  email: {
    type: String,
    unique: false,
  },
  cellphone: {
    type: String,
    required: false,
  },
  direction: {
    type: String,
    required: false,
  },
  zip: {
    type: Number,
    required: false,
  },
  birthday: {
    type: Date,
  },
  sons: {
    amount: {
      type: Number,
    },
    ages: {
      type: [Number],
    },
  },
  prayRequest: {
    type: String,
    required: false,
  },
  otherChurch: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    }), //UTC -5 necesita, actualmente esta en UTC 0
  },
});

module.exports = Visitor = mongoose.model('visitor', VisitorSchema);
