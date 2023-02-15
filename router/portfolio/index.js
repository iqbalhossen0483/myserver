const express = require("express");
const nodemailer = require("nodemailer");

const prortfolio = express.Router();

//nodemailer;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

prortfolio.post("/", async (req, res, next) => {
  try {
    const mailOptionsForClient = {
      from: "rayhan.senbag.bd@gmail.com",
      to: req.body.email,
      subject: "Message received",
      html: clientBody(req),
    };
    const mailOptionsForMe = {
      from: "rayhan.senbag.bd@gmail.com",
      to: "iqbal.hossen.senbag.bd@gmail.com",
      subject: "From your portfolio",
      html: myBody(req),
    };
    const client = await transporter.sendMail(mailOptionsForClient);
    await transporter.sendMail(mailOptionsForMe);
    if (client.messageId) {
      res.send({ message: "success" });
    } else next({ message: "Failed to received" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//mail body
function clientBody(req) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        }
        #root {
          width: 100%;
          background-color: #00ffff1b;
          padding: 10px 15px;
          border-radius: 5px;
          margin: 0;
        }
        @media (min-width: 768px) {
          #root {
            width: 600px;
            margin: 0 auto;
            margin-top: 5px;
            margin-bottom: 5px;
            background-color: #00ffff1b;
            padding: 10px 15px;
            border-radius: 5px;
          }
        }
      </style>
    </head>
    <body>
      <div id="root">
        <header>
          <h4 style="text-align: center">Thank you for contacting me!</h4>
        </header>
        <main style="margin-top: 15px">
          <p style="margin-bottom: 5px">Dear <b>${req.body.name}</b></p>
          <p>
            I appreciate you reaching out to me. I have found your email and will
            contact you as soon as possible.
          </p>
          <p style="margin-top: 10px">Thank you vary much</p>
          <p>Md Iqbal Hossen</p>
        </main>
      </div>
    </body>
  </html>`;
}

function myBody(req) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        }
        #root {
          width: 100%;
          background-color: #00ffff1b;
          padding: 10px 15px;
          border-radius: 5px;
          margin: 0;
        }
        @media (min-width: 768px) {
          #root {
            width: 600px;
            margin: 0 auto;
            margin-top: 5px;
            margin-bottom: 5px;
            background-color: #00ffff1b;
            padding: 10px 15px;
            border-radius: 5px;
          }
        }
      </style>
    </head>
    <body>
      <div id="root">
        <header>
          <p>
            This is sent from your portfolio site By
            <b>${req.body.name}</b>
          </p>
          <small>Time: ${new Date().toISOString()}</small>
        </header>
        <main style="margin-top: 20px">
          <p>Email: ${req.body.email}</p>
          <p>Number: ${req.body.number}</p>
          <p style="margin-top: 5px">Message: ${req.body.message}</p>
        </main>
      </div>
    </body>
  </html>`;
}
module.exports = prortfolio;
