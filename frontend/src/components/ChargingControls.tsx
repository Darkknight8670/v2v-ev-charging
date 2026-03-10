import { Button } from "@mui/material";
import { getContract } from "../services/contract";

export default function ChargingControls() {

  async function registerCharger() {

    const contract = await getContract();

    const tx = await contract.registerCharger(1);

    await tx.wait();

    alert("Charger registered");
  }

  async function startCharging() {

    const contract = await getContract();

    const tx = await contract.startCharging(1,{
      value: BigInt(100000000000000000)
    });

    await tx.wait();

    alert("Charging started");
  }

  async function stopCharging() {

    const contract = await getContract();

    const tx = await contract.stopCharging(1,5);

    await tx.wait();

    alert("Charging stopped");
  }

  return (

    <div style={{marginTop:20}}>

      <Button variant="contained" onClick={registerCharger}>
        Register Charger
      </Button>

      <br/><br/>

      <Button variant="contained" color="success" onClick={startCharging}>
        Start Charging
      </Button>

      <br/><br/>

      <Button variant="contained" color="error" onClick={stopCharging}>
        Stop Charging
      </Button>

    </div>
  );
}