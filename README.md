# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Getting started

```
npm install --save-dev hardhat
```

## To create a project

```
npx hardhat
```

***
**Note**

This comand won't work with git bash
***

## Demo
Check out the full Docs of Hardhat [here](https://hardhat.org/getting-started/)

This project has two Smart Contracts:
* Greeter.sol
* Token.sol

In the `hardhat.config` we can define the networks and the solidity version

For now we have following networks:
* local hardhat network
* fantom testnet
* ropsten network

To run the tests use following command:

```
npx hardhat test
```

In the file token-test.js the first two tests are standard waffle tests using the deployment and transfer function.

In our hardhat.config we configured to fork the fantom testnet blockchain at a specified block number.

This means we can use predeployed Smart Contracts on the fantom testnet chain and run our tests against it without changing the actual state of the smart contracts.

This makes the tests stateless and flexible

As example for using predeployed test can be found in the last test of token-test.js

The Token contract is deployed on the fantom testnet blockchain and in this test we transfer 20 tokens from owner to addr1. 
In the background the fantom testnet chain is forked and the test is run against the smart contract with all current states included. Now the transfer method is tested and the state of the smart contract will only change on the forked fantom testnet version.

## Scripts
We have three scripts:
* greeter-deploy.js
* token-deploy.js
* token-transfer.js

The scripts can be run with following command:
```
npx hardhat run scripts/token-transfer.js --network fantom_testnet
```

The `--network` defines the network which is used for the script

Scripts are used to change the state of the smart contract on-chain.
## Compile
We can the compile the smart contracts with following command:

```
npx hardhat compile
```
The ABI's of the Smart contracts can be found in the folder `artifacts/contracts`