const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ads",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      partner_code: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      brand_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategory_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      wa: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      province_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      district_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      km: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      transmission: {
        type: DataTypes.ENUM("AT", "MT", "CVT"),
        allowNull: true,
      },
      fuel_type: {
        type: DataTypes.ENUM("bensin", "diesel", "hybrid", "ev"),
        allowNull: true,
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      plat_no: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ownership: {
        type: DataTypes.ENUM("individual", "company"),
        allowNull: true,
      },
      area: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      building: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      condition: {
        type: DataTypes.ENUM("bekas", "baru"),
        allowNull: true,
        defaultValue: "baru",
      },
      views: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      calls: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      certificates: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      expired_on: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "ads",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    },
  );
};
