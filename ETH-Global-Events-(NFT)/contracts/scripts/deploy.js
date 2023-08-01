const hre = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "ETHGlobal";
  const SYMBOL = "EG";

  // Deploy contract

  const ethGlobal = await ethers.deployContract("ETHGlobal", [
    "NAME",
    "SYMBOL",
  ]);
  let contractAddr = await ethGlobal.waitForDeployment();

  console.log(await contractAddr.getAddress());

  // List 5 events
  const occasions = [
    {
      name: "ETHMunich",
      cost: tokens(3),
      tickets: 0,
      date: "AUG 26",
      time: "9:00PM EST",
      location: "Munich, Germany",
    },
    {
      name: "ETHToronto",
      cost: tokens(1),
      tickets: 125,
      date: "Jan 17 ",
      time: "8:00PM JST",
      location: "Toronto, Canada",
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "11:00AM TRT",
      location: "Turkey, Istanbul",
    },
    {
      name: "ETHcon Korea",
      cost: tokens(5),
      tickets: 0,
      date: "Sep 11",
      time: "3:30PM CST",
      location: " Seoul, Korea",
    },
    {
      name: "Ethereum Singapore",
      cost: tokens(1.5),
      tickets: 125,
      date: "Dec 23",
      time: "4:44AM EST",
      location: "Toronto, Canada",
    },
  ];

  for (let i = 0; i < 5; i++) {
    const transaction = await contractAddr
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location
      );

    await transaction.wait();

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
