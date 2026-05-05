const { readFile } = require('fs/promises');
const path = require('path');

/**Loads the contents of an sql-file by name from the sql-directory.*/
module.exports = async function loadSql(filename) {
  return await readFile(path.join(__dirname, `../sql/${filename}`), {
    encoding: 'utf-8',
  });
};
