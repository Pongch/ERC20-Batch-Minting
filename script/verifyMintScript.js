
//JSON of the token amount and token addresses
const SctMint = artifacts.require('SctMint');
const IcoRecipient = require('../icoRecipient/icoRecipient.js');

module.exports = function(callback) {
  for (let [address, amount] of Object.entries(IcoRecipient)) {
    SctMint.deployed().then(sctmint => sctmint.balanceOf(address)).then(balance => console.log(`Balance of ${address} should be ${amount}, is ${balance.toString()}`));
  }
}
