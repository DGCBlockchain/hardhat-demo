const hre = require("hardhat");

async function main() {
    
    const contractAddress = "0x0E5c219D62106421D046273c68E82FFCCD7c5646";
    const account1 = "0x88E13F8D1B6E3d6897aa68202331FF734E0202e4";
    const account2 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    const contract = await loadContract(contractAddress);

    await currentFtmBalance();
    await currentTokenBalance(contract, account1, account2);
    await transferTokens(contract, account1, account2);
  }

  async function transferTokens(contract, account1, account2) {
    console.log("Transfer Funds");

    await contract.transfer(account2, 20000);

    console.log("Updated Account 1 Token balance: ", (await contract.balanceOf(account1)).toString());
    
    console.log("Updated Account 2 Token balance: ", (await contract.balanceOf(account2)).toString());

  }

  async function currentTokenBalance(contract, account1, account2) {
    console.log("Account 1 Token balance: ", (await contract.balanceOf(account1)).toString());
    
    console.log("Account 2 Token balance: ", (await contract.balanceOf(account2)).toString());
  }

  async function loadContract(contractAddress) {
    Token = await ethers.getContractFactory("Token");

    return await Token.attach(contractAddress);
  }

  async function currentFtmBalance() {
    const [deployer] = await ethers.getSigners();
    console.log("Account balance:", (await deployer.getBalance()).toString(), " FTM");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });