const hre = require("hardhat"); 
require('dotenv').config();


const { CONTRACT_ADDRESS } = process.env;

const candidate = '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720';
const value = hre.ethers.utils.parseEther('0.01'); // ether
const votingId = 0;

async function main() {
  const contract = await hre.ethers.getContractAt("VotingFactory", CONTRACT_ADDRESS);

  const overrides = {
    value: value,
  };
  const out = await contract.vote(votingId, candidate, overrides);
  console.log(out);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

