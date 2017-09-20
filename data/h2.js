const csv = require('csvtojson')
const _ = require('underscore');
const jsonfile = require('jsonfile');

const result = {};
let section;

csv()
.fromFile('./data/h2.csv')
.on('csv',(csvRow)=>{

  if (csvRow[0]) {
    console.log(csvRow[0]);
    section = {
      section: csvRow[1],
      kanji: csvRow[2],
      word: csvRow[3],
      character: csvRow[4],
      description: csvRow[5],
      rows: [],
    };

    result[csvRow[0]] = section;

  } else if (csvRow[1]) {
    row = {
      row: csvRow[1],
      description: csvRow[2],
      characters: [],
    };

    section.rows.push(row);

  } else if (csvRow[2]) {

    if (row.characters.length === 0) {
      const wordArray = _.compact(_.rest(csvRow, 3));
      for (let i = 0; i < wordArray.length; i++) {
        row.characters.push({});
      }
    }
    for (let i = 0; i < row.characters.length; i++) {
      if (csvRow[i + 3]) {
        row.characters[i][csvRow[2]] = csvRow[i + 3]
      }
    }
  }
})
.on('done',() => {
  jsonfile.writeFile('./dist/h2.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });
  console.log('end')
})
