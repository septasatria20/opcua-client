var Sequelize = require('sequelize')
const path = require('path');
const fs = require('fs');
const Op = Sequelize.Op

const operatorsAliases = {
	$between: Sequelize.Op.between,
	$and: Sequelize.Op.and,
	$or: Sequelize.Op.or,
	$eq: Sequelize.Op.eq,
	$ne: Sequelize.Op.ne,
	$gte: Sequelize.Op.gte,
	$gt: Sequelize.Op.gt,
	$lt: Sequelize.Op.lt,
	$lte: Sequelize.Op.lte,
	$like: Sequelize.Op.like,
	$in: Sequelize.Op.in,
	$not: Sequelize.Op.not
};


const serverDB = new Sequelize('aio_iot_oci1', 'gradmin', 'P@ssw0rd.1', {
	host: '192.168.9.49',
	dialect: 'mysql',
	port: 6446,
	define: {
		timestamps: false,
		timezone: '+07:00'
	},
	logging: false,
	timezone: '+07:00',
	operatorsAliases: operatorsAliases
});

const localDB = new Sequelize('node_red', 'iot_prod', '123456', {
	host: '192.168.9.8',
	dialect: 'mysql',
	port: 3306,
	define: {
		timestamps: false,
		timezone: '+07:00'
	},
	logging: false,
	timezone: '+07:00',
	operatorsAliases: operatorsAliases,
	pool: {
			max: parseInt(process.env.MYSQL_POOL_MAX || 100),
			min: parseInt(process.env.MYSQL_POOL_MIN || 10),
			acquire: parseInt(process.env.MYSQL_POOL_ACQUIRE || 60000),
			idle: parseInt(process.env.MYSQL_POOL_IDLE || 30000),
			evict: parseInt(process.env.MYSQL_POOL_EVICT || 5000),
			handleDisconnects: true
		},
		retry: {
			max: 5,
			timeout: 15000,
			match: [/Deadlock/i, /PROTOCOL_CONNECTION_LOST/i, /PROTOCOL_SEQUENCE_TIMEOUT/i]
		},
		dialectOptions: {
			connectTimeout: 60000,
			supportBigNumbers: true,
			bigNumberStrings: true,
			enableKeepAlive: true,
			keepAliveInitialDelayMs: 30000
		}
});



// added sequelize models
const dir = path.join(__dirname, '../models/mysql');
const db = {};
let model;

//Directory models
fs.readdirSync(dir)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1);
  })
  .forEach((file) => {
    model = require(path.join(dir, file))(localDB, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if ('associate' in db[name]) {
    db[name].associate(db);
  }
});



module.exports = {
	serverDB,
	localDB,
	db
};