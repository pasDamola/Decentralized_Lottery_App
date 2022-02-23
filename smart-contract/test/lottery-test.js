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

  
  it("Should allow one account to enter based on successful payment ", async function () {
    const [owner] = await hre.ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let e;

    try {
      await lottery.enter({value : ethers.utils.parseEther('0.06')})
    } catch (error) {
      e = error;
    }

    let players = await lottery.getPlayers();

    expect(owner.address).to.equal(players[0])
    expect(players.length).to.equal(1)
  });


  it("Should allow multiple accounts to enter based on successful payment ", async function () {
    const [owner, secondPerson, thirdPerson] = await hre.ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let e;

    try {
      await lottery.enter({value : ethers.utils.parseEther('0.07')})
      await lottery.connect(secondPerson).enter({value : ethers.utils.parseEther('0.06')})
      await lottery.connect(thirdPerson).enter({value : ethers.utils.parseEther('0.06')})
    } catch (error) {
      e = error;
    }

    let players = await lottery.getPlayers();

    expect(players.length).to.equal(3)
  });

  it("only owner can call pickWinner ", async function () {
    const [owner, secondPerson] = await hre.ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let e;

    try {
      await lottery.connect(secondPerson).pickWinner()
    } catch (error) {
      e = error;
    }

    expect(e.message.includes("Only manager can call this function")).to.equal(true)
  });

  it("should pick a winner and reset the players array", async function() {
    const [owner, secondPerson] = await hre.ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    await lottery.enter({value : ethers.utils.parseEther('2')})

    const initialBalance = await hre.ethers.provider.getBalance(owner.address);

    await lottery.pickWinner();

    const finalBalance = await hre.ethers.provider.getBalance(owner.address);

    let difference = finalBalance - initialBalance;

    difference = difference / 1000000000000000000;

    expect(difference).to.greaterThan(1.7)

  })

});
