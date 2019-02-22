'use strict';

const fs = require('fs');
const {msgConsole} = require('../util');

const createComponentInApp = tagName => {
  const className = tagToNameClass(tagName);
  const dir = `${process.cwd()}/src/components`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  createElementFile(dir, tagName, className);
  console.log(msgConsole(`Component created in: src/components/${tagName}.js`));
};

const createElementFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/component.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    file = file.replace(/{{CLASS_NAME}}/gm, className);
    createFile(path, `${tagName}.js`, file);
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

module.exports = {createComponentInApp};
