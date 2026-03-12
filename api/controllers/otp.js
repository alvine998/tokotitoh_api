const nodemailer = require("nodemailer");
const db = require("../models");
const { generateRandomSixDigitNumber } = require("../../utils");
const users = db.users;
const Op = db.Sequelize.Op;
require("dotenv").config();

const sendOtpEmail = async (email, otp) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verification Code Tokotitoh",
    text: `Gunakan Kode OTP ini untuk verifikasi: ${otp}`,
  };

  return transport.sendMail(mailOptions);
};

// Reusable function to handle OTP generation and sending
exports.handleSendOtp = async (email) => {
  const user = await users.findOne({
    where: {
      email: { [Op.eq]: email },
      deleted: { [Op.eq]: 0 },
    },
  });

  if (!user) {
    const error = new Error("Email not found");
    error.statusCode = 404;
    throw error;
  }

  const now = new Date();
  if (user.last_otp_sent_at) {
    const lastSent = new Date(user.last_otp_sent_at);
    const diffInMinutes = (now - lastSent) / 1000 / 60;
    if (diffInMinutes < 1) {
      const error = new Error(
        "Please wait 1 minute before requesting another OTP",
      );
      error.statusCode = 429;
      throw error;
    }
  }

  const otp = generateRandomSixDigitNumber();
  await users.update(
    {
      email_otp: otp,
      last_otp_sent_at: now,
    },
    {
      where: { id: user.id },
    },
  );

  await sendOtpEmail(email, otp);
  return user;
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        status: "error",
        message: "Email is required",
        code: 400,
      });
    }

    await exports.handleSendOtp(email);

    return res.status(200).send({
      status: "success",
      message: "OTP sent successfully",
      code: 200,
    });
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      return res.status(error.statusCode).send({
        status: "error",
        message: error.message,
        code: error.statusCode,
      });
    }
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

exports.resendOtp = async (req, res) => {
  // resendOtp uses the same logic as sendOtp (enforcing 1-minute delay)
  return exports.sendOtp(req, res);
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).send({
        status: "error",
        message: "Email and OTP are required",
        code: 400,
      });
    }

    const user = await users.findOne({
      where: {
        email: { [Op.eq]: email },
        email_otp: { [Op.eq]: otp },
        deleted: { [Op.eq]: 0 },
      },
    });

    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "Invalid OTP or Email",
        code: 400,
      });
    }

    // OTP verified successfully
    await users.update(
      {
        email_otp: null,
        verified: 1, // Auto-verify user on successful OTP
      },
      {
        where: { id: user.id },
      },
    );

    const updatedUser = await users.findOne({
      where: { id: user.id, deleted: { [Op.eq]: 0 } },
      attributes: { exclude: ["deleted", "password"] },
    });

    return res.status(200).send({
      status: "success",
      message: "OTP verified successfully. User is now verified.",
      user: updatedUser,
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};
