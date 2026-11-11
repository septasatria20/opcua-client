module.exports = function (sequelize, DataTypes) {
    let Model = sequelize.define('alarm_capper2', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        lotno: {
            type: DataTypes.STRING(100)
        },
        pro: {
            type: DataTypes.STRING(100)
        },
        cap_no: {
            type: DataTypes.STRING(100)
        },
        alarm_code: {
            type: DataTypes.STRING(100)
        },
        server_time: {
            type: DataTypes.DATE
        },
        time:{
            type: DataTypes.TIME,
        },
        date:{
            type: DataTypes.DATEONLY,
        },
        b0:{
            type: DataTypes.INTEGER(1),
        },
        b1:{
            type: DataTypes.INTEGER(1),
        },
        b2:{
            type: DataTypes.INTEGER(1),
        },
        b3:{
            type: DataTypes.INTEGER(1),
        },
        b4:{
            type: DataTypes.INTEGER(1),
        },
        b5:{
            type: DataTypes.INTEGER(1),
        },
        b6:{
            type: DataTypes.INTEGER(1),
        },
        b7:{
            type: DataTypes.INTEGER(1),
        },
        b8:{
            type: DataTypes.INTEGER(1),
        },
        b9:{
            type: DataTypes.INTEGER(1),
        },
        b10:{
            type: DataTypes.INTEGER(1),
        },
        b11:{
            type: DataTypes.INTEGER(1),
        },
        b12:{
            type: DataTypes.INTEGER(1),
        },
        b13:{
            type: DataTypes.INTEGER(1),
        },
        b14:{
            type: DataTypes.INTEGER(1),
        },
        b15:{
            type: DataTypes.INTEGER(1),
        }
    }, {
        tableName: 'history_alarm_capper_2'
      });
    // Model.associate = function(models) {};

    return Model;
  };