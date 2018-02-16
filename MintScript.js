//Script to mint arrays of addresses and token amount for ico
SctMint.deployed().then(inst => {sctmint = inst } )

var sctToken = SctMint.at('sctmint.address');

//JSON of the token amount and token addresses

var IcoRecipient = {
  web3.eth.accounts[1]:12000,
  web3.eth.accounts[2]:700,
  web3.eth.accounts[3]:800,
  web3.eth.accounts[4]:1700,
  web3.eth.accounts[5]:8700,
  web3.eth.accounts[6]:907700,
  web3.eth.accounts[7]:31700
}

for (let [address, amount] of Object.entries(IcoRecipient)) {
sctmint.mint(address, amount, { gas: 21000, from: web3.eth.accounts[0] }).then(function(tx){return tx});
}
