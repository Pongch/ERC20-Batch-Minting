
//JSON of the token amount and token addresses
//run with command: truffle exec ./script/MintScript.js
const SctMint = artifacts.require('SctMint');
const IcoRecipient = require('../icoRecipient/icoRecipient.js');

module.exports = function(callback) {
  console.log(`total gas cost estimated in total batch is = ${Object.entries(IcoRecipient).length*0.0001062} Eth`)   
}
