const { bucket } = require("../config/firebase.config");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "File tidak boleh kosong!" });
    }

    if (!bucket) {
      return res.status(500).send({
        message: "Firebase Storage tidak terkonfigurasi. Silahkan cek .env",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(`images/user/${fileName}`);
    const token = uuidv4();

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    const bucketName = bucket.name;
    const fullUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
      `images/user/${fileName}`,
    )}?alt=media&token=${token}`;

    return res.status(200).send({
      status: "success",
      url: fullUrl,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Server mengalami gangguan!", error: error.message });
    return;
  }
};
