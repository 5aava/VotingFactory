const hre = require("hardhat"); 


async function main() {
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contracts with the account:", deployer.address); 

  const VotingFactory = await hre.ethers.getContractFactory("VotingFactory");
  const votingFactory = await VotingFactory.deploy(); 

  await votingFactory.deployed(); 

  console.log("VotingFactory deployed to:", votingFactory.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 
