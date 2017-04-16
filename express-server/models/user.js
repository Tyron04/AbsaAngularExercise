var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  _id: {
    type: Number,
  },
  Name: {
    type: String,
    default: '',
    required: true,
  },
  Surname: {
    type: String,
    default: '',
    required: true,
  },
  Country: {
    type: String,
    default: '',
    required: true,
  }

});
