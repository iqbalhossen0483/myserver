const express = require("express");
const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../mongoDb");

const doctorsRouter = express.Router();
const client = mongoDb();

async function doctors() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const doctors = database.collection("doctors");
    doctorsRouter
      .get("/", async (req, res) => {
        const cursor = doctors.find({});
        const result = await cursor.toArray();
        res.send(result);
      })
      .post("/", async (req, res) => {
        const doctor = req.body;
        const result = await doctors.insertOne(doctor);
        res.send(result);
      })
      .delete("/", async (req, res) => {
        const result = await doctors.deleteOne({ _id: ObjectId(req.query.id) });
        res.send(result);
      })
      .get("/:id", async (req, res, next) => {
        try {
          const result = await doctors.findOne({
            _id: ObjectId(req.params.id),
          });
          if (result) res.send(result);
          else next({ message: "No data found" });
        } catch (error) {
          next({ message: error.message });
        }
      })
      .put("/", async (req, res, next) => {
        try {
          const _id = ObjectId(req.body.id);
          delete req.body.id;
          const result = await doctors.updateOne({ _id }, { $set: req.body });
          res.send(result);
        } catch (error) {
          next({ message: error.message });
        }
      });
  } catch (error) {
    throw error;
  }
}
doctors();
module.exports = doctorsRouter;
