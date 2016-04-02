/**
 * Created by omelet on 4/1/2016.
 */
var usr_format=require('../models/dataformatcontrol');
module.exports.create = function (req, res) {
    var feedback = new usr_format.usrfile(req.body);
    feedback.save(function (err, result) {
        res.json(result);
    });
}
module.exports.getName = function (req, res) {


};
module.exports.list = function (req, res) {};
module.exports.CreateUser = function (req, res) {};
module.exports.SaveUser = function (req, res) {};
module.exports.Find = function (req, res) {};
