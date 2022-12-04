const express = require("express");
const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../mongoDb");

const appointmentRouter = express.Router();
const client = mongoDb();

async function appointment() {
  try {
    await client.connect();
    const database = client.db("IslamiaHospital");
    const appointment = database.collection("appointments");

    appointmentRouter.post("/", async (req, res) => {
      const body = req.body;
      const result = await appointment.insertOne(body);
      res.send(result);
    });
    appointmentRouter.get("/:email", async (req, res) => {
      const email = req.params.email;
      const quary = { email: email };
      const result = await appointment.find(quary).toArray();
      res.send(result);
    });
    appointmentRouter.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const result = await appointment.deleteOne(quary);
      res.send(result);
    });
  } finally {
  }
}
appointment();

module.exports = appointmentRouter;
