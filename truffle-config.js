require("babel-register");
require("babel-polyfill");

module.exports = {
  // networks
  networks: {
    developement: {
      host: "127.0.0.1",
      port: "7575",
      network_id: "*", // connect to any network
    },
  },
  // contracts solidity
  contracts_directory: "./src/contracts",
  // js interactions
  contracts_build_directory: "./src/truffle_abis",
  // solidity complier information
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
