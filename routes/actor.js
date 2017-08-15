var app = require('express').Router();
var multer = require('multer');
var upload = multer({
    dest: 'images/actors/'
});
var Actor = require('../model/actor');
app.post('/', upload.single('photo'), function(req, res) {
    var actor = new Actor({
        name: req.body.name,
        dob: req.body.dob,
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
app.post('/:id', function(req, res) {
    var actor2 = {
        name: req.body.name,
        dob: req.body.dob,
        photo: req.file
    };
    Actor.findOneAndUpdate({ _id: rq.params.id }, { $set: actor2 }, { new: true }, function(err, doc) {
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
app.get('/img/:id', function(req, res) {
    Actor.findOne({ _id: req.params.id }, function(err, data) {
        if (data && data.photo) {
            res.header('content-type', data.photo && data.photo.mimetype);
            res.sendFile(global.rootPath + '/' + data.photo.path);
        } else {
            res.send(err);
        }
    })
})
module.exports = app;