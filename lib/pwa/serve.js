'use strict';

const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const getPort = require('get-port');
const {msgConsole} = require('../util');

const serveApp = mode => {
  switch (mode) {
    case 'develop':
      const child = spawn(process.env.comspec, ['polymer', 'serve']);
      child.stdout.on('data', async (data) => {
        data = data.toString();
        const ports = data.match(/[0-9]{4}/gm);
        const port = ports[0];
        const newPort = await getPort({port: [8080, 8000, 3000]});
        browserSync.init({
          proxy: `localhost:${port}`,
          port: newPort,
          ui: {
            port: 8082
          },
          files: [
            'index.html',
            'src/**/*.js',
            '*.js'
          ].map(uri => `${process.cwd()}/${uri}`)
        });
      });

      child.stderr.on('data', (data) => {
        console.error(`Error at :\n${data}`);
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
