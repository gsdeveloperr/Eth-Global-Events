"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./Components/Navigation";
import Sort from "./Components/Sort";
import Card from "./Components/Card";
import SeatChart from "./Components/SeatChart";

//Abis
import EthGlobal from "./abis/EthGlobal.json";

//Config
import config from "./constants/config.json";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [ethGlobal, setEthGlobal] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);
    const address = config[network.chainId].EthGlobal.address;

    const ethGlobal = new ethers.Contract(address, EthGlobal, provider);
    setEthGlobal(ethGlobal);

    const totalOccasions = await ethGlobal.totalOccasions();
    const occasions = [];

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await ethGlobal.getOccasion(i);
      occasions.push(occasion);
    }
    setOccasions(occasions);

    console.log(occasions);

    //Refresh Account
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />

        <h2 className="header__title">
          <strong>Entry</strong>Tickets
        </h2>
      </header>

      <Sort />

      <div className="cards">
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            ethGlobal={ethGlobal}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          ethGlobal={ethGlobal}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}
