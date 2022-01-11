const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, account) {
  // Deploy mock tether
  await deployer.deploy(Tether);
  const tetherToken = await Tether.deployed();

  // Deploy Reward contract
  await deployer.deploy(Reward);
  const rwd = await Reward.deployed();

  // Deploy Decentral Bank
  await deployer.deploy(DecentralBank, rwd.address, tetherToken.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all of the tokens to the Decentral Bank
  await rwd.transfer(decentralBank.address, "1000000000000000000000000");

  // Distribute 100 Tether tokens to investor
  await tetherToken.transfer(account[1], "100000000000000000000");
};
