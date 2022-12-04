const express = require("express");
const { mongoDb } = require("../../mongoDb");

const doctorsRouter = express.Router();
const client = mongoDb();

async function doctors() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const doctors = database.collection("doctors");

    //post
    doctorsRouter.post("/", async (req, res) => {
      const doctor = req.body;
      const result = await doctors.insertOne(doctor);
      res.json(result);
    });
    //get
    doctorsRouter.get("/", async (req, res) => {
      const cursor = doctors.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
doctors();
module.exports = doctorsRouter;
