const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("food-delivery");
const orderProcess = database.collection("order-process");

async function getOrderProcess(req, res, next) {
  try {
    const result = await orderProcess.find({}).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getOrderProcess,
};
