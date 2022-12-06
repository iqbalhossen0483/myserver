const cloudinary = require("../cloudinary.confiq");

module.exports = uPloadProfile = (req, res, next) => {
  const file = req.file?.path;
  if (!file) next();
  cloudinary.uploader
    .upload(file, {
      folder: "cycle-mart/users",
      use_filename: true,
      transformation: [
        {
          gravity: "face",
          height: 200,
          width: 200,
          crop: "thumb",
          zoom: "0.70",
        },
      ],
    })
    .then((result) => {
      req.body.imgUrl = result.secure_url;
      req.body.imgId = result.public_id;
      delete req.body.profile;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
};
