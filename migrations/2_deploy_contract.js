var SctMint = artifacts.require('./SctMint.sol');

module.exports = function(deployer) {
  deployer.deploy(SctMint);
};
