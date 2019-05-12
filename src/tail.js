const Tail = require('tail').Tail;
const formatData = require('./formatData');
const getConfig = require('./conf.js');

const conf = getConfig();
const handleLine = (data, filterMode) => {
  const refinedData = formatData(data, filterMode, conf.highlights);
  if(refinedData){
    console.log(refinedData);
  }
};

const handleLineFiltered = data => handleLine(data, true);
const handleLineUnFiltered = data => handleLine(data, false);

let tail;
const startTailing = (filename, _fromBeginning, filterMode) => {
  if(tail) {
    tail.unwatch();
  }
  tail = undefined;
  tail = new Tail(filename, { fromBeginning: _fromBeginning });

  const lineHandler = filterMode?handleLineFiltered:handleLineUnFiltered;


  tail.on("line", lineHandler);

  tail.on("error", function(error) {
    console.log('ERROR: ', error);
  });
}

module.exports=startTailing;
