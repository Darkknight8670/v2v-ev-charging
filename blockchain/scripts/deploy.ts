import { network } from "hardhat";

async function main() {

  const { ethers } = await network.connect();

  const EVCharging = await ethers.getContractFactory("EVCharging");

  const evCharging = await EVCharging.deploy();

  await evCharging.waitForDeployment();

  console.log("EVCharging deployed to:", await evCharging.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});