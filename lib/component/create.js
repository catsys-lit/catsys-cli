'use strict';

const fs = require('fs');
const colors = require('colors');

const createComponent = tagName => {
  const className = tagToNameClass(tagName);
  createDirectory(tagName);
  console.log(msgConsole('Directory base created'));
  const path = `${process.cwd()}/${tagName}`;
  createBaseFiles(path, tagName);
  createIndexFile(path, className);
  createPackageFile(path, tagName);
  createElementFile(path, tagName, className);
  console.log(msgConsole('Files core created'));
  createDemo(path, tagName, className);
  console.log(msgConsole('Demo created'));
  createTest(path, tagName);
  console.log(msgConsole('Tests created'));
  createReadmeFile(path, tagName, className);
  console.log(msgConsole('Readme created'));

  // destination.txt will be created or overwritten by default.
  fs.copyFile(`${__dirname}/templates/catsys.png`, `${path}/${tagName}.png`, (err) => {
    if (err) throw err;
  });
};

const msgConsole = message => {
  return `${colors.blue('[Catsys]')} - ${colors.green(message)}`;
};

const tagToNameClass = tagName => tagName
  .toLowerCase()
  .split('-')
  .map(word => (word[0].toUpperCase() + word.substring(1, word.length)))
  .join('');

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

const createIndexFile = (path, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/index.tpl`, 'utf8');
    file = file.replace('{{CLASS_NAME}}', className);
    createFile(path, 'index.html', file);
  } catch (error) {
    console.error(error);
  }
};

const createReadmeFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/readme.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    file = file.replace(/{{CLASS_NAME}}/gm, className);
    createFile(path, 'README.md', file);
  } catch (error) {
    console.error(error);
  }
};

const createPackageFile = (path, tagName) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/package.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    createFile(path, 'package.json', file);
  } catch (error) {
    console.error(error);
  }
};

const createElementFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/element.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    file = file.replace(/{{CLASS_NAME}}/gm, className);
    createFile(path, `${tagName}.js`, file);
  } catch (error) {
    console.error(error);
  }
};

const createBaseFiles = (path, tagName) => {
  const files = [
    {
      name: '.gitignore',
      tpl: 'gitignore'
    },
    {
      name: '.editorconfig',
      tpl: 'editor-config'
    },
    {
      name: 'karma.conf.js',
      tpl: 'karma.config'
    },
    {
      name: `${tagName}.scss`,
      tpl: 'sass'
    },
    {
      name: `${tagName}-styles.js`,
      tpl: 'styles-js'
    },
    {
      name: `.travis.yml`,
      tpl: 'travis'
    }];

  for (const file of files) {
    try {
      const fileData = fs.readFileSync(`${__dirname}/templates/${file.tpl}.tpl`, 'utf8');
      createFile(path, file.name, fileData);
    } catch (error) {
      console.error(error);
    }
  }
};

const createDemo = (path, tagName, className) => {
  try {
    fs.mkdirSync(`${path}/demo`);

    let file = fs.readFileSync(`${__dirname}/templates/demo.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    file = file.replace(/{{CLASS_NAME}}/gm, className);
    createFile(`${path}/demo`, 'index.html', file);
  } catch (error) {
    console.error(error);
  }
};

const createTest = (path, tagName) => {
  try {
    fs.mkdirSync(`${path}/test`);
    let file = fs.readFileSync(`${__dirname}/templates/test.tpl`, 'utf8');
    file = file.replace(/{{TAG_NAME}}/gm, tagName);
    createFile(`${path}/test`, `${tagName}.spec.js`, file);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {createComponent};
