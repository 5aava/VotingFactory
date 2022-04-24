# README

## Test Solidity Smart Contract - Voting Factory 

- Ethereum Smart Contract
  - Solidity 0.8.3
  - hardhat
  - Infura
  - tasks
  - tests

- Metamask
  - connect
  - disconnect
  - sign message
  - authentication

## Metamask Connect and Auth Demo

```sh
yarn install
yarn start

# show http://localhost:3000
```

## Compile and deploy contract

```sh
# start local node
npx hardhat node

# compile
npx hardhat compile

# tests
npx hardhat test --network localhost

# deploy to localhost || rinkeby
npx hardhat run ./tasks/deploy.js --network localhost

# then add contract address to .env 

# show accounts
npx hardhat run ./tasks/getAccounts.js --network localhost

# tasks
npx hardhat run ./tasks/createVoting.js --network localhost

npx hardhat run ./tasks/addCandidates.js --network localhost

npx hardhat run ./tasks/vote.js --network localhost

npx hardhat run ./tasks/finishVoting.js --network localhost
```

