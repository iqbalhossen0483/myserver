const express = require("express");
const appointmentRouter = require("./appointment");
const doctorsRouter = require("./doctors");
const galleryRouter = require("./gallery");
const serviceRouter = require("./services");

const hospital = express.Router();

hospital.use("/services", serviceRouter);

// appintments
hospital.use("/appointment", appointmentRouter);

//doctors
hospital.use("/doctors", doctorsRouter);

//gallery
hospital.use("/gallery", galleryRouter);

module.exports = hospital;
