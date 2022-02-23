const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery Contract", function () {
  it("Should get a zero players array ", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    expect(await lottery.getPlayers()).to.deep.equal([]);
  });

  it("Should fail at entering the lottery because of payment ", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let e;

    try {
      await lottery.enter({value : ethers.utils.parseEther('0.0499')})
    } catch (error) {
      e = error;
    }

    expect(e.message.includes("Please send more money")).to.equal(true)
  });

});
