var mongoose = require('mongoose');

module.exports = mongoose.model('Country', {
  _id: {
    type: Number,
  },
  Name: {
    type: String,
    default: '',
    required: true,
  },

});