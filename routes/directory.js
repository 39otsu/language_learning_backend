const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');

//returns random word
router.get('/:idx', async function(req, res, next) {

  const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
  })
  const query = util.promisify(con.query).bind(con);
  res.set('Access-Control-Allow-Origin', '*');
  
  var o = {
    result: []
  }

  try {
    con.connect((err) => {
      console.log('Connected to Database!');
      //req.params.word
      if (err) throw err;
    })

    const sql = await query('SELECT * FROM words WHERE rank >= '+ req.params.idx + ' LIMIT 100');
    o.result = await sql;
  } catch (error) {
    console.log(error);
  } finally {
    con.end();
    res.send(o);
  }

});

module.exports = router;
