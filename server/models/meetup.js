var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', {
  name: String,
  rate: String,
  score: String,
  upgrades: [Number]
});