const express = require("express");
const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../mongoDb");

const serviceRouter = express();
const client = mongoDb();

async function services() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const services = database.collection("service");
    //post
    serviceRouter.post("/", async (req, res) => {
      const service = req.body;
      const result = await services.insertOne(service);
      res.json(result);
    });
    //get
    serviceRouter.get("/", async (req, res) => {
      const cursor = services.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    //get one
    serviceRouter.get("/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const result = await services.findOne(quary);
      res.send(result);
    });
    //delete
    serviceRouter.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const result = await services.deleteOne(quary);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
services();
module.exports = serviceRouter;
