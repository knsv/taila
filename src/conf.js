const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const cwd = process.cwd();

const loadIfExists = path => {
  try {
    if (fs.existsSync(path)) {
      //file exists
      const file = require(path);
      return file;
    }
  } catch(err) {
    console.error(err)
  }
}

const getConf = () => {
  let conf = loadIfExists(path.join(cwd + '/.tailor.conf.js'));
  if(conf) return conf;

  conf = loadIfExists(path.join(homedir + '/.tailor.conf.js'));
  if(conf) return conf;

  return require('./config.json');
}



module.exports = getConf;