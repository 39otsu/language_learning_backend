var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const terms = require('../data/term_bank');

/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b9c8094727b131',
    password: '32226ac6',
    database: 'heroku_6a49f4f5b429713'
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