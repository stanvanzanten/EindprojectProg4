var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : process.env.DB_PASSWORD,
    database : 'prog4databases'
});

connection.connect();

connection.query('SELECT * from film LIMIT 3',
    function(error, rows, fields) {
        if (error)
            console.log('' + error);
        else
            console.dir(rows);
    });

connection.end();

