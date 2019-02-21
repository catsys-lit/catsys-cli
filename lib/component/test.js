'use strict';

const exec = require('child_process').exec;

const test = () => {
  exec('npm test', (err, stdout, stderr) => {
    console.log('out', stdout);
    console.log('err', stderr);
    console.log('error', err);
  });
};

module.exports = { test };
