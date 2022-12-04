const express = require("express");
const { mongoDb } = require("../../mongoDb");

const client = mongoDb();
const galleryRouter = express.Router();

async function gallery() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const gallery = database.collection("gallery");
    //post
    galleryRouter.post("/", async (req, res) => {
      const img = req.body;
      const result = await gallery.insertOne(img);
      res.json(result);
    });
    //get
    galleryRouter.get("/", async (req, res) => {
      const cursor = gallery.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
gallery();

module.exports = galleryRouter;
