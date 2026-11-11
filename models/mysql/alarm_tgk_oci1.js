const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "alarmTgkOci1",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      epochtime: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      plc_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lotno: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pro: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      w1: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w3: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w4: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w5: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w6: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w7: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w8: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w9: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w10: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w11: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w12: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w13: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w14: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w15: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w16: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w17: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w18: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w19: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      w20: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      total_detect: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      TGK_Count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      TGK_NG: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("current_timestamp"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("current_timestamp"),
      },
    },
    {
      tableName: "alarm_tgk_oci1",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
