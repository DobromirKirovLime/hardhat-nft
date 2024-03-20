const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory(
    "RideYourWayNFTCollection"
  ); // get the contract
  const nftContract = await nftContractFactory.deploy(); // deploy --> convert to computer language
  await nftContract.waitForDeployment(); // wait for it to deploy
  const address = await nftContract.getAddress();
  console.log("Contract deployed to:", address);

  let txn = await nftContract.createRideYourWayNFT(); // mint the nft
  await txn.wait(); // wait for the mint

  txn = await nftContract.createRideYourWayNFT(); // mint another nft (we set 2 as the max supply, can't mint more)
  await txn.wait(); // wait for the mint
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();
