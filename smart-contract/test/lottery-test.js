const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery Contract", function () {
  it("Should return an empty array ", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    expect(await lottery.getPlayers()).to.deep.equal([]);

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
