//
// ./api/routes_v2.js
//
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

var mijnObject = {
    mijntekst: 'Hello World!',
    label: "Lekker inloggen met je eigen gegevens",
    mijnarray: ["Wel eerst registreren", "met je eigen wachtwoord", 2],
    mijnobject: {
        mijnlabel: 'mijntekst',
        getal: 4
    }
};

routes.get('/hello', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json(mijnObject);
});

routes.get('/goodbye', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({ 'tekst': 'Goodbye!' });
});

routes.post('/register', function (req, res) {

    console.dir(req.body);

    var password = req.body.password;
    //var EncPass = CryptoJS.MD5(password);

    //Create Date
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    var timestamp = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    var email = req.body.email;

    var customer = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": email,
        "password": req.body.password,
        "active": 1,
        "create_date": datetime,
        "last_update": datetime
    }

    db.query('SELECT * FROM customer WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send({
                "Code": 400,
                "Error": "An error has ocurred"
            })
        } else {
            if (results.length > 0) {
                res.send({
                    "Code": 400,
                    "Error": "Email is already known in out database, use another one"
                })
            } else {
                //create account
                db.query('INSERT INTO customer SET ?', customer, function (error, results, fields) {
                    if (error) {
                        console.log("error occurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error occurred"
                        })
                    } else {
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "User registered successfully"
                        });
                    }
                });
            }
        }
    });
});

routes.get('/films', function (req, res) {

    var filmId = req.params.filmid;

    res.contentType('application/json');

    db.query('SELECT * FROM film ', function (error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/films/:filmid', function (req, res) {

    var filmId = req.params.filmid;

    res.contentType('application/json');

    db.query('SELECT * FROM film WHERE film_id=?', [filmId], function (error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/rentals', function (req, res) {

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT * FROM rental', function (error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/rentals/:userid', function (req, res) {

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE customer_id=?', [userId], function (error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.post('/rentals/:userid/:inventoryid', function (req, res) {

    var userID = req.params.userid;

    var inventoryID = req.params.inventoryid;



    //Create Date

    var currentdate = new Date();

    var datetime = currentdate.getFullYear() + "-"

        + (currentdate.getMonth() + 1) + "-"

        + currentdate.getDate() + " "

        + currentdate.getHours() + ":"

        + currentdate.getMinutes() + ":"

        + currentdate.getSeconds();



    var rental_date = datetime;



    var rental = {

        "rental_date": rental_date,

        "inventory_id": inventoryID,

        "customer_id": userID,

        "staff_id": 1,

        "last_update": datetime

    }



    db.query('SELECT * FROM rental WHERE customer_id = ? AND inventory_id = ?', [userID, inventoryID], function (error, results, fields) {

        if (error) {

            //console.log(error);

            res.send({

                "Code": 400,

                "Error": "An error has ocurred"

            })

        } else {

            if (results.length > 0) {

                res.send({

                    "Code": 400,

                    "Error": "You already rented this film"

                })

            } else {

                //insert rental

                db.query('INSERT INTO rental SET ?', rental, function (error, results, fields) {

                    if (error) {

                        console.log("error occurred", error);

                        res.send({

                            "code": 400,

                            "failed": "error occurred"

                        })

                    } else {

                        //console.log('The solution is: ', results);

                        res.send({

                            "code": 200,

                            "success": "Film rented successfully"

                        });

                    }

                });

            }

        }

    });

});

routes.put('/rentals/:userid/:inventoryid', function (req, res) {

    res.contentType('application/json');

    var userID = req.params.userid;

    var inventoryID = req.params.inventoryid;



    var currentdate = new Date();

    var return_date = currentdate.getFullYear() + "-"

        + (currentdate.getMonth() + 1) + "-"

        + currentdate.getDate() + " "

        + currentdate.getHours() + ":"

        + currentdate.getMinutes() + ":"

        + currentdate.getSeconds();



    db.query('SELECT * FROM rental WHERE customer_id = ? AND inventory_id = ?', [userID, inventoryID], function (error, results, fields) {

        if (error) {

            //console.log(error);

            res.send({

                "Code": 400,

                "Error": "An error has ocurred"

            })

        } else {

            if (results.length > 0) {

                //insert rental, moet return_date aanpassen

                db.query('UPDATE rental SET return_date = ? WHERE customer_id = ? AND inventory_id = ?', [return_date, userID, inventoryID], function (error, results, fields) {

                    if (error) {

                        console.log("error occurred", error);

                        res.send({

                            "code": 400,

                            "failed": "error occurred"

                        })

                    } else {

                        console.log('The solution is: ', results, return_date);

                        res.send({

                            "code": 200,

                            "success": "Film rental edited successfully"

                        });

                    }

                });

            } else {

                res.send({

                    "Code": 400,

                    "Error": "No such rental for this user"

                })

            }

        }

    });

});

routes.delete('/rentals/:userid/:inventoryid', function (req, res) {

    res.contentType('application/json');

    var userID = req.params.userid;

    var inventoryID = req.params.inventoryid;



    db.query('SELECT * FROM rental WHERE customer_id = ? AND inventory_id = ?', [userID, inventoryID], function (error, results, fields) {

        if (error) {

            //console.log(error);

            res.send({

                "Code": 400,

                "Error": "An error has ocurred"

            })

        } else {

            if (results.length > 0) {

                //insert rental, moet return_date aanpassen voor de android app

                db.query('DELETE FROM rental WHERE customer_id = ? AND inventory_id = ?', [userID, inventoryID], function (error, results, fields) {

                    if (error) {

                        console.log("error occurred", error);

                        res.send({

                            "code": 400,

                            "failed": "error occurred"

                        })

                    } else {

                        console.log('The solution is: ', results);

                        res.send({

                            "code": 200,

                            "success": "Film rental deleted successfully"

                        });

                    }

                });

            } else {

                res.send({

                    "Code": 400,

                    "Error": "No such rental for this user"

                })

            }

        }

    });

});
module.exports = routes;