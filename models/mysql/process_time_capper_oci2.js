const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('processTimeCapperOci2', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    epochtime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    lotno: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fin_step_pulse_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_3: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_3: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_4: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_4: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_5: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_5: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_6: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_6: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_6: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_6: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_7: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_7: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_7: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_7: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_8: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_8: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_8: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_8: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_9: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_9: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_9: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_9: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_10: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_10: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_10: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_10: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_11: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_11: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_11: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_11: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_12: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_12: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_12: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_12: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_13: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_13: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_13: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_13: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_14: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_14: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_14: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_14: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_15: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_15: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_15: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_15: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_16: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_16: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_16: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_16: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_17: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_17: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_17: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_17: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_18: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_18: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_18: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_18: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_19: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_19: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_19: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_19: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    fin_step_pulse_20: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_pulse_20: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },
    proces_time_20: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    tightening_torque_20: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'process_time_capper_oci2',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    });
}