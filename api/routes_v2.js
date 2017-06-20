//
// ./api/routes_v2.js
//
var express = require('express');
var router = express.Router();

var mijnObject = { 
	message: 'Hallo, dit is Versie Twee!',
};


router.get('*', function(req, res, next){
	next();
});

router.get('/hello', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json(mijnObject);
});

router.get('/goodbye', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json({ 'tekst': 'Doei Versie 2!'});
});

// Fallback - als geen enkele andere route slaagt
// wordt deze uitgevoerd. 
router.get('*', function(req, res){
	// Status 400 betekent een error.
	res.status(400);
	res.json({
		'error' : 'Deze methode is nog niet beschikbaar.'
	});
});

// Hiermee maken we onze router zichtbaar voor andere bestanden. 
module.exports = router;