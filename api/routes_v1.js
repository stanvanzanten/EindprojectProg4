//
// ./api/routes_v2.js
//
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

var mijnObject = { 
	mijntekst: 'Hello World!',
	label: "Nog meer tekst",
	mijnarray: [ "tekst", "nog meer tekst", 2 ],
	mijnobject: {
		mijnlabel: 'mijntekst',
		getal: 4
	}
};

routes.get('/hello', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json(mijnObject);
});

routes.get('/goodbye', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json({ 'tekst': 'Goodbye!'});
});


routes.get('/films', function(req, res){

    var filmId = req.params.filmid;

    res.contentType('application/json');

    db.query('SELECT * FROM film ', function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/films/:filmid', function(req, res){

    var filmId = req.params.filmid;

    res.contentType('application/json');

    db.query('SELECT * FROM film WHERE film_id=?', [ filmId ], function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/rentals', function(req, res){

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT * FROM rental', function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/rentals/:userid', function(req, res){

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE customer_id=?', [ userId ], function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

module.exports = routes;