const { mongoDb } = require("../../../mongoDb");
const jwt = require("jsonwebtoken");
const deleteImage = require("../../../cloudinary/delete/deleteImage");

const client = mongoDb();

//make a user to database
async function makeUserToDb(req, res) {
  try {
    await client.connect();
    const database = client.db("cycle-mart");
    const users = database.collection("users");
    const filter = { email: req.body.email };
    const user = { $set: req.body };
    const options = { upsert: true };
    await users.updateOne(filter, user, options);
    const token = jwt.sign(
      { admin: false, user: req.body },
      process.env.JWT_SECRATE,
      { expiresIn: "7d" }
    );
    res.send({ admin: false, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

//log in user and get token for browsing
async function logInUser(req, res) {
  try {
    await client.connect();
    const database = client.db("cycle-mart");
    const users = database.collection("users");
    const filter = { email: req.params.email };
    const user = await users.findOne(filter);
    if (!user) throw { message: "No user found" };
    if (user?.role === "admin") {
      const token = jwt.sign({ admin: true, user }, process.env.JWT_SECRATE, {
        expiresIn: "10h",
      });
      res.send({ admin: true, token: token, user: user });
    } else if (user.email) {
      const token = jwt.sign({ admin: false, user }, process.env.JWT_SECRATE, {
        expiresIn: "7d",
      });
      res.send({ admin: false, token: token, user: user });
    } else throw { message: "user is not allowed to do anythings" };
  } catch (error) {
    res.status(error.status || 403).send({ message: error.message });
  }
}

//get user his/her specefic data
async function getUserData(req, res) {
  const email = req.params.email;
  const user = req.user;
  if (user.email === email) {
    res.send(user);
  } else {
    res.status(404).send({ message: "No user found" });
  }
}

//user profile update
async function updateUserProfile(req, res) {
  try {
    await client.connect();
    const database = client.db("cycle-mart");
    const users = database.collection("users");
    const exist = req.body.existingImg;
    delete req.body.existingImg;
    const query = { email: req.body.email };
    const docs = {
      $set: req.body,
    };
    users.updateOne(query, docs).then((data) => {
      if (data.modifiedCount > 0) {
        // //delete if img exist in cloudinary
        if (exist) {
          deleteImage(exist);
        }
        res.send(data);
      } else {
        if (req.body.imgId) deleteImage(req.body.imgId);
        res.status(500).send({ message: "unable to update" });
      }
    });
  } catch (err) {
    if (req.body.imgId) deleteImage(req.body.imgId);
    res.status(500).send({ message: err });
  }
}

//user's product collection update
async function userCartUpdate(req, res) {
  try {
    await client.connect();
    const database = client.db("cycle-mart");
    const users = database.collection("users");
    const email = req.params.email;
    const cart = req.body;
    const filter = { email: email };
    const doc = {
      $set: {
        cart: cart,
      },
    };
    const option = { upsert: true };
    const result = await users.updateOne(filter, doc, option);
    res.json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

//make admin
async function makeAdmin(req, res) {
  try {
    await client.connect();
    const database = client.db("cycle-mart");
    const users = database.collection("users");
    const filter = { email: req.body.email };
    const update = {
      $set: {
        role: "admin",
      },
    };
    const result = await users.updateOne(filter, update);
    res.json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  makeUserToDb,
  logInUser,
  getUserData,
  updateUserProfile,
  userCartUpdate,
  makeAdmin,
};
