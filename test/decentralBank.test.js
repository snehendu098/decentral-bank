const Reward = artifacts.require("Reward");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", (accounts) => {
  // All of test code goes over here
  let tether, reward;

  before(async () => {
    tether = await Tether.new();
    reward = await Reward.new();
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
});
