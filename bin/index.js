#! /usr/bin/env node

'use strict';

const core = require('../lib');
const program = require('commander');
const pkg = require('../package.json');

program.version(pkg.version, '-v, --version');

// Component commands

program
  .command('component:create <tag>')
  .option('-s, --styles [style]', 'Select styles pre-processor for developing')
  .action((tag, cmd) => {
    if (!tag.includes('-')) {
      tag = `${tag}-component`;
    }
    core.createComponent(tag, cmd.styles);
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
  .option('-b, --basic', 'Simple PWA')
  .option('-r, --redux', 'Redux PWA integration')
  .action((tag, cmd) => {
    let type = 'basic';
    if(cmd.basic) {
      type = 'basic';
    }
    if(cmd.redux) {
      type = 'redux';
    }
    core.createApp(tag, type);
  });

program
  .command('app:component <tag>')
  .action(tag => {
    if (!tag.includes('-')) {
      tag = `${tag}-component`;
    }
    core.createComponentInApp(tag);
  });

program
  .command('app:page <tag>')
  .action(name => {
    core.createPage(name);
  });

program.parse(process.argv);
