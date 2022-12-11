const { mongoDb } = require("../../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}
connectDb();
const database = client.db("food-delivery");
const categories = database.collection("categories");

async function postCategory(req, res, next) {
  try {
    const result = await categories.insertOne(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const result = await categories.find({}).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postCategory,
  getCategory,
};
