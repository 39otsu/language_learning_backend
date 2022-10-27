const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const fetchDefinitions = require('../api/jisho_wrap');
const fetchSentences = require('../api/massif');

router.get('/:rank', async function(req, res, next) {

  const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
  })
  const query = util.promisify(con.query).bind(con);
  res.set('Access-Control-Allow-Origin', '*');
  
  var result = {
    rank: 0,
    phrase: '',
    definitions: [],
    video_link: '',
    example_sentences: []
  }

  try {
    con.connect((err) => {
      console.log('Connected to Database!')
      //console.log(req.params.word)
      if (err) throw err;
    })
    //check if exists, get phrase
    const sql = await query('SELECT * FROM words WHERE rank = "'+ req.params.rank +'"');

    //successful return is gatekept by valid sql entry
    //this is to heighten chance of defs,sentences,link actually existing
    if (await sql.length > 0) {
      result.phrase = await sql[0].phrase;
      result.rank = await sql[0].rank;
      result.definitions = await fetchDefinitions(await sql[0].phrase);
      result.example_sentences = await fetchSentences(await sql[0].phrase);
      result.video_link = 'https://youglish.com/pronounce/'+ await sql[0].phrase +'/japanese'
    }

  } catch (error) {
    console.log(error)
    //res.send(result);
  } finally {
    con.end()
    res.send(result);
  }

  
})

module.exports = router;