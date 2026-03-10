import { Card, CardContent, Typography } from "@mui/material";

export default function ChargerCard() {

  return (

    <Card sx={{ width: 300, marginTop: 3 }}>

      <CardContent>

        <Typography variant="h5">
          Charger #1
        </Typography>

        <Typography color="text.secondary">
          Status: Available
        </Typography>

        <Typography>
          Price: 1 ETH / kWh
        </Typography>

      </CardContent>

    </Card>

  );
}