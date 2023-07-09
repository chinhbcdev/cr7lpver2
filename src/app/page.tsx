"use client";
import Image from "next/image";
import Head from "next/head";
import { useRef, useState } from "react";
import { ethers } from "ethers";
import abi from "../../utils/Lock.json";
export default function Home() {
  const contractAddress = "0x6e2f913d3ba20f0cba4f3b111a2c2d60ecfc79d6";
  const contractABI = abi.abi;
  const handleBuy = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("signer", signer);
      const buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("currentAccount" + currentAccount);
      const value = ethers.utils.parseEther("0.01");
      const coffeeTxn = await buyMeACoffee.buyTokens(currentAccount, {
        value: value,
      });
      await coffeeTxn.wait();
      console.log("hash", coffeeTxn);
    }
  };
  const [currentAccount, setCurrentAccount] = useState("");
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("please install MetaMask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const divRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    console.log("Clicked");
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="bg-black font-firasans">
      <div className=" text-yellow-400 mx-5 xl:mx-16">
        <div className="block lg:flex md:flex-1 sm:flex-1 md:mx-auto sm:mx-auto justify-between h-10 mb-40 ">
          <div className="h-20 w-auto">
            <Image
              className="block md:mx-auto sm:mx-auto h-10 object-cover"
              src="/cr7logo.jpg"
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
          <div className="max-sm:bg-white md:bg-yellow-400 lg:bg-red-500">
            <button className="xl:mr-5 " onClick={handleClick}>
              CR7DAO Airdrop & Sales
            </button>
            <button className="text-black  bg-yellow-400 px-5">
              Smart Contact
            </button>
            {!currentAccount && (
              <button className="px-5" onClick={connectWallet}>
                Connect
              </button>
            )}
            {currentAccount && (
              <button className="px-5" onClick={connectWallet}>
                {"0x..." + currentAccount.slice(-4)}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between">
          <div className="text-center">
            <p className="">CR7-Binance</p>
            <h3 className="">THE CR7 NFT COLLECTION</h3>
            <p className="">
              Your story begins here, on Binance.Take the first step and score
              an exclusive CR7 NFT Pack with other rewards.
            </p>
          </div>
          <div className="">
            <iframe src="https://www.youtube.com/embed/rAozsyoe9DI?controls=0&amp;start=2s&amp;end=50s&amp;loop=1&amp;playlist=rAozsyoe9DI&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"></iframe>
          </div>
        </div>

        <h1 className="text-center mb-20 mt-20">CR7DAO Token Sale.</h1>
        <div className="grid grid-cols-2 text-center">
          <div>
            <div className="pricing-item-features mb-5">
              <h2>Join Pre Sale </h2>
              <p></p>
              <h2 id="demo" className="timer"></h2>
              <p></p>
              <p>Listing Price 1 $CR7 = 1 USD</p>
              <p>(MAX 10 BNB)</p>
              <ul className="rq st c us">
                <li className="ix">0.01 $BNB = 1,000 $CR7</li>
                <li className="ix">0.1 $BNB = 10,000 $CR7</li>
                <li className="ix">1 $BNB = 100,000 $CR7</li>
                <li className="ix">10 $BNB = 1,000,000 $CR7</li>
              </ul>
            </div>

            <div ref={divRef} className="pricing-item-cta oh">
              <input
                className="w-full text-black my-[10px] p-[5px] text-center"
                id="buyinput"
                placeholder="0.01"
                value="0.01"
              ></input>
              <button
                className="w-full text-black text-center bg-yellow-400 my-[10px] p-[5px]"
                onClick={handleBuy}
              >
                BUY
              </button>
            </div>
          </div>

          <div className="">
            <div className="">
              <div className="pricing-item-features">
                <h2>Claim Airdrop</h2>
                <p>Don&apos;t Miss Out!</p>

                <ul className="">
                  <li className="">Referral count is unlimited</li>
                  <li className="">
                    Get 100% $CR7 &amp; 30% $BNB per referral
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div id="airdroprow">
                <div id="airdropcell"></div>
                <h2 className="">Create Your Referral Link</h2>
              </div>
              <div className="">
                <a className="" href="#">
                  Start
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
