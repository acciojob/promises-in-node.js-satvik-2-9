const { rejects } = require('assert');
const fs = require('fs');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function sumColumn(filePath, columnName) {
  return readFile(filePath).then(data => {
    const lines = data.split('\n');
    const header = lines[0].split(',');

    const columnIndex = header.indexOf(columnName);

    if (columnIndex === -1) {
      throw new Error(`Column '${columnName}' not found in the CSV.`);
    }

    let sum = 0;
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      sum += parseFloat(values[columnIndex]);
    }

    return `The sum of column ${columnName} is: ${sum}`;
  });
}

const filePath = process.argv[2];
const columnName = process.argv[3];

sumColumn(filePath, columnName)
  .then(sum => {
    console.log(`The sum of column ${columnName} is: ${sum}`);
  })
  .catch(err => {
    console.error(err.message);
  });
