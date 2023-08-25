const multer = require("multer");
const path = require("path");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/images"));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp
    const timestamp = Date.now();
    const originalExtension = path.extname(file.originalname);
    const filename = `${timestamp}${originalExtension}`;
    cb(null, filename);
  },
});
module.exports.upload = multer({ storage });
