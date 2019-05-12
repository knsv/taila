#!/usr/bin/env node
const chalk = require('chalk');
const keypress = require('keypress');
const program = require('commander');
const startTailing = require('./tail.js');

let file;
program
  .version('1.0.0')
  // .option('-h, --help', 'Display this help')
  .option('-a, --all', 'Read file form the beginning')
  .option('-l, --filter', 'Filter mode, do not display rows that does not match any pattern')
  .arguments('[filename]','File name to tail')
  .parse(process.argv);

var stdin = process.stdin;

stdin.setEncoding( 'utf8' );
// if(program.help) {
//   program.outputHelp();
//   process.exit(0);
// }
let filterMode = false || program.filter;

keypress(process.stdin);

startTailing(program.args[0], program.all, filterMode);

process.stdin.on('keypress', function (ch, key) {
  if (key) {
    switch(key.name) {
    case 'h':
      console.log(chalk.blue('Press f to toggle filter out unmatched items'));
      console.log(chalk.blue('Press i to for info'));
      console.log(chalk.blue('Press b to insert a few new lines in the listing'));
      console.log(chalk.blue('Press r to relod the file'));
    break;
    case 'i':
      console.log(chalk.blue('Press f to toggle filter out unmatched items'));
      console.log(chalk.blue('Press i to for info'));
      console.log(chalk.blue('Press b to insert a few new lines in the listing'));
      console.log(chalk.blue('Press r to relod the file'));
      break;
    case 'f':
    filterMode = !filterMode;
    startTailing(program.args[0], false, filterMode);
    console.log(chalk.blue('Filter ' + (filterMode?'enabled':'disabled')));
    break;
    case 'b':
      console.log(chalk.blue('\n\n\n\n\n\n\n\n\n\n'));
    break;
    case 'r':
      console.log(chalk.blue('Reloading the file'));
      startTailing(program.args[0], true, filterMode);
    break;
    case 'c':
       if(key.ctrl && !key.shift) {
         process.exit(-1);
       }
    break;
    case 'q':
    process.exit(0);
    break;
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
