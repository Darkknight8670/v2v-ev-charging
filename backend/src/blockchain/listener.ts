import { ethers } from "ethers";

export function startListener() {

 const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const ABI = [
    "event ChargingStarted(uint256 sessionId,uint256 chargerId,address user)",
    "event ChargingStopped(uint256 sessionId,uint256 energyUsed,uint256 payment)"
  ];

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  console.log("Listening to blockchain events on:", CONTRACT_ADDRESS);

  contract.on("ChargingStarted", (sessionId, chargerId, user) => {
    console.log("⚡ Charging Started");
    console.log("Session:", sessionId.toString());
    console.log("Charger:", chargerId.toString());
    console.log("User:", user);
  });

  contract.on("ChargingStopped", (sessionId, energyUsed, payment) => {
    console.log("🛑 Charging Stopped");
    console.log("Session:", sessionId.toString());
    console.log("Energy Used:", energyUsed.toString());
    console.log("Payment:", payment.toString());
  });

}