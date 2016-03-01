var Meetup = require('../models/meetup');

module.exports.create = function (req, res) {
  var meetup = new Meetup(req.body);
  meetup.save(function (err, result) {
    res.json(result);
  });
}

module.exports.getName = function (req, res) {

    Meetup.find({name:req.body.test.toString()},function(err,result){
      res.json(result);
    });

}

module.exports.list = function (req, res) {
  res.json(req.body);
  Meetup.find({},function(err,result){});
}

module.exports.CreateUser = function (req, res) {

}
module.exports.SaveUser = function (req, res) {

}
module.exports.Find = function (req, res) {

}