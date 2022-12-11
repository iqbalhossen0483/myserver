const ObjectId = require("mongodb").ObjectId;
const deleteImage = require("../../../cloudinary/delete/deleteImage");
const { mongoDb } = require("../../../mongoDb");

const client = mongoDb();

//connect to database
async function connectDb() {
  await client.connect();
}

connectDb();
const database = client.db("cycle-mart");
const products = database.collection("products");

//get products
async function getProducts(req, res, next) {
  try {
    if (req.query.brand) {
      getBrandProduct(req, res, next);
    } else if (req.query.type) {
      getProductByType(req, res, next);
    } else if (req.query.min && req.query.max) {
      getProductByPrice(req, res, next);
    } else {
      const result = await products.find({}).toArray();
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
}

//post product
async function postProduct(req, res, next) {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.created_at = new Date().toISOString();
    const result = await products.insertOne(req.body);
    res.send(result);
  } catch (error) {
    if (req.body.productImg.imgId) {
      deleteImage(req.body.productImg.imgId);
    }
    if (req.body.imgGallery?.length) {
      req.body.imgGallery.forEach((img) => {
        deleteImage(img.imgId);
      });
    }
    next(error);
  }
}

//update product
async function updateProduct(req, res, next) {
  try {
    const id = req.body.id;
    delete req.body.id;
    delete req.body.productImgId;
    delete req.body.Gallery;
    delete req.body.img;
    delete req.body.gallery;
    if (req.body.price) req.body.price = parseInt(req.body.price);
    if (req.body.stock) req.body.stock = parseInt(req.body.stock);
    req.body.created_at = new Date().toISOString();
    const filter = { _id: ObjectId(id) };
    const updateDoc = { $set: req.body };
    const result = await products.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//products for home page
async function getProductsForHome(req, res, next) {
  try {
    const result = await products.find({}).limit(8).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//search products
async function searchProduct(req, res, next) {
  try {
    const text = req.params.text;
    const result = await products.find({ $text: { $search: text } }).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//category product
async function getCategoryProduct(req, res, next) {
  try {
    const categoryName = req.params.name;
    const quary = { category: categoryName };
    const result = await products.find(quary).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//get rendom product
async function getRandomProduct(req, res, next) {
  try {
    const number = parseInt(req.params.num);
    const result = await products.find({}).skip(number).limit(1).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
}

//get product by brand name
async function getBrandProduct(req, res) {
  try {
    let brandName = [];
    const brand = req.query.brand;
    if (brand.includes("|")) brandName = brand.split("|");
    else brandName = [brand];
    const result = await products.find({ brand: { $in: brandName } }).toArray();
    res.send(result);
  } catch (error) {
    throw error;
  }
}

//get product by type
async function getProductByType(req, res) {
  try {
    let typeName = [];
    const type = req.query.type;
    if (type.includes("|")) typeName = type.split("|");
    else typeName = [type];
    const result = await products.find({ type: { $in: typeName } }).toArray();
    res.send(result);
  } catch (error) {
    throw error;
  }
}

//product by price range
async function getProductByPrice(req, res) {
  try {
    const quary = {
      price: { $gte: parseInt(req.query.min) },
      price: { $lt: parseInt(req.query.max) },
    };
    const result = await products.find(quary).toArray();
    res.send(result);
  } catch (error) {
    throw error;
  }
}

// get product by id
async function getProductById(req, res) {
  const id = req.params.id;
  if (id.startsWith("&&")) {
    const splitId = id.split("&&");
    const sliced = splitId.slice(1, splitId.length);
    const arryOfId = [];
    for (const id of sliced) {
      arryOfId.push(ObjectId(id));
    }
    const quary = {
      _id: {
        $in: arryOfId,
      },
    };
    const result = await products.find(quary).toArray();
    res.send(result);
  } else {
    const quary = { _id: ObjectId(id) };
    const result = await products.findOne(quary);
    res.send(result);
  }
}

//delete product by id
async function deleteProduct(req, res) {
  const id = req.params.id;
  deleteImage(req.body.imgId);
  const filter = { _id: ObjectId(id) };
  const result = await products.deleteOne(filter);
  res.send(result);
}

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  getProductsForHome,
  getBrandProduct,
  getCategoryProduct,
  getProductByType,
  getProductByPrice,
  getProductById,
  deleteProduct,
  getRandomProduct,
  searchProduct,
};
