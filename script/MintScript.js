
//JSON of the token amount and token addresses
//run with command: truffle exec ./script/MintScript.js
const SctMint = artifacts.require('SctMint');
const IcoRecipient = require('../icoRecipient/icoRecipient.js');

module.exports = function(callback) {
  for (let [address, amount] of Object.entries(IcoRecipient)) {
    SctMint.deployed().then(sctmint => sctmint.mint(address, amount, { gas: 60000, gasPrice: 200000000000, from: web3.eth.accounts[0]})).then(console.log(`sucess minting ${amount} Token to ${address}`));
  }
}
