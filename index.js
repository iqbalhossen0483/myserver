const express = require("express");
const cors = require("cors");
const tourism = require("./router/tourism");
const hospital = require("./router/hospital");
const cycleMart = require("./router/cyclemart");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//sites;
app.use("/tourism", tourism);
app.use("/hospital", hospital);
app.use("/cyclemart", cycleMart);

app.get("/", (req, res) => {
  res.send({ message: `server is running in, ${port}` });
});

app.listen(port, () => {
  console.log("its running", port);
});
