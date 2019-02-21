'use strict';

const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const {msgConsole} = require('../util');

const serveApp = mode => {
  switch (mode) {
    case 'develop':
      exec('polymer serve', (err, stdout, stderr) => {
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
          'src/**/*.js',
          '*.js'
        ].map(uri => `${process.cwd()}/${uri}`)
      });
      break;
    case 'static':
      exec('polymer build && polymer serve --port 5000 build/es5-bundled -o', (err, stdout, stderr) => {
        console.log('out', stdout);
        console.log('err', stderr);
        console.log('error', err);
      });
      console.log(msgConsole('Serving static files at: http://127.0.0.1:5000/'));
      break;
  }
};


module.exports = {serveApp};
