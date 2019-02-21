#! /usr/bin/env node

'use strict';

const core = require('../lib');
const program = require('commander');

program.version('1.0.0', '-v, --version');

program
  .command('component:create <tag>')
  .action((tag, cmd) => {
    // Options or flags exist in cmd
    core.createComponent(tag);
  });

program
  .command('component:serve')
  .action((tag, cmd) => {
    // Options or flags exist in cmd
    core.serveComponent();
  });

program
  .command('component:test')
  .action((tag, cmd) => {
    // Options or flags exist in cmd
    core.test();
  });

program.parse(process.argv);
