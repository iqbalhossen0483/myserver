const express = require("express");
const { mongoDb } = require("../../mongoDb");
const { ObjectId } = require("mongodb");

const client = mongoDb();

const prortfolio = express.Router();

const run = async () => {
  try {
    await client.connect();
    const database = client.db("porfolio");
    const users = database.collection("contacts");

    prortfolio.post("/users", async (req, res) => {
      const user = req.body;
      const result = await users.insertOne(user);
      res.send(result);
    });
    prortfolio.get("/users", async (req, res) => {
      const result = await users.find({}).toArray();
      res.send(result);
    });
    prortfolio.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
    });
    prortfolio.put("/users", async (req, res) => {
      const data = req.body;
      const query = { _id: ObjectId(data.id) };
      const update = {
        $set: {
          status: data.status,
        },
      };
      const result = await users.updateOne(query, update);
      res.send(result);
    });
  } finally {
  }
};
run();

module.exports = prortfolio;
