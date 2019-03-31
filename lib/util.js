'use strict';

const colors = require('colors');
const fs = require('fs');

const msgConsole = message => {
  return `${colors.blue('[Catsys]')} - ${colors.green(message)}`;
};

const createDirectory = path => {
  try {
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
  } catch (error) {
    console.error(error);
  }
};

const createFile = (path, name, string) => {
  try {
    fs.writeFileSync(`${path}/${name}`, string);
  } catch (error) {
    console.error(error);
  }
};

const _generateFiles = files => {
  for (const file of files) {
    try {
      let fileData = fs.readFileSync(file.path.in, 'utf8');
      for (const item of file.data) {
        const regex = new RegExp(item.uid, 'gm');
        fileData = fileData.replace(regex, item.value);
      }
      createDirectory(file.path.out);
      createFile(`${file.path.out}, ${file.name}`, fileData);
      console.log(msgConsole(`${file.name} file created`));
    } catch (error) {
      console.error(error);
    }
  }
};

const tagToNameClass = tagName => tagName
  .toLowerCase()
  .split('-')
  .map(word => (word[0].toUpperCase() + word.substring(1, word.length)))
  .join('');

module.exports = {msgConsole, createFile, createDirectory, tagToNameClass, _generateFiles};
