const nodemailer = require("nodemailer");
const db = require("../models");
const { generateRandomSixDigitNumber } = require("../../utils");
const users = db.users;
const Op = db.Sequelize.Op;
require("dotenv").config();

exports.sendEmail = async (req, res) => {
  try {
    const requiredFields = ["from", "to"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          status: "error",
          error_message: "Parameter tidak lengkap " + field,
          code: 400,
        });
      }
    }

    const existUser = await users.findOne({
      where: {
        email: { [Op.eq]: req.body.to },
        role: { [Op.eq]: "customer" },
        deleted: { [Op.eq]: 0 },
      },
    });

    if (!existUser) {
      return res.status(400).send({
        status: "not found",
        error_message: "Email belum terdaftar",
        code: 400,
      });
    }
    const otp = generateRandomSixDigitNumber();
    await users.update(
      {
        reset_otp: otp,
        reset_status: existUser.reset_status + 1,
      },
      {
        where: {
          deleted: { [Op.eq]: 0 },
          id: { [Op.eq]: existUser.id },
        },
      }
    );
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const payload = {
      ...req.body,
      subject: "Reset Password",
      text: `Gunakan Kode OTP ini untuk verifikasi pemulihan password: ${otp}`,
    };
    transport.sendMail(payload, function (error, info) {
      if (error) throw Error(error);
      console.log("email send successfully");
      console.log(info);
    });
    return res.status(200).send({
      status: "success",
      message: "Email Sent",
      items: existUser,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Server mengalami gangguan!", error: error });
    return;
  }
};

exports.sendEmailVerificationRegister = async (req, res) => {
  try {
    const requiredFields = ["from", "to"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          status: "error",
          error_message: "Parameter tidak lengkap " + field,
          code: 400,
        });
      }
    }

    const existUser = await users.findOne({
      where: {
        email: { [Op.eq]: req.body.to },
        role: { [Op.eq]: "customer" },
        deleted: { [Op.eq]: 0 },
      },
    });

    if (!existUser) {
      return res.status(400).send({
        status: "not found",
        error_message: "Email belum terdaftar",
        code: 400,
      });
    }
    const otp = generateRandomSixDigitNumber();
    await users.update(
      {
        email_otp: otp,
      },
      {
        where: {
          deleted: { [Op.eq]: 0 },
          id: { [Op.eq]: existUser.id },
        },
      }
    );
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const payload = {
      ...req.body,
      subject: "Register Verification Tokotitoh",
      text: `Gunakan Kode OTP ini untuk verifikasi pendaftaran di Tokotitoh: ${otp}`,
    };
    transport.sendMail(payload, function (error, info) {
      if (error) throw Error(error);
      console.log("email send successfully");
      console.log(info);
    });
    return res.status(200).send({
      status: "success",
      message: "Email Sent",
      items: existUser,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Server mengalami gangguan!", error: error });
    return;
  }
};
