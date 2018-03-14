
// Object consist of the Token holders and amount of Ether
var dividendRecipient = require('../dividendRecipient/dividendRecipient.js');

//Ensure that your coinbase account (web3.eth.accounts[0]) in
//geth has enough Ether to transfer to all accounts.

//Ensure to store all the logs into one file (script output.tx). As
//the log will output Transaction receipt that is verifiable on Ether Explorer.

module.exports = function(callback) {
  for (let [address, amount] of Object.entries(dividendRecipient)) {
    web3.eth.sendTransaction({"to": address,"from": web3.eth.accounts[0],"value":web3.toWei(amount,'ether'), gasLimit: 21000}, (err, txhash) => console.log(`transferred ${amount} Ether to ${address}, at ${txhash}`))
  }
}
