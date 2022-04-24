require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { 
  ETHEREUM_NETWORK, 
  INFURA_PROJECT_ID, 
  SIGNER_PRIVATE_KEY,
} = process.env;

// tasks
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  defaultNetwork: "rinkeby",
  networks: {
    [ETHEREUM_NETWORK]: {
      url: `https://${ETHEREUM_NETWORK}.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY], 
      gas: 2100000, 
      gasPrice: 8000000000,
    },
    localhost: {
      loggingEnabled: true,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

