//Jisho will be used to fetch definitions
//https://jisho.org/api/v1/search/words?keyword=
/*
{
    parts_of_speech: '',
    definition: []
}
*/
const axios = require("axios");

async function fetchDefinitions(keyword) {
  var definitions = []

  var res = await axios('https://jisho.org/api/v1/search/words?keyword=' + keyword);
  definitions.push({
    parts_of_speech : await res.data.data[0].senses[0].parts_of_speech[0],
    definition : await res.data.data[0].senses[0].english_definitions
  })

  return definitions;
}

module.exports = fetchDefinitions;