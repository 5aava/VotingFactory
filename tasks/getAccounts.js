const hre = require("hardhat"); 


async function main() {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address + ': ' + await account.getBalance());
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 
