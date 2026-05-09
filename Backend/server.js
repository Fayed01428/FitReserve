const express = require("express");
const cors = require("cors");

const classRoutes = require("./routes/classes");
const reservationRoutes = require("./routes/reservations");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/classes", classRoutes);
app.use("/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("FitReserve API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});