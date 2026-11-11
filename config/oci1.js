var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const modelDir = path.join(__dirname, '../models');
const Oci1 = new Sequelize(
  'aio_iot_oci1',
  'iot_prod',
  '123456', {
    logging: false,
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    define: {
      timestamps: false,
      timezone: '+07:00'
    },
    timezone: '+07:00',
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  }
);

const db = {};
let model;


//Directory models
fs.readdirSync(modelDir)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1);
  })
  .forEach((file) => {
    model = Oci1.import(path.join(modelDir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if ('associate' in db[name]) {
    db[name].associate(db);
  }
});


module.exports = db