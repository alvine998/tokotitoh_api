const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    partner_code: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin','super_admin','customer'),
      allowNull: false
    },
    google_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reset_otp: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    reset_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    save_ads: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
