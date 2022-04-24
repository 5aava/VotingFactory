const hre = require("hardhat"); 
require('dotenv').config();


const { CONTRACT_ADDRESS } = process.env;

const votingId = 0;

async function main() {
  const contract = await hre.ethers.getContractAt("VotingFactory", CONTRACT_ADDRESS);

  const out = await contract.finishVoting(votingId);
  console.log(out);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

