'use strict';

const fs = require('fs');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const spawn = require('child_process').spawn;
const getPort = require('get-port');
const sass = require('node-sass');
const less = require('less');
const stylus = require('stylus');
const {createFile} = require('../util');

const serveComponent = () => {
  const child = process.env.comspec ? spawn(process.env.comspec, ['/c', 'polymer', 'serve']) : spawn('polymer', ['serve']);
  child.stdout.on('data', async (data) => {
    data = data.toString();
    const ports = data.match(/[0-9]{4}/gm);
    const port = ports[0];
    const newPort = await getPort({port: [8080, 8000, 3000]});
    browserSync.init({
      proxy: 'localhost:' + port,
      port: newPort,
      ui: {
        port: 8082
      },
      files: [
        'index.html',
        'test/**/*.html',
        'demo/!**/!*.js',
        'demo/index.html',
        '*.js'
      ].map(uri => `${process.cwd()}/${uri}`)
    });
  });

  child.stderr.on('data', (data) => {
    console.error(`Error at :\n${data}`);
  });
  watcher();
};

const compile = () => {
  try {
    let template = fs.readFileSync(`${__dirname}/templates/styles.tpl`, 'utf-8');
    let styles;
    fs.readdirSync(process.cwd()).forEach(async (file) => {
      if (file.includes('.scss')) {
        styles = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
        const result = sass.renderSync({
          data: styles
        });
        template = template.replace(/{{STYLES}}/gm, result.css);
        const path = `${process.cwd()}/${file.replace('.scss', '-styles.js')}`;
        createFile(path, template);
      } else if (file.includes('.less')) {
        styles = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
        const result = await less.render(styles);
        template = template.replace(/{{STYLES}}/gm, result.css);
        const path = `${process.cwd()}/${file.replace('.less', '-styles.js')}`;
        createFile(path, template);
      } else if (file.includes('.styl')) {
        styles = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
        stylus.render(styles, (error, css) => {
          template = template.replace(/{{STYLES}}/gm, css);
          const path = `${process.cwd()}/${file.replace('.styl', '-styles.js')}`;
          createFile(path, template);
        });
      } else if (file.includes('.css')){
        styles = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
        template = template.replace(/{{STYLES}}/gm, styles);
        const path = `${process.cwd()}/${file.replace('.css', '-styles.js')}`;
        createFile(path, template);
      }
    });
  } catch (error) {

  }

};

const watcher = () => {
  return watch(
    ['*.scss', '*.less', '*.styl', '*.css']
      .map(ext => `${process.cwd()}/${ext}`)
    , {ignoreInitial: false}, compile);
};

module.exports = {serveComponent};
