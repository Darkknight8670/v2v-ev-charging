import express from "express";
import cors from "cors";
import { startListener } from "./blockchain/listener";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EV Charging Backend Running");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  startListener();
});