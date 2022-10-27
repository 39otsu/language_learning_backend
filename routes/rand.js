const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const dbvar = require('../mysql-config');
const default_result = require('../data/default_result');

//returns random word
router.post('/', async function(req, res, next) {

  const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
  })
  const query = util.promisify(con.query).bind(con);
  res.set('Access-Control-Allow-Origin', '*');
  try {
    con.connect((err) => {
      if (err) throw err;
    })

    //get random number between 1 and highest entry number
    const idx = Math.floor(Math.random() * req.body.count);

    //get random word from db
    const sql = await query('SELECT * FROM words WHERE rank = ' + idx.toString());
    con.query(sql, (err, response) => {
      if (err) throw (err);
      res.send(response[0]);
    })  

    con.end();
  } catch (error) {
    res.send(default_result);
    console.log(error)
  }
})

module.exports = router;
//SELECT COUNT(*) FROM count_demos;