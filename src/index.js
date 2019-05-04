const chalk = require('chalk');

const Tail = require('tail').Tail;
const formatData = require('./formatData');
const conf = require('./config.json');

var stdin = process.stdin;
// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

const tail = new Tail("sample.txt", { fromBeginning: true});
 

let filterMode = true;
tail.on("line", function(data) {
  const refinedData = formatData(data, filterMode, conf.highlights);
  if(refinedData){
    console.log(refinedData);
  }
  
});
 
tail.on("error", function(error) {
  console.log('ERROR: ', error);
});

const keypress = require('keypress');
keypress(process.stdin);



process.stdin.on('keypress', function (ch, key) {
  // console.log('got "keypress"', key);
  if (key) { 
    switch(key.name) {
    case 'h':
      console.log(chalk.blue('Press f to toggle filter out unmatched items'));
      console.log(chalk.blue('Press i to for info'));
    break;
    case 'i':
      console.log(chalk.blue('Press f to toggle filter out unmatched items'));
      console.log(chalk.blue('Press i to for info'));
      break;
    case 'f':
    filterMode = !filterMode;
      console.log(chalk.blue('Filter ' + (filterMode?'enabled':'disabled')));
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
