var app = require('express').Router();
var multer = require('multer');
var upload = multer({
    dest: 'images/actors/'
});
var Actor = require('../model/actor');
var Movie = require('../model/movie');

app.get('/all', function(req, res) {
    Actor.find({}, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                actors: data
            });
        }
    })
})
app.post('/', upload.single('photo'), function(req, res) {
    var actor = new Actor({
        name: req.body.name,
        dob: req.body.dob,
        bio: req.body.bio,
        photo: req.file
    });
    actor.save(function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                data: data
            });
        }

    });
});


app.delete('/:id', function(req, res) {
    Actor.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                actors: data
            });
        }
    });
})

app.post('/edit/:id', upload.single('photo'), function(req, res) {
    
        //var _id = req.body._id;
        var actor = {
        name: req.body.name,
        dob: req.body.dob,
        bio: req.body.bio,
        photo: req.file
    };
    
    Actor.findOneAndUpdate({_id : req.params.id }, {$set: actor}, { new: true }, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                data: data,
                msg: "updated"
            });
        }

    });
     
        
});
app.get('/img/:id', function(req, res) {
    Actor.findOne({ _id: req.params.id }, function(err, data) {
        if (data && data.photo) {
            res.header('content-type', data.photo && data.photo.mimetype);
            res.sendFile(global.rootPath + '/' + data.photo.path);
        } else {
            res.send(err);
        }
    });
});

app.get('/image/:id', function(req, res) {
    Movie.findOne({ _id: req.params.id }, function(err, data) {
        if (data && data.poster) {
            res.header('content-type', data.poster && data.poster.mimetype);
            res.sendFile(global.rootPath + '/' + data.poster.path);
        } else {
            res.send(err);
        }
    });
});

app.get('/actor/:id', function(req, res) {
    Movie.find({ actors: req.params.id }, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                actors: data
            });
        }
    })
})
app.get('/:id', function(req, res){
    Actor.findOne({_id: req.params.id}, function(err, data){
        if(err){
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                actors: data
            });
        }
    })
});

module.exports = app;