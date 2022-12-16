const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("food-delivery");
const users = database.collection("users");

//post user
async function postUser(req, res, next) {
  try {
    const isUser = await users.findOne({ email: req.params.email });
    if (!isUser) {
      const result = await users.insertOne(req.body);
      res.send(result);
    } else {
      res.send({ message: "user exist" });
    }
  } catch (err) {
    next(err);
  }
}

//get user by email
async function getUser(req, res, next) {
  try {
    const result = await users.findOne({ email: req.params.email });
    res.send(result);
  } catch (err) {
    next(err);
  }
}

//update cart
async function updateCart(req, res, next) {
  try {
    const filter = { email: req.params.email };
    const docs = { $push: { cart: req.body.id } };
    const result = await users.updateOne(filter, docs);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postUser,
  getUser,
  updateCart,
};
