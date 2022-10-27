//massif is used to fetch sentences
//get at most five
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchSentences(keyword) {
  var sentences = [];

  const res = await axios('https://massif.la/ja/search?q=' + keyword)
  const $ = await cheerio.load(res.data);

  // if any results are found, push a sentence into the array
  if ($('ul').children().length > 0) {
    $('li[class=text-japanese]').children().map((i, elem) =>{
      if (i % 2 == 0 && i <= 10) {
        sentences.push($(elem).text());
      }
    })
  }

  return sentences;
}

module.exports = fetchSentences;