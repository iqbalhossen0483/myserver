const express = require("express");
const cors = require("cors");
const tourism = require("./router/tourism");
const hospital = require("./router/hospital");
const cycleMart = require("./router/cyclemart");
const prortfolio = require("./router/portfolio");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//sites;
app.use("/tourism", tourism);
app.use("/hospital", hospital);
app.use("/cyclemart", cycleMart);
app.use("/portfolio", prortfolio);

app.get("/", (req, res) => {
  res.send({ message: `server is running in, ${port}` });
});

//error handler;
app.use((err, req, res, next) => {
  console.log("error", err);
  res
    .status(err.statusCode | 500)
    .send({ message: err.message || err.error || "Internal error" });
});

app.listen(port, () => {
  console.log("its running", port);
});