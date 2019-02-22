#! /usr/bin/env node

'use strict';

const core = require('../lib');
const program = require('commander');

program.version('1.0.0', '-v, --version');

program
  .command('component:create <tag>')
  .action(tag => {
    if (!tag.includes('-')) {
      tag = `${tag}-component`;
    }
    core.createComponent(tag);
  });

program
  .command('component:serve')
  .action(() => {
    core.serveComponent();
  });

program
  .command('component:test')
  .action(() => {
    core.test();
  });

// PWA commands

program
  .command('app:serve')
  .option('-d, --develop', 'Develop mode')
  .option('-s, --static', 'ES5 compiled mode')
  .action(cmd => {
    let mode = 'develop';
    if (cmd.develop) {
      mode = 'develop';
    }
    if (cmd.static) {
      mode = 'static';
    }
    core.serveApp(mode);
  });

program
  .command('app:create <tag>')
  .action(tag => {
    core.createApp(tag);
  });

program
  .command('app:component <tag>')
  .action(tag => {
    if (!tag.includes('-')) {
      tag = `${tag}-component`;
    }
    core.createComponentInApp(tag);
  });

program.parse(process.argv);
