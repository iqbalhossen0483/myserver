const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("EcoStay");
const users = database.collection("users");

async function isExistUser(req, res, next) {
  try {
    const exist = await users.findOne({ email: req.body.email });
    if (exist) {
      res.send(exist);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function postUser(req, res, next) {
  try {
    await users.insertOne(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

async function sendUser(req, res, next) {
  try {
    const result = await users.findOne({ email: req.body.email });
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const result = await users.find({}).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getUserByEmail(req, res, next) {
  try {
    const result = await users.findOne({ email: req.params.email });
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const filter = { email: req.params.email };
    const doc = { $set: req.body };
    const result = await users.updateOne(filter, doc);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postUser,
  isExistUser,
  sendUser,
  getUserByEmail,
  getUser,
  updateUser,
};
