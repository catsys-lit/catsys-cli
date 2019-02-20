'use strict';

const fs = require('fs');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const exec = require('child_process').exec;
const sass = require('node-sass');

gulp.task('browser-sync', done => {
  browserSync.reload();
  done();
});

const serveComponent = () => {
  exec('polymer serve --npm', (err, stdout, stderr) => {
    console.log('out', stdout);
    console.log('err', stderr);
    console.log('error', err);
  });

  browserSync.init({
    proxy: 'localhost:8081',
    port: 8080,
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
