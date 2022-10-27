const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');

router.get('/', async function(req, res, next) {

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

    //get number of entries
    var sql = await query('SELECT COUNT(rank) AS entries FROM words');
    var idx = await sql[0];
    
  } catch (error) {
    console.log("1")
    res.send({entries: 50000});
  } finally {
    con.end();
    res.send(idx);
  }
  
})

module.exports = router;