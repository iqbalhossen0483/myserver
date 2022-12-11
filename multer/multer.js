const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const imgName =
        file.originalname.replace(ext, "").replace(" ", "_").toLowerCase() +
        ext;
      cb(null, imgName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === ".jpg" ||
      file.mimetype === ".JPG" ||
      file.mimetype === ".jpeg" ||
      file.mimetype === ".png"
    ) {
      cb("file type is not allowed", false);
      return;
    }
    cb(null, true);
  },
});
