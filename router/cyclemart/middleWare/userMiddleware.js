const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { message: "Athentication failure", status: 401 };
    const token = authorization.split(" ")[1].replace('"', "");
    const decoded = jwt.verify(token, process.env.JWT_SECRATE);
    const { user, admin } = decoded;
    req.user = user;
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    next({ message: "Athentication failure", status: 401 });
  }
};

module.exports = checkUser;
