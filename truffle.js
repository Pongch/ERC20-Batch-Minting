require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/
});
require('babel-polyfill');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id (currently useing Ganache-cli)
    },
    testing: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "4" // Match Rinkeby network
    },
    live: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
