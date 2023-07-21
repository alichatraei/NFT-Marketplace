const hre = require("hardhat");
const main = async () => {
  const NFTMarketPlace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketPlace = await NFTMarketPlace.deploy();

  await nftMarketPlace.deployed();
  console.log("NFTMarketplace deployed to : ", nftMarketPlace.address);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
