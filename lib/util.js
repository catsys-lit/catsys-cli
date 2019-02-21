'use strict';

const colors = require('colors');

const msgConsole = message => {
  return `${colors.blue('[Catsys]')} - ${colors.green(message)}`;
};

module.exports = {msgConsole};
