const express = require("express");
const router = express.Router();
const passwordcontroller = require("../controllers/password");
const userControlers = require("../controllers/authController");

const { resendOtp, getOtps } = require("../controllers/otpController");


const docsController = require("../controllers/docsController")
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//password routes
router.post("/postPasswords", passwordcontroller.createPasswords);
router.get("/getPasswords", passwordcontroller.getPasswords);
router.delete("/deletePassword/:id", passwordcontroller.deletePassword);
router.put("/updatePassword/:id", passwordcontroller.updatePassword);

// authentication routes
router.post("/register", userControlers.registerUser);
router.get("/get-users", userControlers.getUsers)
router.post("/login", userControlers.loginUser);

router.post("/resendOtp", resendOtp);
router.get("/getotps", getOtps);

// docs
router.post("/uploadDocs", upload.single("file"), docsController.upload_image);

router.get("/getDOcs", docsController.get_images);
router.delete("/deleteImage/:id", docsController.delete_image);

module.exports = router;
