import WalletConnect from "../components/WalletConnect";
import ChargerCard from "../components/ChargerCard";
import ChargingControls from "../components/ChargingControls";

export default function Dashboard(){

  return (

    <div style={{padding:40}}>

      <h1>P2P EV Charging Dashboard</h1>

      <WalletConnect/>

      <ChargerCard/>

      <ChargingControls/>

    </div>
  );
}