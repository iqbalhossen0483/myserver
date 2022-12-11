const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("EcoStay");
const orders = database.collection("orders");

async function postOrder(req, res, next) {
  try {
    const result = await orders.insertOne(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const result = await orders.find({}).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getOrderByEmail(req, res, next) {
  try {
    const result = await orders.find({ email: req.params.email }).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getFilteredOrder(req, res, next) {
  try {
    const result = await orders.find({ status: req.params.text }).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function updateOrder(req, res, next) {
  try {
    const filter = { _id: ObjectId(req.params.id) };
    const docs = { $set: req.body };
    const result = await orders.updateOne(filter, docs);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postOrder,
  getOrder,
  getOrderByEmail,
  updateOrder,
  getFilteredOrder,
};
