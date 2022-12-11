const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("food-delivery");
const orders = database.collection("orders");

async function postOrder(req, res, next) {
  try {
    const result = await orders.insertOne(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

//get order
async function getOrder(req, res, next) {
  try {
    if (req.headers.email === req.varifyEmail) {
      const result = await orders.find({}).toArray();
      res.send(result);
    } else next({ message: "Authentication failed" });
  } catch (err) {
    next(err);
  }
}

async function getOrderByEmail(req, res, next) {
  try {
    if (req.params.email === req.varifyEmail) {
      const result = await orders.find({ email: req.params.email }).toArray();
      res.send(result);
    } else next({ message: "Authentication failed" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postOrder,
  getOrder,
  getOrderByEmail,
};
