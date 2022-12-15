const { ObjectId } = require("mongodb");
const { mongoDb } = require("../../../../mongoDb");

const client = mongoDb();

async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("food-delivery");
const products = database.collection("products");

//post product
async function postProduct(req, res, next) {
  try {
    req.body.tags = req.body.tags.split("|").map((item) => item.trim());
    const result = await products.insertOne(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//get product
async function getProduct(req, res, next) {
  try {
    const result = await products.find({}).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

//get product by id
async function getProductById(req, res, next) {
  try {
    const result = await products.findOne({ _id: ObjectId(req.params.id) });
    if (!result) return next({ message: "No product found" });
    res.send(result);
  } catch (err) {
    next(err);
  }
}

//get cart product
async function getCartProduct(req, res, next) {
  try {
    const allId = req.headers.carts.split(" ");
    const carts = [];
    allId.forEach((id) => carts.push(ObjectId(id)));
    const filter = {
      _id: {
        $in: carts,
      },
    };
    const result = await products.find(filter).toArray();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postProduct,
  getProduct,
  getProductById,
  getCartProduct,
};
