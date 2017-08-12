var app = require('express').Router();
var bodyparser = require('body-parser')
var multer = require('multer');
var upload = multer({
    dest: 'images/movies/'
});
var Movie = require('../model/movie');

app.post('/', upload.single('poster'), function(req, res) {
    var movie = new Movie({
        title: req.body.title,
        release_date: req.body.release_date,
        poster: req.file,
        director: req.body.director,
        runtime: req.body.runtime,
        plot: req.body.plot
    });
    movie.save(function(err, data) {
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
app.get('/all', function(req, res) {
    Movie.find({}, function(err, data) {
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
});

module.exports = app;