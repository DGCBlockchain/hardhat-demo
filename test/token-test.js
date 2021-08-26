const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function() {
      Token = await ethers.getContractFactory("Token");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

      hardhatToken = await Token.deploy();
    });


    it("Deployment should assign the total supply of tokens to the owner", async function() {

      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    });


    it("Should transfer tokens between accounts", async function() {
      await hardhatToken.transfer(addr1.address, 50);

      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);

      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);

    });


    it("Interact with predeployed Token Contract", async function() {
      const contractAddress = "0x0E5c219D62106421D046273c68E82FFCCD7c5646";

      const contract = await Token.attach(contractAddress);
      
      await contract.transfer(addr1.address, 20);

      expect(await contract.balanceOf(addr1.address)).to.equal(20);

    });
});

