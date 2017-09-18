const csv = require('csvtojson')
const _ = require('underscore');
const jsonfile = require('jsonfile');

const resultArray = [];
let section;
let row;

csv()
.fromFile('./data/hiragana.csv')
.on('csv',(csvRow)=>{

  if (csvRow[0]) {
    console.log(csvRow[0]);
    section = {
      section: csvRow[0],
      description: csvRow[3],
      kanji: csvRow[1],
      ruby: csvRow[2],
      rows: [],
    };

    resultArray.push(section);

  } else if (csvRow[1]) {
    row = {
      row: csvRow[1],
      description: csvRow[2],
      characters: [{},{},{},{},{}],
    };

    section.rows.push(row);

  } else if (csvRow[2]) {

    for (let i = 0; i < 5; i++) {
      if (csvRow[i + 3]) {
        row.characters[i][csvRow[2]] = csvRow[i + 3]
      }
    }
  }
})
.on('done',() => {
  jsonfile.writeFile('./dist/hiragana.json', resultArray, {spaces: 2}, function(err) {
    console.error(err)
  });
  console.log('end')
})
