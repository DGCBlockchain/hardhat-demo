const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Wallet contract", function() {

    let wallet;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();

        const entryPointAddress = await deployEntryPointContract();
        const Wallet = await ethers.getContractFactory("SimpleWallet");
        wallet = await Wallet.deploy(entryPointAddress, owner.address);
        await wallet.deployed();


    });


    it("Deployment should assign the right owner", async function() {
        
        expect(await wallet.owner()).to.equal(owner.address);
    });

    it("Transfer Funds through wallet", async function() {

        await fundWallet();

        console.log("Send Funds to Party A")
        const receipt = await wallet.transfer(addr1.address, ethers.utils.parseEther("1"));
        await receipt.wait();
        console.log("Transact to addr1...")

        console.log("addr1 EOA Balance " + ethers.utils.formatEther(await addr1.getBalance()));
        console.log("Wallet Balance " + ethers.utils.formatEther(await wallet.getBalance()));

        expect(ethers.utils.formatEther(await addr1.getBalance())).to.equal("10001.0");
        expect(ethers.utils.formatEther(await wallet.getBalance())).to.equal("4.0");
    });

    it("Execute Smart Contract function through wallet", async function() {
        await fundWallet();

        const tokenContract = await deployERC20();

        expect(await tokenContract.balanceOf(owner.address)).to.equal(1000000);

        const populateTransaction = await tokenContract.populateTransaction.transfer(addr1.address, 500);

        let receipt = await tokenContract.transfer(wallet.address, 500);
        await receipt.wait();

        expect(await tokenContract.balanceOf(addr1.address)).to.equal(0);

        receipt = await wallet.exec(tokenContract.address, 0, populateTransaction.data);
        await receipt.wait();

        expect(await tokenContract.balanceOf(addr1.address)).to.equal(500);

    });


    it("Execute Multiple Smart Contract function through wallet", async function() {
        await fundWallet();

        const tokenContract = await deployERC20();

        expect(await tokenContract.balanceOf(owner.address)).to.equal(1000000);

        const populateTransaction1 = await tokenContract.populateTransaction.transfer(addr1.address, 250);
        const populateTransaction2 = await tokenContract.populateTransaction.transfer(addr2.address, 250);

        var dataBytes = [populateTransaction1.data, populateTransaction2.data];
        var contractAddresses = [tokenContract.address, tokenContract.address];

        let receipt = await tokenContract.transfer(wallet.address, 500);
        await receipt.wait();

        expect(await tokenContract.balanceOf(addr1.address)).to.equal(0);

        receipt = await wallet.execBatch(contractAddresses, dataBytes);
        await receipt.wait();

        expect(await tokenContract.balanceOf(addr1.address)).to.equal(250);
        expect(await tokenContract.balanceOf(addr2.address)).to.equal(250);
    })

    async function fundWallet() { 
        let tx = {
            to: wallet.address,
            value: ethers.utils.parseEther("5")
        }    
    
        const receipt = await owner.sendTransaction(tx);
        await receipt.wait();

    }

    async function deployERC20() {
        Token = await ethers.getContractFactory("Token");
        return await Token.deploy();
    }


    async function deployEntryPointContract() {
        return "0x845E862E20Af9293334633879638c3Be4844d8E9";
    }

});