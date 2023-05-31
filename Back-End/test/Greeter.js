const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MockProvider } = require("ethereum-waffle");
const provider = new MockProvider();

describe("Greeter", function() {

  // *************** Testing the greetings functions in our contract ***************
  it("Should return the new greeting once it's changed", async function () {
    // getting the contract 
    const Greeter = await ethers.getContractFactory("Greeter");

    // ------ Testing if the contract even deploys properly ------
    // deploying the contract with the greeting message "Hello, Blockchain class 1!"
    const greeter = await Greeter.deploy("Hello, Blockchain class 1!");
    await greeter.deployed();
    // calling the greet function and expecting it to return the greet message "Hello, Blockchain class 1!"
    expect(await greeter.greet()).to.equal("Hello, Blockchain class 1!");

    // ------ testing the setGreeting function by setting a new message ------
    const setGreetingTx = await greeter.setGreeting("Hello, SHA class 1!");
    // waiting until the transaction is passed
    await setGreetingTx.wait();
    
    // calling the greet function again and expecting it to return the new greet message "Hello, SHA class 1!"
    expect(await greeter.greet()).to.equal("Hello, SHA class 1!");
   });

  // *************** Testing the deposit function in our contract ***************
  it("Should return the new balance after deposit", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Blockchain class 1!");
    await greeter.deployed();

    // calling the deposit function of our smart contract and depositing 10 ETH
    await greeter.deposit({value: 10});
    // testing the getBalance function and expecting it to return the new balance with 10 Eth in it
    expect(await provider.getBalance(greeter.address)).to.equal(10);
  });

});