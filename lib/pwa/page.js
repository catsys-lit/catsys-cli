'use strict';

const {createFile, tagToNameClass, msgConsole} = require('../util');
const fs = require('fs');

const createPage = pageName => {
  const tagName = `${pageName}-page`;
  const className = tagToNameClass(tagName);

  const dir = `${process.cwd()}/src/pages`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  createElement(dir, tagName, className);
  createAction(pageName);
  createReducer(pageName);
  modifyApp(pageName);
  console.log(msgConsole(`Page ${pageName} created`));
};

const createElement = (path, tagName, className) => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/redux/src/pages/page.tpl`, 'utf8');
    file = file.replace(/{{PAGE_TAG}}/gm, tagName);
    file = file.replace(/{{PAGE_CLASS}}/gm, className);
    createFile(path, `${tagName}.js`, file);
  } catch (error) {
    console.error(error);
  }
};

const createAction = actionName => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/redux/src/bridge/actions/action.tpl`, 'utf8');
    createFile(`${process.cwd()}/src/bridge/actions`, `${actionName}.js`, file);

    // Modify app.js action for the new navigation

    file = fs.readFileSync(`${process.cwd()}/src/bridge/actions/app.js`, 'utf8');
    const selector = 'switch (page) {';
    const indexOfSelector = file.indexOf(selector);
    file = file.substring(0, indexOfSelector + selector.length) + `
      case '${actionName}':
        import('../../pages/${actionName}-page.js');
      break;
    ` + file.substring(indexOfSelector + selector.length, file.length);
    createFile(`${process.cwd()}/src/bridge/actions`, `app.js`, file);
  } catch (error) {
    console.error(error);
  }
};

const createReducer = reducerName => {
  try {
    let file = fs.readFileSync(`${__dirname}/templates/redux/src/bridge/reducers/reducer.tpl`, 'utf8');
    file = file.replace(/{{PAGE_NAME}}/gm, reducerName);
    createFile(`${process.cwd()}/src/bridge/reducers`, `${reducerName}.js`, file);

    // Add new reducer to index.js into reducers/ directory

    file = fs.readFileSync(`${process.cwd()}/src/bridge/reducers/index.js`, 'utf8');
    const importApp = `import app from './app.js';`;
    const exportApp = 'export default {';
    const startPosition = file.indexOf(importApp);
    const newImport = `\nimport ${reducerName} from './${reducerName}.js';`;
    const newExport = `\n\u00A0\u00A0\u00A0\u00A0${reducerName},`;
    file = file.substring(0, startPosition + importApp.length) + newImport + file.substring(startPosition + importApp.length, file.length);
    file = file.substring(0, file.indexOf(exportApp) + exportApp.length) + newExport + file.substring(file.indexOf(exportApp) + exportApp.length, file.length);
    createFile(`${process.cwd()}/src/bridge/reducers`, `index.js`, file);
  } catch (error) {
    console.error(error);
  }
};

const modifyApp = pageName => {
  try {
    fs.readdirSync(`${process.cwd()}/src/`).forEach(file => {
      if (file.includes('-app.js')) {
        let appShellFile = fs.readFileSync(`${process.cwd()}/src/${file}`, 'utf8');
        let selector = `static get properties() {
    return {`;
        const newProperty = `
        _${pageName}State: {type: String},`;
        appShellFile =
          appShellFile.substring(0, appShellFile.indexOf(selector) + selector.length) +
          newProperty +
          appShellFile.substring(appShellFile.indexOf(selector) + selector.length, appShellFile.length);

        // stateChange callback
        selector = `stateChanged(state) {`;
        const newUpdate = `
        this._${pageName}State = state.${pageName}.data;`;
        appShellFile =
          appShellFile.substring(0, appShellFile.indexOf(selector) + selector.length) +
          newUpdate +
          appShellFile.substring(appShellFile.indexOf(selector) + selector.length, appShellFile.length);
        createFile(`${process.cwd()}/src`, file, appShellFile);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {createPage};
