const hre = require("hardhat");
async function main(){
   // we need to get the contract to deploy
   const Greeter = await hre.ethers.getContractFactory("Greeter");
   // code to deploy our contract
   const greeter = await Greeter.deploy("hello, Hardhat!");

   await greeter.deployed();
   
   console.log("Greeter deployed to: ", greeter.address);
}

// We recommend this pattern to be able to use async/await everywher handle errors.
main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});
