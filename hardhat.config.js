require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking:{
        url:"https://rpc.testnet.fantom.network/",
        accounts: ["4b827ae884ccbff6ca464d1e6898ab0d91a6178b98f564baea0bdcdc5fb0d094"],
        blockNumber: 1555433
      }
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/6ea3a40728864ba3a82cb812e6bb7ace",
      accounts: ["4b827ae884ccbff6ca464d1e6898ab0d91a6178b98f564baea0bdcdc5fb0d094"]
    },
    fantom_testnet: {
      url:"https://rpc.testnet.fantom.network/",
      accounts: ["4b827ae884ccbff6ca464d1e6898ab0d91a6178b98f564baea0bdcdc5fb0d094"]
    }
  },
  solidity: "0.8.4",
};
