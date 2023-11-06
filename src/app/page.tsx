"use client";
import { Wallet, ethers, utils } from "ethers";
import abi from "../../utils/Lock.json";
import { useState } from "react";
export default function Home() {

  const tokenAddress = "0x4507cEf57C46789eF8d1a19EA45f4216bae2B528"; //tokenfi
  const timeDelay = 6000;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
  );
  const valueBSC = ethers.utils.parseEther("0.001");

  const myAddress = "0x58292a59B512433321141dC9aA240Dc899F7DC99";
  const privateKey =
  "";

  const contractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  
  const contractABI = abi;
  
  const wallet = new Wallet(privateKey, provider);
  const signer = provider.getSigner(wallet.address);
  const pancake = new ethers.Contract(contractAddress, contractABI, wallet);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  
  const handleBuy = async (isStop:boolean) => {
    console.log('isStop',isStop)
    const balance = await provider.getBalance(wallet.address);
    console.log("balance", ethers.utils.formatEther(balance));

    const nonce = await provider.getTransactionCount(wallet.address);
    // const gasPrice = await provider.getGasPrice();
    // console.log("gasPrice",gasPrice)
    

    const unixTimeNow = Math.floor(Date.now() / 1000);
    console.log("unixTimeNow2", unixTimeNow);
    const Txn1 = await pancake.factory();
    console.log(Txn1)
    let currentNonce = nonce;
    while (isStop===false) {
      try {
        const Txn2 =
          await pancake.swapExactETHForTokensSupportingFeeOnTransferTokens(
            0,
            [
              "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
              tokenAddress,
            ],
            myAddress,
            unixTimeNow + 1185,
            {
              from: myAddress, // default from address
              nonce: currentNonce,
              gasPrice: ethers.utils.parseUnits('6', 'gwei'),
              gasLimit: 400000,
              value: valueBSC,
            }
          );
        currentNonce++;
        await delay(timeDelay);
        console.log(Txn2.hash);
      } catch (error) {
        console.log(error);
        await delay(timeDelay);
      }
    }
  };

  return (
    <main className="">
      <button
        onClick={() => {
          
          handleBuy(false);
        }}
      >
        startBuy
      </button>
      <hr />
      <button onClick={() => handleBuy(true)}>stopBuy</button>
    </main>
  );
}
