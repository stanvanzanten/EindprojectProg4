/**
 * Created by Stan on 14-6-2017.
 */
var express = require('express');
var routes = express.Router();
var db = require('../config/db');
var auth = require('../auth/authentication');
var settings = require('../config/config.json');

routes.post('/login', function(req, res){
    // username en wachtwoord uit req.body lezen
    // check of user in systeem bestaat
    // als user bestaat check wachtwoord
    // als wachtwoord klopt dan stuur token.
    console.log(req.body);

    var email = req.body.email;
    var wachtwoord = req.body.password;


    db.query('SELECT * FROM customer', function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            console.dir(rows);
            var obj;

            for (var i=0; i<rows.length; i++) {
                if ( rows[i].email == email ) {
                    obj = rows[i];
                    console.dir("dit is het object dat gevonden is in de rows")
                    console.dir(obj);
                    if(obj.password == wachtwoord){
                        res.status(200);
                        res.json({
                            "token" : auth.encodeToken(email),
                            "username" : emailss
                        });
                        console.log("ingelogt")
                        break;
                    }else{
                        //res.status(401).json({"error" : "e-mail of wachtwoord onjuist"});
                    }
                }else{
                    //res.status(401).json({"error" : "e-mail of wachtwoord onjuist"});
                }
            }

        };
    });

});

module.exports = routes