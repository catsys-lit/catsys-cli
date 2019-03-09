'use strict';

const fs = require('fs');
const {tagToNameClass, createDirectory, _generateFiles} = require('../util');

const createApp = (tagName, typeApp) => {
  const className = tagToNameClass(tagName);
  const path = `${process.cwd()}/${tagName}-app`;
  let files = [];

  switch (typeApp) {
    case 'redux':
      files = [
        {
          name: '.gitignore',
          path: {
            in: `${__dirname}/templates/${typeApp}/gitignore.tpl`,
            out: path
          },
          data: []
        },
        {
          name: 'index.html',
          path: {
            in: `${__dirname}/templates/${typeApp}/index.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: 'manifest.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/manifest.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: 'package.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/package.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: 'polymer.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/polymer.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: 'README.md',
          path: {
            in: `${__dirname}/templates/${typeApp}/readme.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: `${tagName}-app.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/element.tpl`,
            out: `${path}/src`
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: `${tagName}-styles.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/styles.tpl`,
            out: `${path}/src`
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: `home-page.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/pages/home.tpl`,
            out: `${path}/src/pages`
          },
          data: []
        },
        {
          name: `default-page.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/pages/default.tpl`,
            out: `${path}/src/pages`
          },
          data: []
        },
        {
          name: `${tagName}-icons.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/icons.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        },
        {
          name: `${tagName}-transitions.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/transitions.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        },
        {
          name: `page-dm.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/page-dm-helper.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        },
        {
          name: `store.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/bridge/store.tpl`,
            out: `${path}/src/bridge`
          },
          data: []
        },
        {
          name: `index.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/bridge/reducers/index.tpl`,
            out: `${path}/src/bridge/reducers`
          },
          data: []
        },
        {
          name: `app.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/bridge/reducers/app-reducer.tpl`,
            out: `${path}/src/bridge/reducers`
          },
          data: []
        },
        {
          name: `app.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/bridge/actions/app-action.tpl`,
            out: `${path}/src/bridge/actions`
          },
          data: []
        }
      ];
      break;
    case 'basic':
      files = [
        {
          name: '.gitignore',
          path: {
            in: `${__dirname}/templates/${typeApp}/gitignore.tpl`,
            out: path
          },
          data: []
        },
        {
          name: 'index.html',
          path: {
            in: `${__dirname}/templates/${typeApp}/index.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: 'manifest.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/manifest.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: 'package.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/package.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: 'polymer.json',
          path: {
            in: `${__dirname}/templates/${typeApp}/polymer.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: 'README.md',
          path: {
            in: `${__dirname}/templates/${typeApp}/readme.tpl`,
            out: path
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            }
          ]
        },
        {
          name: `${tagName}-app.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/element.tpl`,
            out: `${path}/src`
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: `${tagName}-styles.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/styles.tpl`,
            out: `${path}/src`
          },
          data: [
            {
              uid: '{{APP_TAG}}',
              value: tagName
            },
            {
              uid: '{{APP_CLASS}}',
              value: className
            }
          ]
        },
        {
          name: `home-page.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/pages/home.tpl`,
            out: `${path}/src/pages`
          },
          data: []
        },
        {
          name: `default-page.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/pages/default.tpl`,
            out: `${path}/src/pages`
          },
          data: []
        },
        {
          name: `${tagName}-icons.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/icons.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        },
        {
          name: `${tagName}-transitions.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/transitions.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        },
        {
          name: `page-dm.js`,
          path: {
            in: `${__dirname}/templates/${typeApp}/src/utils/page-dm-helper.tpl`,
            out: `${path}/src/utils`
          },
          data: []
        }
      ];
      break;
  }

  _generateFiles(files);
  createImages(path);
};

const createImages = path => {
  try {
    createDirectory(`${path}/images`);
    createDirectory(`${path}/images/manifest`);

    fs.copyFile(`${__dirname}/templates/redux/images/favicon.ico`, `${path}/images/favicon.ico`, (err) => {
      if (err) throw err;
    });

    const assets = ['icon-48x48.png', 'icon-72x72.png', 'icon-96x96.png', 'icon-144x144.png', 'icon-192x192.png', 'icon-512x512.png'];
    for (const asset of assets) {
      fs.copyFile(`${__dirname}/templates/redux/images/manifest/${asset}`, `${path}/images/manifest/${asset}`, (err) => {
        if (err) throw err;
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {createApp};
