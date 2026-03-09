import { network } from "hardhat";

async function main() {

  const { ethers } = await network.connect();

  const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";

  const EVCharging = await ethers.getContractFactory("EVCharging");
  const contract = EVCharging.attach(contractAddress);

  const signer = (await ethers.getSigners())[0];

  console.log("Using account:", await signer.getAddress());

  // Register charger
  console.log("Registering charger...");
  const tx1 = await contract.registerCharger(1);
  await tx1.wait();
  console.log("Charger registered");

  // Start charging
  console.log("Starting charging session...");
  const tx2 = await contract.startCharging(1, {
    value: ethers.parseEther("0.1")
  });
  await tx2.wait();
  console.log("Charging started");

  // Stop charging
  console.log("Stopping charging session...");
  const tx3 = await contract.stopCharging(1, 5);
  await tx3.wait();

  console.log("Charging stopped");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});