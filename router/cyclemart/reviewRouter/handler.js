const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../../mongoDb");

const client = mongoDb();

//connect to database
async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("cycle-mart");
const reviews = database.collection("reviews");

//post review
async function postReview(req, res) {
  const result = await reviews.insertOne(req.body);
  res.json(result);
}

//get review
async function getReview(req, res) {
  const option = {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  };
  if (req.query.user_id) {
    const result = await reviews
      .aggregate([
        option,
        { $match: { "user._id": ObjectId(req.query.user_id) } },
        { $project: { "user.cart": 0, user_id: 0 } },
      ])
      .toArray();
    res.send(result);
  } else {
    const result = await reviews
      .aggregate([option, { $project: { "user.cart": 0, user_id: 0 } }])
      .toArray();
    res.send(result);
  }
}

//get review by user
async function getReviewByuser(req, res) {
  const email = req.params.email;
  const quary = { email: email };
  const result = await reviews.find(quary).toArray();
  res.send(result);
}

module.exports = {
  postReview,
  getReview,
  getReviewByuser,
};
