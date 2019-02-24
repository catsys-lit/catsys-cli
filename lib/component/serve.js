'use strict';

const fs = require('fs');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const getPort = require('get-port');
const sass = require('node-sass');

const serveComponent = () => {
  const child = spawn(process.env.comspec, ['/c', 'polymer', 'serve']);
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

const createFile = (path, fileName, string) => {
  try {
    fs.writeFileSync(`${path}/${fileName}`, string);
  } catch (error) {
    console.error(error);
  }
};

const compile = () => {
  try {
    let template = fs.readFileSync(`${__dirname}/templates/styles.tpl`, 'utf-8');
    let styles;
    fs.readdirSync(process.cwd()).forEach(file => {
      if(file.includes('.scss')) {
        styles = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
        const result = sass.renderSync({
          data: styles
        });
        template = template.replace(/{{STYLES}}/gm, result.css);
        createFile(process.cwd(), file.replace('.scss', '-styles.js'), template);
      }
    });
  } catch (error) {
  }

};

const watcher = () => {
  return watch(process.cwd() + '/*.scss', {ignoreInitial: false}, compile);
};

module.exports = {serveComponent};
