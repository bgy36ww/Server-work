var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    meetupsController = require('./server/controllers/meetups-controller');

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/packages', express.static(__dirname + '/node_modules'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

//REST API
app.get('/api/meetups', meetupsController.list);
app.post('/api/meetups', meetupsController.create);
app.post('/api/fetch', meetupsController.getName);
//app.post('/api/CreateUser',meetupsController.CreateUser);
//app.post('/api/Save',meetupsController.SaveUser);
//app.get('/api/Findfriends',meetupsController.Find);




app.listen(3000, function() {
  console.log('I\'m Listening...');
})

//WTF