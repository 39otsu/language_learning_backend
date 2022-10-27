var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const terms = require('../data/term_bank');

/* GET home page. */
router.get('/', function(req, res, next) {
  const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
  })

  con.connect((err) => {
    if (err) throw err;
    console.log('connected to database!');

    var x = [];

    for (var i = 0; i < terms.length; i++) {
        const u = i + 1
        const y = [u, terms[i][0]];
        x.push(y);
    }
    
    var sql = 'INSERT INTO words (rank, text) VALUES ?';
    con.query(sql, [x], (err, res) => {
        if (err) throw (err);
        console.log('Insert Operation Done.')
    })  

  })
});

module.exports = router;