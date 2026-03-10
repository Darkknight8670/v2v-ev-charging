import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@mui/material";

export default function WalletConnect() {

  const [address, setAddress] = useState("");

  async function connectWallet() {

    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);

    setAddress(accounts[0]);
  }

  return (
    <div>

      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>

      <p>Wallet: {address}</p>

    </div>
  );
}