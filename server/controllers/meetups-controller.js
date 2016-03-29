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
//request a login interface on Angular JS that can use for testing this.
//request a button and a test box to call this module for testing purpose
module.exports.CreateUser = function (req, res) {

}
//request a button to call this module for testing purpose
module.exports.SaveUser = function (req, res) {

}
//request a button and a text field that can display this output for testing purpose
module.exports.Find = function (req, res) {

}
