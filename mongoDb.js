const { MongoClient } = require("mongodb");
require("dotenv").config();

exports.mongoDb = () => {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};
