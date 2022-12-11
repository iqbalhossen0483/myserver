const express = require("express");
const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../mongoDb");

const client = mongoDb();
const galleryRouter = express.Router();

async function gallery() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const gallery = database.collection("gallery");

    galleryRouter
      .get("/", async (req, res) => {
        const cursor = gallery.find({});
        const result = await cursor.toArray();
        res.send(result);
      })
      .post("/", async (req, res) => {
        const result = await gallery.insertOne(req.body);
        console.log(result);
        res.send(result);
      })
      .delete("/", async (req, res) => {
        const result = await gallery.deleteOne({ _id: ObjectId(req.query.id) });
        res.send(result);
      });
  } catch (err) {
    throw err;
  }
}
gallery();

module.exports = galleryRouter;
