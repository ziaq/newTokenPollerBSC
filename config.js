let config_contents;
const fs = require('fs')
const toml = require('toml');

config_contents = toml.parse(fs.readFileSync("./config.toml", 'utf8'));
console.log(config_contents);
const web3provider = config_contents['web3provider'];
module.exports = {web3provider};