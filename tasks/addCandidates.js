const hre = require("hardhat"); 
require('dotenv').config();


const { CONTRACT_ADDRESS } = process.env;

const votingId = 0;

const candidatesArray = [
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
  '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
  '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
];


async function main() {
  const contract = await hre.ethers.getContractAt("VotingFactory", CONTRACT_ADDRESS);

  for(const candidate of candidatesArray){
    await contract.addCandidate(candidate, votingId);
    console.log(`Candidate ${candidate} added to voting id: ${votingId}`);
  }

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


