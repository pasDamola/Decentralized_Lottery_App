async function main() {
    const lotteryContractFactory = await hre.ethers.getContractFactory("Lottery");
    const lotteryContract = await lotteryContractFactory.deploy();
    await lotteryContract.deployed();
  
    console.log("Contract deployed to:", lotteryContract.address);
  
    const players = await lotteryContract.getPlayers();
    console.log("We got the players!", players);
}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  