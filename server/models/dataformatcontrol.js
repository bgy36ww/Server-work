/**
 * Created by Wei Wang on 4/1/2016.
 */
var mongoose = require('mongoose');
var user_format= new Schema({
    Name:String,
    Password:String,
    rate: String,
    score: String,
    upgrades:[Number]
});
var user_login= new Schema({
    Name:String,
    Password:String
});
module.exports.usrfile = mongoose.model('User', user_format);
module.exports.usr_login = mongoose.model('User_login', user_login);
