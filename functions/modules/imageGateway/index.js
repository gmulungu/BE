const {Storage} = require("@google-cloud/storage");

const storage = new Storage();
const getImage = async (req, res) => {
  const fileName = req.query.fileName;
  if (!fileName) {
    res.status(400).send("File name not provided.");
    return;
  }

  const bucketName = "memory-card-game-65a06.appspot.com";
  const filePath = `cards/${fileName}`;

  try {
    const file = storage.bucket(bucketName).file(filePath);
    const exists = await file.exists();
    if (!exists[0]) {
      res.status(404).send("File not found.");
      return;
    }

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });

    res.redirect(url);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};

module.exports = {
  getImage,
};
