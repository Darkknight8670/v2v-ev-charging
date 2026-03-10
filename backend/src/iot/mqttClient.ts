import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("MQTT connected");
});

export function sendStartCommand(chargerId:number){

  client.publish("ev/start", JSON.stringify({chargerId}));

}