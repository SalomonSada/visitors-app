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
    required: true,
    unique: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Visitor = mongoose.model('visitor', VisitorSchema);
