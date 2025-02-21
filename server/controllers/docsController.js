// // const Image = require("../Model/docs");

// // exports.upload_image = async (req, res) => {
// //   try {
// //     const img = new Image({
// //       // data: req.file.buffer.toString("base64"),
// //       data: req.file.mimetype === "application/pdf" ? req.file.buffer : req.file.buffer.toString("base64"),
// //       // contentType: req.file.mimetype,
// //       contentType: req.file.mimetype.includes("pdf") ? "application/pdf" : req.file.mimetype,
// //     });
// //     await img.save();
// //     res.status(201).json({ message: "Image uploaded successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // exports.get_images = async (req, res) => {
// //   try {
// //     const images = await Image.find();
// //     res.json(images);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// const File = require("../Model/docs"); // Assuming your model is named "File"

// exports.upload_image = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const fileData = req.file.buffer.toString("base64"); // Convert everything to Base64

//     const file = new File({
//       data: fileData,
//       contentType: req.file.mimetype, // Use the actual MIME type
//     });

//     await file.save();
//     res.status(201).json({ message: "File uploaded successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.get_images = async (req, res) => {
//   try {
//     const files = await File.find();
//     res.json(files);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const multer = require("multer");
const File = require("../Model/docs"); // Assuming your model is named "File"

// Set up Multer Storage (for memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Image
exports.upload_image = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileData = req.file.buffer.toString("base64"); // Convert everything to Base64

    const file = new File({
      data: fileData,
      contentType: req.file.mimetype,
    });

    await file.save();
    res.status(201).json({ message: "File uploaded successfully", fileId: file._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Images
exports.get_images = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete_image = async (req, res) => {
  try {

    let id = req.params.id
    const deleteImage = await File.findByIdAndDelete(id);
    if (!deleteImage) {
      return res.status(404).json({ message: "password not found" });
    }

    res.status(200).send(deleteImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Middleware for file upload (use this in your route)
exports.uploadMiddleware = upload.single("file");
