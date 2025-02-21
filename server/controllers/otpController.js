const otpModel = require("../Model/otp"); // Import OTP model
const nodemailer = require("nodemailer"); // For sending emails

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravikumarmenthula@gmail.com",
    pass: "eyln ssax buxj kesc",
  },
});

function otpGenerate() {
  return Math.floor(100000 + Math.random() * 999999).toString();
}

exports.sendOtp = async (fullname, email, crdate, req) => {
  const otp = otpGenerate();
  transporter.sendMail({
    from: "sriharivas1111@gmail.com",
    to: email,
    subject: "otp genration",
    text: `your otp is ${otp}`,
  });

  const otpEntry = new otpModel({
    otp: otp,
    fullname: fullname,
    email: email,
    date: new Date(),
  });

  await otpEntry.save();

  return otp;
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  const otpEntry = await otpModel.findOne({ email });

  const tenMinutes = 1000; // 10 minutes in milliseconds
  const now = new Date();

  if (now - otpEntry.date < tenMinutes) {
    return res
      .status(429)
      .send("You can only resend the OTP after 10 minutes.");
  }
  const otp = otpGenerate();

  await transporter.sendMail({
    from: "sriharivas1111@gmail.com",
    to: email,
    subject: "Resending OTP",
    text: `Your new OTP is ${otp}`,
  });

  // Update the existing OTP entry in the database
  otpEntry.otp = otp; // Update with the new OTP
  otpEntry.date = new Date(); // Update the timestamp
  await otpEntry.save(); // Save the updated entry

  res.status(200).send("OTP resent successfully.");
};
exports.getOtps = async (req, res) => {
  const otps = await otpModel.find();
  res.send(otps);
};
