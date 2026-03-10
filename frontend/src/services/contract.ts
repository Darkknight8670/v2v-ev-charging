import { ethers } from "ethers";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const abi = [
  "function registerCharger(uint256 pricePerKwh)",
  "function startCharging(uint256 chargerId) payable",
  "function stopCharging(uint256 sessionId, uint256 energyUsed)"
];

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
}