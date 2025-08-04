const db = require("../models");
const brands = db.brands;
const categories = db.categories;
const Op = db.Sequelize.Op;
require("dotenv").config();

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
  try {
    const size = +req.query.size || 10;
    const page = +req.query.page || 0;
    const offset = size * page;

    const result = await brands.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        partner_code: { [Op.eq]: req.header("x-partner-code") },
        ...(req.query.id && { id: { [Op.eq]: req.query.id } }),
        ...(req.query.category_id && {
          category_id: { [Op.eq]: req.query.category_id },
        }),
        ...(req.query.status && { status: { [Op.in]: req.query.status } }),
        ...(req.query.search && {
          [Op.or]: [{ name: { [Op.like]: `%${req.query.search}%` } }],
        }),
      },
      order: [["name", "ASC"]],
      attributes: { exclude: ["deleted"] },
      ...(req.query.pagination == "true" && {
        limit: size,
        offset: offset,
      }),
    });
    return res.status(200).send({
      status: "success",
      items: result,
      total_pages: Math.ceil(result.count / size),
      current_page: page,
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

exports.create = async (req, res) => {
  try {
    const requiredFields = ["name", "category_id"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          status: "error",
          error_message: "Parameter tidak lengkap " + field,
          code: 400,
        });
      }
    }

    const category = await categories.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        partner_code: { [Op.eq]: req.header("x-partner-code") },
        id: { [Op.eq]: req.body.category_id },
      },
    });
    if (!category) {
      return res.status(400).send({
        status: "error",
        error_message: "Kategori tidak ditemukan",
        code: 400,
      });
    }
    const payload = {
      ...req.body,
      partner_code: req.header("x-partner-code"),
      category_name: category.name,
    };
    const result = await brands.create(payload);
    return res.status(200).send({
      status: "success",
      items: result,
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

exports.update = async (req, res) => {
  try {
    const result = await brands.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        id: { [Op.eq]: req.body.id },
      },
    });
    if (!result) {
      return res.status(400).send({ message: "Data tidak ditemukan!" });
    }
    const payload = {
      ...req.body,
    };
    const onUpdate = await brands.update(payload, {
      where: {
        deleted: { [Op.eq]: 0 },
        id: { [Op.eq]: req.body.id },
      },
    });
    res.status(200).send({ message: "Berhasil ubah data", update: onUpdate });
    return;
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Gagal mendapatkan data admin", error: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await brands.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        id: { [Op.eq]: req.query.id },
      },
    });
    if (!result) {
      return res.status(404).send({ message: "Data tidak ditemukan!" });
    }
    result.deleted = 1;
    await result.save();
    res.status(200).send({ message: "Berhasil hapus data" });
    return;
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Gagal mendapatkan data admin", error: error });
  }
};
