module.exports = function (sequelize, DataTypes) {
    let Model = sequelize.define('bpdoc1', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        epochtime:{
            type: DataTypes.INTEGER,
        },
        time: {
            type: DataTypes.DATE
        },
        lotno1: {
            type: DataTypes.STRING(100)
        },
        prod_order1: {
            type: DataTypes.STRING(100)
        },
        counter: {
            type: DataTypes.INTEGER
        },
        value:{
            type: DataTypes.STRING,
        },
        avg:{
            type: DataTypes.INTEGER,
        },
        min:{
            type: DataTypes.INTEGER,
        },
        max:{
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: 'bpdoc1'
      });
    // Model.associate = function(models) {};

    return Model;
  };
  
  
  