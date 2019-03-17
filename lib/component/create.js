'use strict';

const fs = require('fs');
const {msgConsole, _generateFiles, createFile, tagToNameClass} = require('../util');

const createComponent = (tagName, styles) => {
  const className = tagToNameClass(tagName);
  const path = `${process.cwd()}/${tagName}`;
  let files = [
    {
      name: '.editorconfig',
      path: {
        in: `${__dirname}/templates/editor-config.tpl`,
        out: path
      },
      data: []
    },
    {
      name: '.gitignore',
      path: {
        in: `${__dirname}/templates/gitignore.tpl`,
        out: path
      },
      data: []
    },
    {
      name: '.travis.yml',
      path: {
        in: `${__dirname}/templates/travis.tpl`,
        out: path
      },
      data: []
    },
    {
      name: 'index.html',
      path: {
        in: `${__dirname}/templates/index.tpl`,
        out: path
      },
      data: [
        {
          uid: '{{CLASS_NAME}}',
          value: className
        }
      ]
    },
    {
      name: 'karma.conf.js',
      path: {
        in: `${__dirname}/templates/karma.config.tpl`,
        out: path
      },
      data: []
    },
    {
      name: `${tagName}-styles.js`,
      path: {
        in: `${__dirname}/templates/styles-js.tpl`,
        out: path
      },
      data: []
    },
    {
      name: `${tagName}.js`,
      path: {
        in: `${__dirname}/templates/element.tpl`,
        out: path
      },
      data: [
        {
          uid: '{{TAG_NAME}}',
          value: tagName
        },
        {
          uid: '{{CLASS_NAME}}',
          value: className
        }
      ]
    },
    {
      name: 'index.html',
      path: {
        in: `${__dirname}/templates/demo/demo.tpl`,
        out: `${path}/demo`
      },
      data: [
        {
          uid: '{{TAG_NAME}}',
          value: tagName
        },
        {
          uid: '{{CLASS_NAME}}',
          value: className
        }
      ]
    },
    {
      name: `${tagName}.spec.js`,
      path: {
        in: `${__dirname}/templates/test/test.tpl`,
        out: `${path}/test`
      },
      data: [
        {
          uid: '{{TAG_NAME}}',
          value: tagName
        }
      ]
    },
    {
      name: 'package.json',
      path: {
        in: `${__dirname}/templates/package.tpl`,
        out: path
      },
      data: [
        {
          uid: '{{TAG_NAME}}',
          value: tagName
        }
      ]
    },
    {
      name: 'README.md',
      path: {
        in: `${__dirname}/templates/readme.tpl`,
        out: path
      },
      data: [
        {
          uid: '{{TAG_NAME}}',
          value: tagName
        }
      ]
    }
  ];
  switch (styles) {
    case 'stylus':
      files = [
        ...files,
        {
          name: `${tagName}.styl`,
          path: {
            in: `${__dirname}/templates/stylus.tpl`,
            out: path
          },
          data: []
        }
      ];
      break;
    case 'less':
      files = [
        ...files,
        {
          name: `${tagName}.less`,
          path: {
            in: `${__dirname}/templates/less.tpl`,
            out: path
          },
          data: []
        }
      ];
      break;
    case 'sass':
      files = [
        ...files,
        {
          name: `${tagName}.scss`,
          path: {
            in: `${__dirname}/templates/sass.tpl`,
            out: path
          },
          data: []
        }
      ];
      break;
    default:
      files = [
        ...files,
        {
          name: `${tagName}.css`,
          path: {
            in: `${__dirname}/templates/sass.tpl`,
            out: path
          },
          data: []
        }
      ];
      break;
  }
  _generateFiles(files);

  fs.copyFile(`${__dirname}/templates/catsys.svg`, `${path}/${tagName}.svg`, error => {
    if (error) throw error;
  });
};

module.exports = {createComponent};
