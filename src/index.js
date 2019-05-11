const chalk = require('chalk');
const keypress = require('keypress');
const Tail = require('tail').Tail;
const program = require('commander');

let file;
program
  .version('1.0.0')
  .option('-a, --all', 'Read file form the beginning')
  .arguments('[filename]','File name to tail')
  .parse(process.argv);

const formatData = require('./formatData');
const conf = require('./config.json');

var stdin = process.stdin;

stdin.setEncoding( 'utf8' );

const tail = new Tail(program.args[0], { fromBeginning: program.all});

const handleLine = data => {
  const refinedData = formatData(data, filterMode, conf.highlights);
  if(refinedData){
    console.log(refinedData);
  }
};

let filterMode = true;
tail.on("line", handleLine);

tail.on("error", function(error) {
  console.log('ERROR: ', error);
});

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
    case 'b':
      console.log(chalk.blue('Bump\n\n\n\n\n'));
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
