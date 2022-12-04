const express = require("express");
const cors = require("cors");
const serviceRouter = require("./router/services");
const gallaryRouter = require("./router/gallery");
const orderRouter = require("./router/order");
const blogRouter = require("./router/blog");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//services
app.use("/services", serviceRouter);

//gallery
app.use("/gallery", gallaryRouter);

//order
app.use("/orders", orderRouter);

//blog
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send({ message: `server is running in, ${port}` });
});
app.get("/test", (req, res) => {
  res.send({ message: "okay" });
});
app.listen(port, () => {
  console.log("its running", port);
});
