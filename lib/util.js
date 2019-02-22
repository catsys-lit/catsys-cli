'use strict';

const colors = require('colors');
const fs = require('fs');

const msgConsole = message => {
  return `${colors.blue('[Catsys]')} - ${colors.green(message)}`;
};

const createDirectory = directoryName => {
  try {
    fs.mkdirSync(`${process.cwd()}/${directoryName}`);
  } catch (error) {
    console.error(error);
  }
};

const createFile = (path, fileName, string) => {
  try {
    fs.writeFileSync(`${path}/${fileName}`, string);
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
