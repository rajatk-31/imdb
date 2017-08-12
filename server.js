var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
global.rootPath = __dirname;
global.flag = 1;
mongoose.connect('mongodb://test:test@ds052968.mlab.com:52968/mongotestmayank');

app.use(bodyParser.json());
require('./routes/routes-config')(app);

app.use(express.static('./public'));
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function(err) {
    console.log(err || ('running at port ' + PORT));
})