const Reward = artifacts.require("Reward");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

// array destucturing
contract("DecentralBank", ([owner, customer]) => {
  // All of test code goes over here
  let tether, reward, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // loading the contracts
    tether = await Tether.new();
    reward = await Reward.new();
    decentralBank = await DecentralBank.new(reward.address, tether.address);

    // transfer all tokens to Decentral Bank
    await reward.transfer(decentralBank.address, tokens("1000000"));

    // transfer 100 mock tether investor
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Tether");
    });
  });

  describe("Reward token deployment", async () => {
    it("matches name successfully", async () => {
      const name = await reward.name();
      assert.equal(name, "Reward Token");
    });

    it("matches symbol successfully", async () => {
      let reward = await Reward.new();
      const symbol = await reward.symbol();
      assert.equal(symbol, "RWDT");
    });
  });

  describe("Decentral Bank deployment", async () => {
    it("Matches names", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has tokens", async () => {
      const balance = await reward.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });
});
