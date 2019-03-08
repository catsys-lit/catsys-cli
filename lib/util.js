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

const createFile = (path, string) => {
  try {
    fs.writeFileSync(path, string);
  } catch (error) {
    console.error(error);
  }
};

const tagToNameClass = tagName => tagName
  .toLowerCase()
  .split('-')
  .map(word => (word[0].toUpperCase() + word.substring(1, word.length)))
  .join('');

module.exports = {msgConsole, createFile, createDirectory, tagToNameClass};
