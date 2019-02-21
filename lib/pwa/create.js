'use strict';

const fs = require('fs');
const {msgConsole} = require('../util');

const createApp = tagName => {
  const className = tagToNameClass(tagName);
  createDirectory(`${tagName}-app`);
  console.log(msgConsole('Directory base created'));
  const path = `${process.cwd()}/${tagName}-app`;
  createBaseFiles(path);
  createIndexFile(path, tagName, className);
  createPackageFile(path, tagName);
  createImages(path);
  console.log(msgConsole('Files base created'));
  try{
    fs.mkdirSync(`${path}/src`);
  }catch(e){console.log(e)}
  createElementFile(path, tagName, className);
  createUtils(path, tagName);
  createBridge(path);
  createPages(path);
  console.log(msgConsole('Files core created'));
  // createReadmeFile(path, tagName, className);
  // console.log(msgConsole('Readme created'));
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

const createIndexFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/index.tpl`, 'utf8');
    file = file.replace(/{{APP_TAG}}/gm, tagName);
    file = file.replace(/{{APP_CLASS}}/gm, className);
    createFile(path, 'index.html', file);
  } catch (error) {
    console.error(error);
  }
};

const createReadmeFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/readme.tpl`, 'utf8');
    file = file.replace(/{{APP_TAG}}/gm, tagName);
    file = file.replace(/{{APP_CLASS}}/gm, className);
    createFile(path, 'README.md', file);
  } catch (error) {
    console.error(error);
  }
};

const createPackageFile = (path, tagName) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/package.tpl`, 'utf8');
    file = file.replace(/{{APP_TAG}}/gm, tagName);
    createFile(path, 'package.json', file);
  } catch (error) {
    console.error(error);
  }
};

const createElementFile = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/element.tpl`, 'utf8');
    file = file.replace(/{{APP_TAG}}/gm, tagName);
    file = file.replace(/{{APP_CLASS}}/gm, className);
    createFile(`${path}/src`, `${tagName}-app.js`, file);
  } catch (error) {
    console.error(error);
  }
};

const createBaseFiles = path => {
  const files = [
    {
      name: '.gitignore',
      tpl: 'gitignore'
    },
    {
      name: `index.html`,
      tpl: 'index'
    },
    {
      name: `manifest.json`,
      tpl: 'manifest'
    },
    {
      name: `package.json`,
      tpl: 'package'
    },
    {
      name: `polymer.json`,
      tpl: 'polymer'
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

const createImages = path => {
  try {
    fs.mkdirSync(`${path}/images`);
    fs.mkdirSync(`${path}/images/manifest`);

    fs.copyFile(`${__dirname}/templates/favicon.ico`, `${path}/images/favicon.ico`, (err) => {
      if (err) throw err;
    });

    const assets = ['icon-48x48.png', 'icon-72x72.png', 'icon-96x96.png', 'icon-144x144.png', 'icon-192x192.png', 'icon-512x512.png'];
    for(const asset of assets) {
      fs.copyFile(`${__dirname}/templates/${asset}`, `${path}/images/manifest/${asset}`, (err) => {
        if (err) throw err;
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const createBridge = path => {
  try {
    fs.mkdirSync(`${path}/src/bridge`);
    fs.mkdirSync(`${path}/src/bridge/actions`);
    fs.mkdirSync(`${path}/src/bridge/reducers`);

    fs.copyFile(`${__dirname}/templates/bridge/store.tpl`, `${path}/src/bridge/store.js`, (err) => {
      if (err) throw err;
    });

    fs.copyFile(`${__dirname}/templates/bridge/app-action.tpl`, `${path}/src/bridge/actions/app.js`, (err) => {
      if (err) throw err;
    });
    fs.copyFile(`${__dirname}/templates/bridge/app-reducer.tpl`, `${path}/src/bridge/reducers/app.js`, (err) => {
      if (err) throw err;
    });
    fs.copyFile(`${__dirname}/templates/bridge/index.tpl`, `${path}/src/bridge/reducers/index.js`, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
  }
};

const createPages = path => {
  try {
    fs.mkdirSync(`${path}/src/pages`);

    fs.copyFile(`${__dirname}/templates/home.tpl`, `${path}/src/pages/home-page.js`, (err) => {
      if (err) throw err;
    });

    fs.copyFile(`${__dirname}/templates/default.tpl`, `${path}/src/pages/default-page.js`, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
  }
};

const createUtils = (path, tagName) => {
  try {
    fs.mkdirSync(`${path}/src/utils`);

    fs.copyFile(`${__dirname}/templates/icons.tpl`, `${path}/src/utils/${tagName}-icons.js`, (err) => {
      if (err) throw err;
    });

    fs.copyFile(`${__dirname}/templates/page-dm-helper.tpl`, `${path}/src/utils/page-dm.js`, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {createApp};
