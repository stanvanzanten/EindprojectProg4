//
// server.js
//
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var routes_v1 = require('./api/routes_v1');
var routes_v2 = require('./api/routes_v2');
var routes_login = require('./api/routes_login')
var config = require('./config/config');
var expressJWT = require('express-jwt');


var app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: [
        { url: '/api/v1/login', methods: ['POST'] },
        { url: '/api/v1/register', methods: ['POST'] },
        { url: '/api/v1/hello', methods: ['GET']}
    ]
}));

app.set('port', (process.env.PORT | config.webPort));
app.set('env', (process.env.ENV | 'development'))

app.use('/api/v1', routes_v1);
app.use('/api/v2', routes_v2);
app.use('/api/v1',routes_login);

app.use(function(err, req, res, next) {
    // console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

app.listen(process.env.PORT || 3000, function(){
	console.log('De server luistert op port 3000');	
});

module.exports = app;
