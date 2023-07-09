import { ethers } from "hardhat";
// import {
//   time
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { Network, Alchemy } from "alchemy-sdk";

// Optional config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: "BBj3p2GQDxlHAFFBn5kIh-jZWo3dmbB_", // Replace with your Alchemy API Key.
//   network: Network.ETH_GOERLI, // Replace with your network.
// };

// console.log(ethers)

// const provider = new ethers.provider('https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID');
import fs from 'fs';
function saveValuesToFile(a: number, b: number, filePath: string): void {
  const data = `starttime: ${a}\nunlocktime: ${b}`;

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Values saved to file successfully.');
    }
  });
}
const filePath = 'values.txt';

 async function main() {
  
//   const alchemy = new Alchemy(settings);

//   const block = await alchemy.core.getBlockNumber();
//  console.log(block)

// const startTime = await alchemy.core.getBlock(block)
// console.log(startTime.timestamp);
// const _provider = ethers.getDefaultProvider("goerli");
// const _provider = await ethers.set("goerli")
// console.log(_provider)
  // Lấy thời gian Unix hiện tại từ block cuối cùng trên mạng Goreli
  // const blockNumber = await _provider.getBlockNumber();
  // const blockNumber = await ethers.provider.getBlockNumber();
  // console.log(blockNumber)

  // console.log('Thời gian Unix hiện tại trên mạng Goreli:', timestamp);

  const { provider } = ethers;
  const blockNumber = await provider.getBlockNumber();

  // Get the current block timestamp
  const block = await provider.getBlock(blockNumber);
  const startTime = block.timestamp+ 100;
//1687437772
  console.log('Current Unix time on Goerli:', startTime);





  const [deployer] = await ethers.getSigners();
  console.log('deploy from address: ', deployer.address);
  const owner = '0xcb976099df1484C87B96685879571749CC007197'
  // const startTime = (await time.latest()) + 6;
  // const unlockTime = (await time.latest()) + 10 * 24 * 60 * 60;
  const unlockTime = startTime +  10 * 60;
   console.log(unlockTime);
   saveValuesToFile(startTime, unlockTime, filePath);

   const lock = await ethers.deployContract("Lock", [1*1000000, owner, '0xefD7EA43F2A7E30570E1200352754Ac06C526a80', startTime, unlockTime]);
  
    await lock.waitForDeployment();
  
    console.log(
      `Lock deployed to ${lock.target}`
    );



  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = ethers.parseEther("0.001");

  // const lock = await ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//npx hardhat run scripts/deploy.ts --network goerli
//npx hardhat run scripts/deploy.ts --network bsctest

//npx hardhat verify --network goerli 0xb93993ccaa313058e3c3586f505be352f3ecc538 1 0xcb976099df1484C87B96685879571749CC007197 0x0F0C0511A83F5E3aA00CcaF4ea3023a2FF354598 1687437772 1688301772