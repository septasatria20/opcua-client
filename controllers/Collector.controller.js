var OPCUA = require('./OPCUA.controller');
const modelOCI1 = require('./../models/nodeOCI1');
const modelOCI2 = require('./../models/nodeOCI2');
const modelFSB = require('./../models/nodeFSB');
const system = require('./../models/system');
var moment = require('moment');
const modelsStatic = require('./../config/sequelizeStatic');
var socketIO;
const fetch = require('node-fetch');
const botToken = '1449513217:AAH5rFDy9jKFZcQDy42zAeQLsqJ1bx4ryNc';
const { exec } = require('child_process');

// ------------- BPDOC ------------
let BPDOC1Temp = [];
let BPDOC2Temp = [];
let tempStatus1 = false;
let tempStatus2 = false;
// --------------------------------

// ------------- HISTORY ALARM CAPPER ------------
let historyTemp1 = {};
let historyTemp2 = {};
// --------------------------------

//auto restart when data stuck
let lastActivityTime = Date.now(); 

function updateHeartbeat() {
    lastActivityTime = Date.now();
}

// date check 1 menit (60000 ms)
setInterval(() => {
    let timeSinceLastActivity = Date.now() - lastActivityTime;
    
    // if function stuck >= 5 mnt (300000 ms), restart
    if (timeSinceLastActivity >= 300000) {
        console.log('sistem stuckk detected, run pm2 restart 0...');
        exec('pm2 restart 0');
        lastActivityTime = Date.now(); // date restart 
    }
}, 60000);
//--------------------------------------------------------------------------------------------------------------

async function cttn_ccpfsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.cttn_ccpfsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		// console.log('kolom', model[key].column);
		// console.log('value', model[key].value);
		var nodeVal = model[key].column !== 'ccp_speed_cv' ? Math.round(model[key].value) : model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	//console.log(value);
	insertIntoDatabase('cttn_ccpfsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function cttn_baking_cooling_fsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.cttn_baking_cooling_fsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno');
	columns.push('prod_order');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('FSB1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	//console.log(value);
	insertIntoDatabase('cttn_baking_cooling_fsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function cttn_pillow_fsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.cttn_pillow_fsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	//console.log(value);
	insertIntoDatabase('cttn_pillow_fsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
//pre alarm fsb
async function pre_alarm3() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.pre_alarm3;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional fieldSSSS
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	// columns.push('lotno_fsb');
	// columns.push('prod_order_fsb');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	// value.push("'" + identity.lotno + "'"); //lotno
	// value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('pre_alarm3', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('pre_alarm3', model, identity, time)
	//checkPreAlarm('pre_alarm3', model, identity, time)
	// | Inserting data to database
	// console.log(value);
	insertIntoDatabase('pre_alarm3', columns, value, time);
	//deleteFromDatabase('pre_alarm3');
}
async function cttn_forming_fsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.cttn_forming_fsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	// console.log(value);
	insertIntoDatabase('cttn_forming_fsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function fsb_pillow_keyence() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.fsb_pillow_keyence;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	//console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	// console.log(value);
	insertIntoDatabase('fsb_pillow_keyence', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function cttn_hvac_fsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.cttn_hvac_fsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log(nodeVal)
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	// console.log(value);
	insertIntoDatabase('cttn_hvac_fsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function k6pmfsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.k6pm_mixing_fsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log(nodeVal)
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	// var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	//value.push("'" + identity.lotno + "'"); //lotno
	//value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ccpfsb', model, identity, time)
	//checkPreAlarm('cttn_ccpfsb', model, identity, time)
	// | Inserting data to database
	// console.log(value);
	insertIntoDatabase('k6pm_mixing_fsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function packing_fx5uj_motorfsb() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelFSB.packing_fx5uj_motorfsb;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// console.log(columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno');
	columns.push('prod_order');
	//columns.push('lotno2');
	//columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log(nodeVal)
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('FSB1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	
	insertIntoDatabase('packing_fx5uj_motorfsb', columns, value, time);
	//deleteFromDatabase('cttn_ccpfsb');
}
async function historyAlarmCapper1_Old() {
	// |--------- Initalize model to be used on this table --------------
	let model = modelOCI1.history_alarm_capper;
	let identity = OPCUA.getIdentity('1');
	// |---------Get All value from OPCUA------------
	let obj = {};
	// | Looping properties
	for (let key of Object.keys(model)) {
		let nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}

		let adjustedKey = model[key].column.replace('Rej1_', '').toLowerCase();

		obj[adjustedKey]= nodeVal
	}
	// console.log('----------------- OBJ OC1 ----------------');
	// console.log(obj);

	// if object is empty
	if (Object.keys(historyTemp1).length == 0) {
		let lastData = await modelsStatic.db.alarm_capper1.findAll({
			limit: 1,
			order: [['id', 'DESC']]
		});

		historyTemp1.cap_no = lastData.length == 0 ? null : parseInt(lastData[0].cap_no);
		historyTemp1.day = lastData.length == 0 ? null : parseInt(lastData[0].date.toString().split('-')[2]);
		historyTemp1.hours = lastData.length == 0 ? null : parseInt(lastData[0].time.toString().split(':')[0]);
		historyTemp1.minute = lastData.length == 0 ? null : parseInt(lastData[0].time.toString().split(':')[1]);
		historyTemp1.month = lastData.length == 0 ? null : parseInt(lastData[0].date.toString().split('-')[1]);
		historyTemp1.reject_code = lastData.length == 0 ? null : parseInt(lastData[0].alarm_code);
	}

	// console.log('----------------- HISTORY OC1 ----------------');
	// console.log(historyTemp1);
	// console.log(Object.entries(obj).toString() === Object.entries(historyTemp1).toString());

	if (Object.entries(obj).toString() !== Object.entries(historyTemp1).toString()) {
		if ((obj.cap_no !== historyTemp1.cap_no && obj.cap_no !== null && obj.cap_no !== 0) || 
			(obj.day !== historyTemp2.day && obj.day !== null && obj.day !== 0) || 
			(obj.month !== historyTemp2.month && obj.month !== null && obj.month !== 0) || 
			(obj.hours !== historyTemp2.hours && obj.hours !== null && obj.hours !== 0) || 
			(obj.minute !== historyTemp2.minute && obj.minute !== null && obj.minute !== 0) || 
			(obj.reject_code !== historyTemp1.reject_code && obj.reject_code !== null && obj.reject_code !== 0)) 
		{
			let month = obj.month.toString().length == 1 ? '0' + obj.month : obj.month;
			let day = obj.day.toString().length == 1 ? '0' + obj.day : obj.day;
			let time = obj.hours + ':' + obj.minute + ':00';
		
			// convert to binary
			let binnary = obj.reject_code.toString(2);
			binnary = binnary.split("").reverse().join("");
		
			await modelsStatic.db.alarm_capper1.create({
				lotno: identity.lotno,
				pro: identity.prod_order,
				cap_no: obj.cap_no,
				alarm_code: obj.reject_code,
				server_time: new Date(),
				time: time,
				date: moment().format('YYYY') + '-' + month + '-' + day,
				b0: binnary[0],
				b1: binnary[1],
				b2: binnary[2],
				b3: binnary[3],
				b4: binnary[4],
				b5: binnary[5],
				b6: binnary[6],
				b7: binnary[7],
				b8: binnary[8],
				b9: binnary[9],
				b10: binnary[10],
				b11: binnary[11],
				b12: binnary[12],
				b13: binnary[13],
				b14: binnary[14],
				b15: binnary[15]
			});
		
			historyTemp1 = obj;
			console.log('historyAlarmCapper1' + ' at ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' inserted');
		}
	}
}
async function historyAlarmCapper1() {
  try {
    let model = modelOCI1.history_alarm_capper;
    let identity = OPCUA.getIdentity('1');
    let obj = {};

    for (let key of Object.keys(model)) {
      let nodeVal = model[key].value || 'NULL';
      let adjustedKey = model[key].column.replace('Rej1_', '').toLowerCase();
      obj[adjustedKey] = nodeVal;
    }

    if (Object.keys(historyTemp1).length === 0) {
      let lastData = await modelsStatic.db.alarm_capper1.findAll({
        limit: 1,
        order: [['id', 'DESC']]
      });

      historyTemp1 = lastData.length === 0 ? {} : {
        cap_no: parseInt(lastData[0].cap_no),
        day: parseInt(lastData[0].date.toString().split('-')[2]),
        hours: parseInt(lastData[0].time.toString().split(':')[0]),
        minute: parseInt(lastData[0].time.toString().split(':')[1]),
        month: parseInt(lastData[0].date.toString().split('-')[1]),
        reject_code: parseInt(lastData[0].alarm_code)
      };
    }

    if (Object.entries(obj).toString() !== Object.entries(historyTemp1).toString()) {
      if (
        (obj.cap_no !== historyTemp1.cap_no && obj.cap_no !== null && obj.cap_no !== 0) ||
        (obj.day !== historyTemp1.day && obj.day !== null && obj.day !== 0) ||
        (obj.month !== historyTemp1.month && obj.month !== null && obj.month !== 0) ||
        (obj.hours !== historyTemp1.hours && obj.hours !== null && obj.hours !== 0) ||
        (obj.minute !== historyTemp1.minute && obj.minute !== null && obj.minute !== 0) ||
        (obj.reject_code !== historyTemp1.reject_code && obj.reject_code !== null && obj.reject_code !== 0)
      ) {
        let month = obj.month.toString().padStart(2, '0');
        let day = obj.day.toString().padStart(2, '0');
        let time = `${obj.hours}:${obj.minute}:00`;

        let binnary = obj.reject_code.toString(2).padStart(16, '0');
        binnary = binnary.split("").reverse().join("");

        await modelsStatic.db.alarm_capper1.create({
          lotno: identity.lotno,
          pro: identity.prod_order,
          cap_no: obj.cap_no,
          alarm_code: obj.reject_code,
          server_time: new Date(),
          time: time,
          date: moment().year(moment().year()).month(obj.month - 1).date(obj.day).format('YYYY-MM-DD'),
          ...binnary.split('').reduce((acc, bit, i) => ({ ...acc, [`b${i}`]: bit }), {})
        });

        historyTemp1 = obj;
        console.log(`historyAlarmCapper1 at ${moment().format('YYYY-MM-DD HH:mm:ss')} inserted`);
      }
    }
  } catch (error) {
    console.error('Error in historyAlarmCapper1:', error);
    // Handle the error as needed
  }
}

async function historyAlarmCapper2_Old() {
	// |--------- Initalize model to be used on this table --------------
	let model = modelOCI2.history_alarm_capper;
	let identity = OPCUA.getIdentity('2');
	// |---------Get All value from OPCUA------------
	let obj = {};
	// | Looping properties
	for (let key of Object.keys(model)) {
		let nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}

		let adjustedKey = model[key].column.replace('Rej1_', '').toLowerCase();

		obj[adjustedKey]= nodeVal
	}
	// console.log('----------------- OBJ OC2 ----------------');
	// console.log(obj);

	// if object is empty
	if (Object.keys(historyTemp2).length == 0) {
		let lastData = await modelsStatic.db.alarm_capper2.findAll({
			limit: 1,
			order: [['id', 'DESC']]
		});

		historyTemp2.cap_no = lastData.length == 0 ? null : parseInt(lastData[0].cap_no);
		historyTemp2.day = lastData.length == 0 ? null : parseInt(lastData[0].date.toString().split('-')[2]);
		historyTemp2.hours = lastData.length == 0 ? null : parseInt(lastData[0].time.toString().split(':')[0]);
		historyTemp2.minute = lastData.length == 0 ? null : parseInt(lastData[0].time.toString().split(':')[1]);
		historyTemp2.month = lastData.length == 0 ? null : parseInt(lastData[0].date.toString().split('-')[1]);
		historyTemp2.reject_code = lastData.length == 0 ? null : parseInt(lastData[0].alarm_code);
	}

	// console.log('----------------- HISTORY OC2 ----------------');
	// console.log(historyTemp1);
	// console.log(Object.entries(obj).toString() === Object.entries(historyTemp1).toString());

	if (Object.entries(obj).toString() !== Object.entries(historyTemp2).toString()) {
		if ((obj.cap_no !== historyTemp2.cap_no && obj.cap_no !== null && obj.cap_no !== 0) || 
			(obj.day !== historyTemp2.day && obj.day !== null && obj.day !== 0) || 
			(obj.month !== historyTemp2.month && obj.month !== null && obj.month !== 0) || 
			(obj.hours !== historyTemp2.hours && obj.hours !== null && obj.hours !== 0) || 
			(obj.minute !== historyTemp2.minute && obj.minute !== null && obj.minute !== 0) || 
			(obj.reject_code !== historyTemp2.reject_code && obj.reject_code !== null && obj.reject_code !== 0)) 
		{
			let month = obj.month.toString().length == 1 ? '0' + obj.month : obj.month;
			let day = obj.day.toString().length == 1 ? '0' + obj.day : obj.day;
			let time = obj.hours + ':' + obj.minute + ':00';
		
			// convert to binary
			let binnary = obj.reject_code.toString(2);
			binnary = binnary.split("").reverse().join("");
		
			await modelsStatic.db.alarm_capper2.create({
				lotno: identity.lotno,
				pro: identity.prod_order,
				cap_no: obj.cap_no,
				alarm_code: obj.reject_code,
				server_time: new Date(),
				time: time,
				date: moment().format('YYYY') + '-' + month + '-' + day,
				b0: binnary[0],
				b1: binnary[1],
				b2: binnary[2],
				b3: binnary[3],
				b4: binnary[4],
				b5: binnary[5],
				b6: binnary[6],
				b7: binnary[7],
				b8: binnary[8],
				b9: binnary[9],
				b10: binnary[10],
				b11: binnary[11],
				b12: binnary[12],
				b13: binnary[13],
				b14: binnary[14],
				b15: binnary[15]
			});
		
			historyTemp2 = obj;
			console.log('historyAlarmCapper2' + ' at ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' inserted');
		}
	}
}

async function historyAlarmCapper2() {
  try {
    let model = modelOCI2.history_alarm_capper;
    let identity = OPCUA.getIdentity('2');
    let obj = {};

    for (let key of Object.keys(model)) {
      let nodeVal = model[key].value || 'NULL';
      let adjustedKey = model[key].column.replace('rej1_', '').toLowerCase();
      obj[adjustedKey] = nodeVal;
    }

    if (Object.keys(historyTemp2).length === 0) {
      let lastData = await modelsStatic.db.alarm_capper2.findAll({
        limit: 1,
        order: [['id', 'DESC']]
      });

      historyTemp2 = lastData.length === 0 ? {} : {
        cap_no: parseInt(lastData[0].cap_no),
        day: parseInt(lastData[0].date.toString().split('-')[2]),
        hours: parseInt(lastData[0].time.toString().split(':')[0]),
        minute: parseInt(lastData[0].time.toString().split(':')[1]),
        month: parseInt(lastData[0].date.toString().split('-')[1]),
        reject_code: parseInt(lastData[0].alarm_code)
      };
    }

    if (Object.entries(obj).toString() !== Object.entries(historyTemp2).toString()) {
      if (
        (obj.cap_no !== historyTemp2.cap_no && obj.cap_no !== null && obj.cap_no !== 0) ||
        (obj.day !== historyTemp2.day && obj.day !== null && obj.day !== 0) ||
        (obj.month !== historyTemp2.month && obj.month !== null && obj.month !== 0) ||
        (obj.hours !== historyTemp2.hours && obj.hours !== null && obj.hours !== 0) ||
        (obj.minute !== historyTemp2.minute && obj.minute !== null && obj.minute !== 0) ||
        (obj.reject_code !== historyTemp2.reject_code && obj.reject_code !== null && obj.reject_code !== 0)
      ) {
        let month = obj.month.toString().padStart(2, '0');
        let day = obj.day.toString().padStart(2, '0');
        let time = `${obj.hours}:${obj.minute}:00`;

        let binnary = obj.reject_code.toString(2).padStart(16, '0');
        binnary = binnary.split("").reverse().join("");

        await modelsStatic.db.alarm_capper2.create({
          lotno: identity.lotno,
          pro: identity.prod_order,
          cap_no: obj.cap_no,
          alarm_code: obj.reject_code,
          server_time: new Date(),
          time: time,
          date: moment().year(moment().year()).month(obj.month - 1).date(obj.day).format('YYYY-MM-DD'),
          ...binnary.split('').reduce((acc, bit, i) => ({ ...acc, [`b${i}`]: bit }), {})
        });

        historyTemp2 = obj;
        console.log(`historyAlarmCapper2 at ${moment().format('YYYY-MM-DD HH:mm:ss')} inserted`);
      }
    }
  } catch (error) {
    console.error('Error in historyAlarmCapper2:', error);
    // Handle the error as needed
  }
}

// CNT LABEL R SERIES OC1
let monitorValueCntTgkOci1 = -1;
let isCntTgkRunningOci1 = false;

async function cntAlarmTgkOci1() {
  if (isCntTgkRunningOci1) {
    return;
  }
  isCntTgkRunningOci1 = true;

  try {
    const ngTgkConfig = modelOCI1.ng_tgk;
    if (!ngTgkConfig || !ngTgkConfig.cnt_row1) {
      console.warn("Konfigurasi ng_tgk di modelOCI1 tidak ditemukan!");
      return;
    }

    // Inisialisasi monitorValue dari database jika belum ada
    if (monitorValueCntTgkOci1 < 0) {
      try {
        const lastRecord = await modelsStatic.db.alarmTgkOci1.findOne({
          attributes: ['counter'],
          where: { counter: { [modelsStatic.db.Sequelize.Op.gt]: 0 } },
          order: [['id', 'DESC']]
        });
        if (lastRecord && lastRecord.counter > 0) {
          monitorValueCntTgkOci1 = Number(lastRecord.counter);
        }
      } catch (errDB) {
        console.warn("Gagal inisialisasi monitorValue dari DB OC1:", errDB.message);
      }
    }

    const topCounter = await OPCUA.readValue(ngTgkConfig.cnt_row1.node);

    // Jangan proses jika top counter di PLC kosong atau <= 0
    if (!topCounter || topCounter <= 0) {
      return;
    }

    // Jika ini pertama kali dan DB kosong, set baseline ke topCounter
    if (monitorValueCntTgkOci1 < 0) {
      monitorValueCntTgkOci1 = topCounter;
      return;
    }

    // Jika tidak ada perubahan counter terbaru, tidak ada alarm baru
    if (topCounter === monitorValueCntTgkOci1) {
      return;
    }

    // Cari posisi monitorValue di baris 2 s/d 20
    let foundRow = -1;
    for (let r = 2; r <= 20; r++) {
      const val = await OPCUA.readValue(ngTgkConfig[`cnt_row${r}`].node);
      if (val === monitorValueCntTgkOci1) {
        foundRow = r;
        break;
      }
    }

    const rowsToProcess = [];
    if (foundRow !== -1) {
      // Ada alarm baru dari baris (foundRow - 1) mundur ke baris 1
      // Urutan kronologis: dari baris lebih lama (bawah) ke baris lebih baru (atas)
      for (let r = foundRow - 1; r >= 1; r--) {
        rowsToProcess.push(r);
      }
    } else {
      // Monitor value tidak ditemukan (lonjakan > 20 alarm, reset counter, dll)
      // Periksa dari baris 20 mundur ke 1
      for (let r = 20; r >= 1; r--) {
        rowsToProcess.push(r);
      }
    }

    let tgkCount = null;
    let tgkNg = null;
    if (modelOCI1.TGK_Count) {
      tgkCount = await OPCUA.readValue(modelOCI1.TGK_Count.node);
    }
    if (modelOCI1.TGK_NG) {
      tgkNg = await OPCUA.readValue(modelOCI1.TGK_NG.node);
    }

    const results = [];
    for (const row of rowsToProcess) {
      const counter = await OPCUA.readValue(ngTgkConfig[`cnt_row${row}`].node);

      // Filter: jangan simpan counter kosong / 0 / null
      if (!counter || counter <= 0) {
        continue;
      }

      // Jika monitor value tidak ditemukan, pastikan tidak mengambil data lama yang sudah tersimpan
      if (foundRow === -1 && topCounter >= monitorValueCntTgkOci1 && counter <= monitorValueCntTgkOci1) {
        continue;
      }

      const firstCode = await OPCUA.readValue(ngTgkConfig[`kode1_row${row}`].node);
      const secondCode = await OPCUA.readValue(ngTgkConfig[`kode2_row${row}`].node);
      const thirdCode = await OPCUA.readValue(ngTgkConfig[`kode3_row${row}`].node);

      // Konversi kode ke biner
      const bin1 = (firstCode || 0).toString(2).padStart(8, "0");
      const bin2 = (secondCode || 0).toString(2).padStart(8, "0");
      const bin3 = (thirdCode || 0).toString(2).padStart(4, "0");

      const bits1 = {};
      for (let i = 0; i < bin1.length; i++) {
        bits1[`w${i + 1}`] = Number(bin1[bin1.length - 1 - i]);
      }

      const bits2 = {};
      for (let i = 0; i < bin2.length; i++) {
        bits2[`w${i + 9}`] = Number(bin2[bin2.length - 1 - i]);
      }

      const bits3 = {};
      for (let i = 0; i < bin3.length; i++) {
        bits3[`w${i + 17}`] = Number(bin3[bin3.length - 1 - i]);
      }

      const totalDetect =
        Object.values(bits1).reduce((a, b) => a + b, 0) +
        Object.values(bits2).reduce((a, b) => a + b, 0) +
        Object.values(bits3).reduce((a, b) => a + b, 0);

      results.push({
        counter: counter,
        ...bits1,
        ...bits2,
        ...bits3,
        total_detect: totalDetect,
        TGK_Count: tgkCount,
        TGK_NG: tgkNg,
      });
    }

    if (results.length > 0) {
      // Ambil prodidentity OC1
      let activeLot = null;
      let activePro = null;

      try {
        const prodidentity = await modelsStatic.serverDB.query(
          `SELECT lotno, prod_order FROM aio_iot_oci1.mst_prodidentity
           WHERE isActive = 'ACTIVE'
           ORDER BY id DESC
           LIMIT 1`
        );
        if (prodidentity && prodidentity[0] && prodidentity[0].length > 0) {
          activeLot = prodidentity[0][0].lotno;
          activePro = prodidentity[0][0].prod_order;
        }
      } catch (errDB) {
        console.warn("Gagal mengambil prodidentity OC1:", errDB.message);
      }

      const now = new Date();
      const currentTimeStr = moment(now).format('YYYY-MM-DD HH:mm:ss');
      let plcTimeStr = currentTimeStr;
      if (system && system.time && system.time.CurrentTime && system.time.CurrentTime.value) {
        const parsedPlc = moment(system.time.CurrentTime.value).tz('ETC/GMT');
        if (parsedPlc.isValid()) {
          plcTimeStr = parsedPlc.format('YYYY-MM-DD HH:mm:ss');
        }
      }

      const bulkData = results.map((item) => ({
        lotno: activeLot,
        pro: activePro,
        epochtime: now.getTime(),
        time: currentTimeStr,
        plc_time: plcTimeStr,
        ...item
      }));

      await modelsStatic.db.alarmTgkOci1.bulkCreate(bulkData);
      console.log("Data Alarm TGK OC1 tersimpan:", bulkData.length);
    }

    monitorValueCntTgkOci1 = topCounter;
  } catch (err) {
    console.error("Error pada cntAlarmTgkOci1:", err);
  } finally {
    isCntTgkRunningOci1 = false;
  }
}

// CNT LABEL R SERIES OC2
let monitorValueCntTgkOci2 = -1;
let isCntTgkRunningOci2 = false;

async function cntAlarmTgkOci2() {
  if (isCntTgkRunningOci2) {
    return;
  }
  isCntTgkRunningOci2 = true;

  try {
    const ngTgkConfig = modelOCI2.ng_tgk;
    if (!ngTgkConfig || !ngTgkConfig.cnt_row1) {
      console.warn("Konfigurasi ng_tgk di modelOCI2 tidak ditemukan!");
      return;
    }

    // Inisialisasi monitorValue dari database jika belum ada
    if (monitorValueCntTgkOci2 < 0) {
      try {
        const lastRecord = await modelsStatic.db.alarmTgkOci2.findOne({
          attributes: ['counter'],
          where: { counter: { [modelsStatic.db.Sequelize.Op.gt]: 0 } },
          order: [['id', 'DESC']]
        });
        if (lastRecord && lastRecord.counter > 0) {
          monitorValueCntTgkOci2 = Number(lastRecord.counter);
        }
      } catch (errDB) {
        console.warn("Gagal inisialisasi monitorValue dari DB OC2:", errDB.message);
      }
    }

    const topCounter = await OPCUA.readValue(ngTgkConfig.cnt_row1.node);

    // Jangan proses jika top counter di PLC kosong atau <= 0
    if (!topCounter || topCounter <= 0) {
      return;
    }

    // Jika ini pertama kali dan DB kosong, set baseline ke topCounter
    if (monitorValueCntTgkOci2 < 0) {
      monitorValueCntTgkOci2 = topCounter;
      return;
    }

    // Jika tidak ada perubahan counter terbaru, tidak ada alarm baru
    if (topCounter === monitorValueCntTgkOci2) {
      return;
    }

    // Cari posisi monitorValue di baris 2 s/d 20
    let foundRow = -1;
    for (let r = 2; r <= 20; r++) {
      const val = await OPCUA.readValue(ngTgkConfig[`cnt_row${r}`].node);
      if (val === monitorValueCntTgkOci2) {
        foundRow = r;
        break;
      }
    }

    const rowsToProcess = [];
    if (foundRow !== -1) {
      // Ada alarm baru dari baris (foundRow - 1) mundur ke baris 1
      // Urutan kronologis: dari baris lebih lama (bawah) ke baris lebih baru (atas)
      for (let r = foundRow - 1; r >= 1; r--) {
        rowsToProcess.push(r);
      }
    } else {
      // Monitor value tidak ditemukan (lonjakan > 20 alarm, reset counter, dll)
      // Periksa dari baris 20 mundur ke 1
      for (let r = 20; r >= 1; r--) {
        rowsToProcess.push(r);
      }
    }

    let tgkCount = null;
    let tgkNg = null;
    if (modelOCI2.TGK_Count) {
      tgkCount = await OPCUA.readValue(modelOCI2.TGK_Count.node);
    }
    if (modelOCI2.TGK_NG) {
      tgkNg = await OPCUA.readValue(modelOCI2.TGK_NG.node);
    }

    const results = [];
    for (const row of rowsToProcess) {
      const counter = await OPCUA.readValue(ngTgkConfig[`cnt_row${row}`].node);

      // Filter: jangan simpan counter kosong / 0 / null
      if (!counter || counter <= 0) {
        continue;
      }

      // Jika monitor value tidak ditemukan, pastikan tidak mengambil data lama yang sudah tersimpan
      if (foundRow === -1 && topCounter >= monitorValueCntTgkOci2 && counter <= monitorValueCntTgkOci2) {
        continue;
      }

      const firstCode = await OPCUA.readValue(ngTgkConfig[`kode1_row${row}`].node);
      const secondCode = await OPCUA.readValue(ngTgkConfig[`kode2_row${row}`].node);
      const thirdCode = await OPCUA.readValue(ngTgkConfig[`kode3_row${row}`].node);

      // Konversi kode ke biner
      const bin1 = (firstCode || 0).toString(2).padStart(8, "0");
      const bin2 = (secondCode || 0).toString(2).padStart(8, "0");
      const bin3 = (thirdCode || 0).toString(2).padStart(4, "0");

      const bits1 = {};
      for (let i = 0; i < bin1.length; i++) {
        bits1[`w${i + 1}`] = Number(bin1[bin1.length - 1 - i]);
      }

      const bits2 = {};
      for (let i = 0; i < bin2.length; i++) {
        bits2[`w${i + 9}`] = Number(bin2[bin2.length - 1 - i]);
      }

      const bits3 = {};
      for (let i = 0; i < bin3.length; i++) {
        bits3[`w${i + 17}`] = Number(bin3[bin3.length - 1 - i]);
      }

      const totalDetect =
        Object.values(bits1).reduce((a, b) => a + b, 0) +
        Object.values(bits2).reduce((a, b) => a + b, 0) +
        Object.values(bits3).reduce((a, b) => a + b, 0);

      results.push({
        counter: counter,
        ...bits1,
        ...bits2,
        ...bits3,
        total_detect: totalDetect,
        TGK_Count: tgkCount,
        TGK_NG: tgkNg,
      });
    }

    if (results.length > 0) {
      // Ambil prodidentity OC2
      let activeLot = null;
      let activePro = null;

      try {
        const prodidentity = await modelsStatic.serverDB.query(
          `SELECT lotno, prod_order FROM aio_iot_oci2.mst_prodidentity
           WHERE isActive = 'ACTIVE'
           ORDER BY id DESC
           LIMIT 1`
        );
        if (prodidentity && prodidentity[0] && prodidentity[0].length > 0) {
          activeLot = prodidentity[0][0].lotno;
          activePro = prodidentity[0][0].prod_order;
        }
      } catch (errDB) {
        console.warn("Gagal mengambil prodidentity OC2:", errDB.message);
      }

      const now = new Date();
      const currentTimeStr = moment(now).format('YYYY-MM-DD HH:mm:ss');
      let plcTimeStr = currentTimeStr;
      if (system && system.time && system.time.CurrentTime && system.time.CurrentTime.value) {
        const parsedPlc = moment(system.time.CurrentTime.value).tz('ETC/GMT');
        if (parsedPlc.isValid()) {
          plcTimeStr = parsedPlc.format('YYYY-MM-DD HH:mm:ss');
        }
      }

      const bulkData = results.map((item) => ({
        lotno: activeLot,
        pro: activePro,
        epochtime: now.getTime(),
        time: currentTimeStr,
        plc_time: plcTimeStr,
        ...item
      }));

      await modelsStatic.db.alarmTgkOci2.bulkCreate(bulkData);
      console.log("Data Alarm TGK OC2 tersimpan:", bulkData.length);
    }

    monitorValueCntTgkOci2 = topCounter;
  } catch (err) {
    console.error("Error pada cntAlarmTgkOci2:", err);
  } finally {
    isCntTgkRunningOci2 = false;
  }
}

let lastRejectCountOci1 = 0;
let isChangedReject = false;
let isFrontRearOci1Running = false;
async function frontRearOci1() {
	if (isFrontRearOci1Running) {
		return;
	}

	isFrontRearOci1Running = true;

	try {
		const fronts = Object.keys(modelOCI1.front_bpd_oci1);
		const rears = Object.keys(modelOCI1.rear_bpd_oci1);
		const reject = modelOCI1.cttn_rejectionoc1.bpd_total_defect.node
		let diff = 0;
		// Format value "column-node: value"
		const currentRejectCount = await OPCUA.readValue(reject);
		if (!isChangedReject) {
			lastRejectCountOci1 = currentRejectCount || 0;
			isChangedReject = true;
		}
		
		// Monitor Reject
		if (currentRejectCount < lastRejectCountOci1) {
			diff = currentRejectCount;
			console.warn(`Counter reset detected! From ${lastRejectCountOci1} to ${currentRejectCount}`)
		} else {
			diff = currentRejectCount - lastRejectCountOci1
		}

		if (diff > 0) {
			const payload = [];
			const date = new Date();
			for (let i = 1; i <= diff; i++) {
				const time = date.getTime();
				const front = await OPCUA.readValue(modelOCI1.front_bpd_oci1[fronts[i]].node)
				const rear = await OPCUA.readValue(modelOCI1.rear_bpd_oci1[rears[i]].node)
				payload.push({
					epochtime: time,
					counter: lastRejectCountOci1 - diff + i + 1,
					front: front,
					rear: rear,
					delta: Math.abs(front - rear)
				})
			}

			
			// Save data
			const prodidentity = await modelsStatic.serverDB.query(
				`SELECT lotno, prod_order FROM aio_iot_oci1.mst_prodidentity
				WHERE isActive = 'ACTIVE'
				ORDER BY id DESC
				LIMIT 1`
			);
			
			const bulkData = payload.map(item => ({
				lotno: prodidentity ? prodidentity[0][0].lotno : null,
				pro: prodidentity ? prodidentity[0][0].prod_order : null,
				epochtime: item.epochtime,
				counter: item.counter,
				front: item.front,
				rear: item.rear,
				delta: item.delta,
			}));

			const result = await modelsStatic.db.frontRearBpdOci1.bulkCreate(bulkData);

			console.log(`Front Rear BPD OCI1: ${result.length} records inserted at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
		}
		lastRejectCountOci1 = currentRejectCount;
	} catch (err) {
		console.error(err)
	} finally {
		isFrontRearOci1Running = false;
	}
}

let lastRejectCountOci2 = 0;
let isChangedRejectOci2 = false;
let isFrontRearOci2Running = false;
async function frontRearOci2() {
	if (isFrontRearOci2Running) {
		return;
	}

	isFrontRearOci2Running = true;

	try {
		const fronts = Object.keys(modelOCI2.front_bpd);
		const rears = Object.keys(modelOCI2.rear_bpd);
		const reject = modelOCI2.cttn_rejectionoc2.bpd_total_defect.node
		let diff = 0;
		// Format value "column-node: value"
		const currentRejectCount = await OPCUA.readValue(reject);
		if (!isChangedRejectOci2) {
			lastRejectCountOci2 = currentRejectCount || 0;
			isChangedRejectOci2 = true;
		}
		
		// Monitor Reject
		if (currentRejectCount < lastRejectCountOci2) {
			diff = currentRejectCount;
			console.warn(`Counter reset detected! From ${lastRejectCountOci2} to ${currentRejectCount}`)
		} else {
			diff = currentRejectCount - lastRejectCountOci2
		}

		if (diff > 0) {
			const payload = [];
			const date = new Date();
			for (let i = 1; i <= diff; i++) {
				const time = date.getTime() / 1000;
				const front = await OPCUA.readValue(modelOCI2.front_bpd[fronts[i]].node)
				const rear = await OPCUA.readValue(modelOCI2.rear_bpd[rears[i]].node)
				payload.push({
					epochtime: time,
					counter: lastRejectCountOci2 - diff + i + 1,
					front: front,
					rear: rear,
					delta: Math.abs(front - rear)
				})
			}

			
			// Save data
			const prodidentity = await modelsStatic.serverDB.query(
				`SELECT lotno, prod_order FROM aio_iot_oci2.mst_prodidentity
				WHERE isActive = 'ACTIVE'
				ORDER BY id DESC
				LIMIT 1`
			);
			
			const bulkData = payload.map(item => ({
				lotno: prodidentity ? prodidentity[0][0].lotno : null,
				pro: prodidentity ? prodidentity[0][0].prod_order : null,
				epochtime: item.epochtime,
				counter: item.counter,
				front: item.front,
				rear: item.rear,
				delta: item.delta,
			}));

			const result = await modelsStatic.db.frontRearBpdOci2.bulkCreate(bulkData);

			console.log(`Front Rear BPD OCI2: ${result.length} records inserted at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
		}
		lastRejectCountOci2 = currentRejectCount;
	} catch (err) {
		console.error(err)
	} finally {
		isFrontRearOci2Running = false;
	}
}

let lastTotalProductionBottleOci2 = -1;
let isProcessTimeCapperOci2Running = false;

async function processTimeCapperOci2() {
    if (isProcessTimeCapperOci2Running) {
        console.log("Process production bottle OCI2 is still running, new request is ignored.");
        return;
    }

    isProcessTimeCapperOci2Running = true;

    try {
        const threshold = 20;
        const currentProductionBottle = await OPCUA.readValue(modelOCI2.production_bottle.node);

        // Reset condition check
        if (lastTotalProductionBottleOci2 < 0 || lastTotalProductionBottleOci2 > currentProductionBottle) {
            lastTotalProductionBottleOci2 = currentProductionBottle;
            return;
        }

        // Calculate bottles produced
        const bottlesProduced = currentProductionBottle - lastTotalProductionBottleOci2;
        if (bottlesProduced >= threshold) {
            const keys = Array.from({ length: 20 }, (_, i) => i + 1);
            const finStepPulses = keys.map(i => modelOCI2.procest_time_capper[`fin_step_pulse_${i}`].node);
            const procesPulses = keys.map(i => modelOCI2.procest_time_capper[`proces_pulse_${i}`].node);
            const procesTimes = keys.map(i => modelOCI2.procest_time_capper[`proces_time_${i}`].node);
            const tighteningTorques = keys.map(i => modelOCI2.procest_time_capper[`tightening_torque_${i}`].node);

            const [finStepPulseValues, procesPulseValues, procesTimeValues, tighteningTorqueValues] = await Promise.all([
                Promise.all(finStepPulses.map(OPCUA.readValue)),
                Promise.all(procesPulses.map(OPCUA.readValue)),
                Promise.all(procesTimes.map(OPCUA.readValue)),
                Promise.all(tighteningTorques.map(OPCUA.readValue))
            ]);

            // Fetch production identity
            const [prodidentity] = await modelsStatic.serverDB.query(
                `SELECT lotno, prod_order FROM aio_iot_oci2.mst_prodidentity
                WHERE isActive = 'ACTIVE'
                ORDER BY id DESC
                LIMIT 1`
            );

            const date = new Date();
            const productionData = {
                lotno: prodidentity[0]?.lotno || null,
                pro: prodidentity[0]?.prod_order || null,
                epochtime: date.getTime() / 1000,
                ...Object.fromEntries(keys.map((i, idx) => [`fin_step_pulse_${i}`, finStepPulseValues[idx]])),
                ...Object.fromEntries(keys.map((i, idx) => [`proces_pulse_${i}`, procesPulseValues[idx]])),
                ...Object.fromEntries(keys.map((i, idx) => [`proces_time_${i}`, procesTimeValues[idx]])),
                ...Object.fromEntries(keys.map((i, idx) => [`tightening_torque_${i}`, tighteningTorqueValues[idx]]))
            };

			await modelsStatic.db.processTimeCapperOci2.create(productionData);
            console.log(`Bottles Produced: ${bottlesProduced}`);

            lastTotalProductionBottleOci2 = currentProductionBottle;
        }
    } catch (err) {
        console.error('Error production bottle oci2:', err);
    } finally {
        isProcessTimeCapperOci2Running = false;
    }
}

async function bpdoc2() {
	try {
		let BPDOC2Top10Arr = [];
		let BPDOC2AllArr = [];
		let counter = 0;
		let getLastCounter = await modelsStatic.db.bpd_oc2
			.findAll({
				attributes: ['counter', 'lotno2'],
				where: {
					lotno2: {
						$not: 'change lot'
					}
				},
				limit: 1,
				order: [['id', 'DESC']]
			});

		// |--------- Initalize model to be used on this table --------------
		var model = modelOCI2.BPD_OC2;
		var i = 0;
		// | Get identity from table (2 mean OCI2)
		var identity = OPCUA.getIdentity('2');

		var time = moment().format('YYYY-MM-DD HH:mm:ss');		

		if (getLastCounter.length > 0 && identity.lotno == getLastCounter[0].lotno2) {
			counter = getLastCounter[0].counter;
		} 

		// | Looping properties
		for (var key of Object.keys(model)) {
			var nodeVal = model[key].value;
			if (nodeVal) {
				// push for first ten value
				if (i <= 9) {
					// console.log(nodeVal);
					BPDOC2Top10Arr.push(nodeVal);
				}

				// console.log(nodeVal);

				BPDOC2AllArr.push(nodeVal);
				if (!tempStatus2) {
					BPDOC2Temp.push(nodeVal);
				}
				
				i++;
			}
		}

		if (tempStatus2) {
			const equals = (a, b) =>
			a.length === b.length &&
			a.every((v, i) => v === b[i]);

			tempStatus2 = equals(BPDOC2AllArr, BPDOC2Temp);
			// console.log(tempStatus2);
		}

		if (BPDOC2Top10Arr.length == 10 && BPDOC2AllArr.length == 20 && !tempStatus2) {
			let reverse = BPDOC2Top10Arr.reverse();
			
			let sum = 0;

			reverse.forEach(x => {
				if (identity.lotno == 'change lot') {
					counter = 0;
				} else {
					counter++;
				}

				sum += x
			});

			// console.log('sum: ', sum);
			// console.log('data: ', reverse.length);
			let avg = sum / reverse.length;

			// console.log(avg);
			
			let obj = {
				value: reverse.toString(),
				avg: avg,
				min: Math.min(...reverse),
				max: Math.max(...reverse),
				epochtime: Math.floor( new Date(time) / 1000 ),
				counter: counter,
				time: time,
				lotno2: identity.lotno,
				prod_order2: identity.prod_order
			}

			// console.log(obj);

			// set temp
			tempStatus2 = true;
			BPDOC2Temp = BPDOC2AllArr;

			await modelsStatic.db.bpd_oc2.create(obj);
			console.log('bpdoc2' + ' at ' + time + ' inserted');
			
		}

		// | Logging table, column and value
		// logValues('bpdoc2', [], BPDOC2AllArr, new Date());
	} catch (error) {
		console.log(error);
	}	
}
async function bpdoc1() {
	try {
		let BPDOC1Top10Arr = [];
		let BPDOC1AllArr = [];
		let counter = 0;
		let getLastCounter = await modelsStatic.db.bpdoc1
			.findAll({
				attributes: ['counter', 'lotno1'],
				where: {
					lotno1: {
						$not: 'change lot'
					}
				},
				limit: 1,
				order: [['id', 'DESC']]
			});

		// |--------- Initalize model to be used on this table --------------
		var model = modelOCI1.BPDOC1;
		var i = 0;
		// | Get identity from table (1 mean OCI1)
		var identity = OPCUA.getIdentity('1');

		var time = moment().format('YYYY-MM-DD HH:mm:ss');

		if (getLastCounter.length > 0 && identity.lotno == getLastCounter[0].lotno1) {
			counter = getLastCounter[0].counter;
		} 

		// | Looping properties
		for (var key of Object.keys(model)) {
			var nodeVal = model[key].value;
			if (nodeVal) {

				// push for first ten value
				if (i <= 9) {
					// console.log(nodeVal);
					BPDOC1Top10Arr.push(nodeVal);
				}

				// console.log(nodeVal);

				BPDOC1AllArr.push(nodeVal);
				if (!tempStatus1) {
					// console.log('masuk push temp awal');
					BPDOC1Temp.push(nodeVal);
				}
				
				i++;
			}
		}

		if (tempStatus1) {
			const equals = (a, b) =>
			a.length === b.length &&
			a.every((v, i) => v === b[i]);

			tempStatus1 = equals(BPDOC1AllArr, BPDOC1Temp);
			// console.log(tempStatus1);
		}

		if (BPDOC1Top10Arr.length == 10 && BPDOC1AllArr.length == 20 && !tempStatus1) {
			let reverse = BPDOC1Top10Arr.reverse();

			let sum = 0;

			reverse.forEach(x => {
				if (identity.lotno == 'change lot') {
					counter = 0;
				} else {
					counter++;
				}

				sum += x;
			});

			// console.log('sum: ', sum);
			// console.log('data: ', reverse.length);
			let avg = sum / reverse.length;

			// console.log(avg);

			let obj = {
				value: reverse.toString(),
				avg: avg,
				min: Math.min(...reverse),
				max: Math.max(...reverse),
				epochtime: Math.floor( new Date(time) / 1000 ),
				counter: counter,
				time: time,
				lotno1: identity.lotno,
				prod_order1: identity.prod_order
			}

			// console.log(obj);

			// set temp
			tempStatus1 = true;
			BPDOC1Temp = BPDOC1AllArr;

			await modelsStatic.db.bpdoc1.create(obj);
			console.log('bpdoc1' + ' at ' + time + ' inserted');
			
		}

		// | Logging table, column and value
		// logValues('bpdoc1', [], BPDOC1AllArr, new Date());
	} catch (error) {
		console.log(error);
	}	
}
async function cttn_ln2keyence1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cttn_ln2keyence1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ln2keyence1',model, identity, time);
	//checkPreAlarm('cttn_ln2keyence1', model, identity, time);
	// | Inserting data to database
	insertIntoDatabase('cttn_ln2keyence1', columns, value, time);
	// delete last element from table
	//deleteFromDatabase('cttn_ln2keyence1');
}
async function cttn_ln2keyence2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cttn_ln2keyence2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_ln2keyence2',model, identity, time);
	//checkPreAlarm('cttn_ln2keyence2', model, identity, time);
	// | Inserting data to database
	insertIntoDatabase('cttn_ln2keyence2', columns, value, time);
	// delete last element from table
	//deleteFromDatabase('cttn_ln2keyence2');
}
async function cttn_injeksi1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cttn_injeksi1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		// console.log('oioi1', key);
		var nodeVal = model[key].value;
		// console.log('oi ori', nodeVal);

		//console.log('cttn_injeksi1', typeof nodeVal);
		//console.log("cttn_injeksi1 value", nodeVal);
		if(nodeVal === undefined) {

			nodeVal = 'NULL'
		}

		if (typeof nodeVal == 'object') {
			nodeVal = nodeVal && nodeVal.length > 0 ? nodeVal[1] : null;
			// console.log('oioi', nodeVal);
		}

		if (typeof nodeVal === 'string') {
			// console.log('string oiii', nodeVal);
			nodeVal = "'" + nodeVal + "'";
		}

		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_injeksi1',model, identity, time);
	//checkPreAlarm('cttn_injeksi1', model, identity, time);
	// | Inserting data to database
	insertIntoDatabase('cttn_injeksi1', columns, value, time);
	// delete last element from table
	//deleteFromDatabase('cttn_injeksi1');
}
async function cttn_injeksi2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cttn_injeksi2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		// console.log('oioi2', key);
		var nodeVal = model[key].value;
		// console.log('oi2 ori', nodeVal);

		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}

		if (typeof nodeVal == 'object') {
			nodeVal = nodeVal && nodeVal.length > 0 ? nodeVal[1] : null;
			//console.log('oioi', nodeVal);
		}

		if (typeof nodeVal === 'string') {
			//console.log('string oiii', nodeVal);
			nodeVal = "'" + nodeVal + "'";
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_injeksi2',model, identity, time);
	//checkPreAlarm('cttn_injeksi2', model, identity, time);
	// | Inserting data to database
	insertIntoDatabase('cttn_injeksi2', columns, value, time);
	// delete last element from table
	//deleteFromDatabase('cttn_injeksi2');
}

let previousAlarmState = null; // Variabel penyimpan state terakhir

async function alarm_valve_iwai () {
  /* |--------- Initalize model to be used on this table -------------- */
  var model = modelOCI2.alarm_valve_iwai;
  /* |---------Get all column from table------------ */
  var columns = OPCUA.getColumns(model);
  // | adding additional field
  columns.push('epochtime');
  columns.push('time');
  columns.push('plc_time');
  columns.push('lotno2');
  columns.push('prod_order2');
  // |---------Get All value from OPCUA------------
  var value = [];
  // | Looping properties
  for (var key of Object.keys(model)) {
    var nodeVal = model[key].value;
    if(nodeVal === undefined) {
      nodeVal = 'NULL'
    }
    value.push(nodeVal);
  }
  
  // |----- LOGIKA PENGECEKAN PERUBAHAN DATA (ON-CHANGE) -----
  let currentStateString = JSON.stringify(value);
  if (previousAlarmState === currentStateString) {
    // Jika datanya sama persis dengan detik sebelumnya, hentikan eksekusi di sini (tidak di-insert ke DB)
    return;
  }
  // Jika beda, update nilai state terakhir dengan yang baru
  previousAlarmState = currentStateString;
  // |---------------------------------------------------------

  // | Get identity from table (2 mean OCI2)
  var identity = OPCUA.getIdentity('2');
  // | Set ID for data (different between PLC time and local time is 5 seconds)
  var time = moment().format('YYYY-MM-DD HH:mm:ss');
  // | Adding value for additional field, the order must be the same
  value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
  value.push("'" + time + "'"); //time (fixed space)
  value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time (fixed space)
  value.push("'" + identity.lotno + "'"); //lotno (fixed space)
  value.push("'" + identity.prod_order + "'"); //prod_order (fixed space)
  
  // | Logging table, column and value
  // logValues('alarm_valve_iwai', columns, value, time);
  
  // | Inserting data to database
  insertIntoDatabase('alarm_valve_iwai', columns, value, time);
}

async function ppi_ilb_filler_1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.ppi_ilb_filler;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller1', columns, value, time);
	//console.log("INSERT INTO " + 'ppi_ilbfiller1' + " (" + columns.toString() + ") VALUES (" + value.toString() + ")");
	// | Checking all outspec value
	checkOutspecValue('ppi_ilbfiller1',model, identity, time);
	checkPreAlarm('ppi_ilbfiller1', model, identity, time);
	// | Inserting data to database
	insertIntoDatabase('ppi_ilbfiller1', columns, value, time);
	// delete last element from table
	//deleteFromDatabase('ppi_ilbfiller1');	
}
async function cttn_prod_area_filling1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cttn_prod_area_filling;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_prod_area_filling1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('cttn_prod_area_filling1', model, identity, time)
	checkPreAlarm('cttn_prod_area_filling1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_prod_area_filling1', columns, value, time);
	deleteFromDatabase('cttn_prod_area_filling1');
}
async function ppi_ilb_filler_2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.ppi_ilb_filler;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('ppi_ilbfiller2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('ppi_ilbfiller2', model, identity, time)
	checkPreAlarm('ppi_ilbfiller2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('ppi_ilbfiller2', columns, value, time);
	deleteFromDatabase('ppi_ilbfiller2');
}
async function cttn_prod_area_filling2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cttn_prod_area_filling;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_prod_area_filling2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('cttn_prod_area_filling2', model, identity, time)
	checkPreAlarm('cttn_prod_area_filling2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_prod_area_filling2', columns, value, time);
	deleteFromDatabase('cttn_prod_area_filling2');
}
async function blow1util() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.blow1util;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow1util', columns, value, time);
	// | Checking all outspec value
	//checkPreAlarm('blow1util', model, identity, time)
	//checkOutspecValue('cttn_prod_area_filling2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('blow1util', columns, value, time);
	deleteFromDatabase('blow1util');
}
async function blow2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.blow2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow1util', columns, value, time);
	// | Checking all outspec value
	//checkPreAlarm('blow2', model, identity, time);
	//checkOutspecValue('cttn_prod_area_filling2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('blow2', columns, value, time);
	deleteFromDatabase('blow2');
}
async function timer_plc_filler1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.timer_plc_filler1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	// | Logging table, column and value
	//logValues('blow1util', columns, value, time);
	// | Checking all outspec value
	//checkPreAlarm('blow1util', model, identity, time)
	//checkOutspecValue('cttn_prod_area_filling2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('timer_plc_filler1', columns, value, time);
	//deleteFromDatabase('timer_plc_filler1');
}
async function timer_plc_filler2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.timer_plc_filler2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	// | Logging table, column and value
	//logValues('blow1util', columns, value, time);
	// | Checking all outspec value
	//checkPreAlarm('blow2', model, identity, time);
	//checkOutspecValue('cttn_prod_area_filling2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('timer_plc_filler2', columns, value, time);
	//deleteFromDatabase('timer_plc_filler2');
}
async function cttn_rejectionoc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cttn_rejectionoc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_rejectionoc1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('cttn_rejectionoc1', model, identity, time)
	checkPreAlarm('cttn_rejectionoc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_rejectionoc1', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc1');
}
async function camera_inline() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.camera_inline;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('camera_inline', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('camera_inline', model, identity, time)
	checkPreAlarm('camera_inline', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('camera_inline', columns, value, time);
	//deleteFromDatabase('camera_inline');
}
async function cttn_rejectionoc2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cttn_rejectionoc2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('cttn_rejectionoc2', model, identity, time)
	checkPreAlarm('cttn_rejectionoc2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_rejectionoc2', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function label_oci2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.label_oci2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('label_oci2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('label_oci2', model, identity, time)
	checkPreAlarm('label_oci2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('label_oci2', columns, value, time);
	//deleteFromDatabase('label_oci2');
}
async function cttn_caser1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cttn_caser1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_caser2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('cttn_caser2', model, identity, time)
	//checkPreAlarm('cttn_caser2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_caser1', columns, value, time);
	//deleteFromDatabase('cttn_caser2');
}
async function cttn_caser2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cttn_caser2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_caser2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('cttn_caser2', model, identity, time)
	checkPreAlarm('cttn_caser2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cttn_caser2', columns, value, time);
	//deleteFromDatabase('cttn_caser2');
}
async function filler_add1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.filler_add1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');

	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time

	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('filler_add1', model, identity, time)
	checkPreAlarm('filler_add1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('filler_add1', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function filler_add2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.filler_add2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');

	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('filler_add2', model, identity, time)
	checkPreAlarm('filler_add2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('filler_add2', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function filler_add2_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.filler_add2_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('filler_add2_min', model, identity, time)
	checkPreAlarm('filler_add2_min', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('filler_add2_min', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function prep_add1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.prep_add1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('prep_add1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('prep_add1', model, identity, time)
	checkPreAlarm('prep_add1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('prep_add1', columns, value, time);
	//deleteFromDatabase('prep_add1');
}
async function prep_add2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.prep_add2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('prep_add2', model, identity, time)
	checkPreAlarm('prep_add2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('prep_add2', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function prep_add1_mtc_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.prep_add1_mtc_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('prep_add1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('prep_add1_mtc_min', model, identity, time)
	checkPreAlarm('prep_add1_mtc_min', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('prep_add1_mtc_min', columns, value, time);
	//deleteFromDatabase('prep_add1');
}
async function prep_add2_mtc_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.prep_add2_mtc_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('prep_add2_mtc_min', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function hvac1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.hvac1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	//console.log('hvac1 oioioioiroioior')
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
	    //console.log('hvac1', nodeVal)
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('hvac1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('hvac1', model, identity, time)
	//checkPreAlarm('hvac1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('hvac1', columns, value, time);
	//deleteFromDatabase('hvac1');
}
async function hvac2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.hvac2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log('hvac2', nodeVal)
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('hvac2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('hvac2', model, identity, time)
	//checkPreAlarm('hvac2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('hvac2', columns, value, time);
	//deleteFromDatabase('hvac2');
}
async function blow_add1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.blow_add1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add1', columns, value, time);
	// console.log('blow1', value);
	// | Checking all outspec value
	checkOutspecValue('blow_add1', model, identity, time)
	checkPreAlarm('blow_add1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('blow_add1', columns, value, time);
	//deleteFromDatabase('blow_add1');
}
async function vibration_oci1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.vibration_oci1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci1', columns, value, time);
	//console.log('blow1', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci1', model, identity, time)
	//checkPreAlarm('vibration_oci1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vibration_oci1', columns, value, time);
	//deleteFromDatabase('vibration_oci1');
}
async function vibration_oci2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.vibration_oci2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2', model, identity, time)
	//checkPreAlarm('vibration_oci2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vibration_oci2', columns, value, time);
	//deleteFromDatabase('vibration_oci2');
}

async function vibration_oc1_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.vibration_oc1_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('ms');
	columns.push('modify');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push(0); //ms
	value.push(0); //modify
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Inserting data to database
	insertIntoDatabase('vibration_oc1_min', columns, value, time);
}


async function vibration_oci2_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.vibration_oci2_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2_min', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2_min', model, identity, time)
	//checkPreAlarm('vibration_oci2_min', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vibration_oci2_min', columns, value, time);
	//deleteFromDatabase('vibration_oci2_min');
}
async function blow_add2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.blow_add2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('blow_add2', model, identity, time)
	checkPreAlarm('blow_add2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('blow_add2', columns, value, time);
	//deleteFromDatabase('blow_add2');
}
async function presco1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.presco1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// console.log("auuuuuuauauauau",columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log("we", nodeVal);
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		if (typeof nodeVal === 'string') {
			// console.log('string oiii', nodeVal);
			nodeVal = "'" + nodeVal + "'";
		}

		if (nodeVal instanceof Date) {
			// console.log('date oiiiii', nodeVal);
			nodeVal =  "'" + moment(nodeVal).format('YYYY-MM-DD HH:mm:ss') + "'";
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	// logValues('presco1', columns, value, time);
	// | Checking all outspec value
	// checkOutspecValue('presco1', model, identity, time)
	// checkPreAlarm('presco1', model, identity, time)
	// | Inserting data to database
	// console.log(columns);
	insertIntoDatabase('presco1', columns, value, time);
	//deleteFromDatabase('presco1');
}
async function presco2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.presco2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// console.log("auuuuuuauauauau",columns);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		// console.log("we", nodeVal);
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		if (typeof nodeVal === 'string') {
			// console.log('string oiii', nodeVal);
			nodeVal = "'" + nodeVal + "'";
		}

		if (nodeVal instanceof Date) {
			// console.log('date oiiiii', nodeVal);
			nodeVal =  "'" + moment(nodeVal).format('YYYY-MM-DD HH:mm:ss') + "'";
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	// logValues('presco2', columns, value, time);
	// | Checking all outspec value
	// checkOutspecValue('presco2', model, identity, time)
	// checkPreAlarm('presco2', model, identity, time)
	// | Inserting data to database
	// console.log(columns);
	insertIntoDatabase('presco2', columns, value, time);
	//deleteFromDatabase('presco2');
}
async function k6pm_cap_checker_oc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.k6pm_cap_checker_oc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');

	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('k6pm_cap_checker_oc1', model, identity, time)
	checkPreAlarm('k6pm_cap_checker_oc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('k6pm_cap_checker_oc1', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function k6pm_kroness1_oc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.k6pm_kroness1_oc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');

	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_rejectionoc2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('k6pm_kroness1_oc1', model, identity, time)
	checkPreAlarm('k6pm_kroness1_oc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('k6pm_kroness1_oc1', columns, value, time);
	//deleteFromDatabase('cttn_rejectionoc2');
}
async function label_oci1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.label_oci1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	// console.log(time);
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('pre_alarm1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('label_oci1', model, identity, time)
	checkPreAlarm('label_oci1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('label_oci1', columns, value, time);
	//deleteFromDatabase('pre_alarm1');
}
async function pre_alarm1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.pre_alarm1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	// console.log(time);
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('pre_alarm1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('pre_alarm1', model, identity, time)
	checkPreAlarm('pre_alarm1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('pre_alarm1', columns, value, time);
	//deleteFromDatabase('pre_alarm1');
}
async function pre_alarm2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.pre_alarm2;
	
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('pre_alarm2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('pre_alarm2', model, identity, time)
	checkPreAlarm('pre_alarm2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('pre_alarm2', columns, value, time);
	//deleteFromDatabase('pre_alarm2');
}
async function cb1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.cb1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2_min', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2_min', model, identity, time)
	//checkPreAlarm('vibration_oci2_min', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('cb1', model, identity, time)
	checkPreAlarm('cb1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cb1', columns, value, time);
	//deleteFromDatabase('vibration_oci2_min');
}
async function cb2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.cb2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2_min', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2_min', model, identity, time)
	//checkPreAlarm('vibration_oci2_min', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('cb2', model, identity, time)
	checkPreAlarm('cb2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('cb2', columns, value, time);
	//deleteFromDatabase('vibration_oci2_min');
}
async function flow_nozzle_filler1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.flow_nozzle_filler1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	// console.log(time);
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('flow_nozzle_filler1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('flow_nozzle_filler1', model, identity, time)
	checkPreAlarm('flow_nozzle_filler1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('flow_nozzle_filler1', columns, value, time);
	//deleteFromDatabase('flow_nozzle_filler1');
}

async function flow_nozzle_filler1_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.flow_nozzle_filler1_min;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	// console.log(time);
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('flow_nozzle_filler1_min', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('flow_nozzle_filler1_min', model, identity, time)
	checkPreAlarm('flow_nozzle_filler1_min', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('flow_nozzle_filler1_min', columns, value, time);
	//deleteFromDatabase('flow_nozzle_filler1');
}

async function flow_nozzle_filler2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.flow_nozzle_filler2;
	
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('flow_nozzle_filler2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('flow_nozzle_filler2', model, identity, time)
	checkPreAlarm('flow_nozzle_filler2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('flow_nozzle_filler2', columns, value, time);
	//deleteFromDatabase('flow_nozzle_filler2');
}
async function flow_nozzle_filler2_min() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.flow_nozzle_filler2_min;
	
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('flow_nozzle_filler2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('flow_nozzle_filler2_min', model, identity, time)
	checkPreAlarm('flow_nozzle_filler2_min', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('flow_nozzle_filler2_min', columns, value, time);
	//deleteFromDatabase('flow_nozzle_filler2');
}

async function current_cv_pack1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.current_cv_pack1;
	
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('current_cv_pack2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('current_cv_pack1', model, identity, time)
	checkPreAlarm('current_cv_pack1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('current_cv_pack1', columns, value, time);
	//deleteFromDatabase('current_cv_pack2');
}
async function current_cv_pack2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.current_cv_pack2;
	
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	columns.push('mode_hvac');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order

	if (model.Mode_CSIOP.value == 1) value.push(1);
	else if (model.Mode_Formalin.value == 1) value.push(2);
	else if (model.Mode_H2O2.value == 1) value.push(3);
	else if (model.Mode_Nightime.value == 1) value.push(4);
	else if (model.Mode_Production.value == 1) value.push(5);
	else value.push(0);
	// | Logging table, column and value
	//logValues('current_cv_pack2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('current_cv_pack2', model, identity, time)
	checkPreAlarm('current_cv_pack2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('current_cv_pack2', columns, value, time);
	//deleteFromDatabase('current_cv_pack2');
}
async function piovan1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.piovan1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add1', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('piovan1', model, identity, time)
	checkPreAlarm('piovan1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('piovan1', columns, value, time);
	//deleteFromDatabase('blow_add1');
}
async function piovan2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.piovan2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	checkOutspecValue('piovan2', model, identity, time)
	checkPreAlarm('piovan2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('piovan2', columns, value, time);
	//deleteFromDatabase('blow_add2');
}


let previousValveIwaiOc2State = null; // Variabel penyimpan state terakhir

async function valve_iwai_oc2() {
  /* |--------- Initalize model to be used on this table -------------- */
  var model = modelOCI2.valve_iwai_oc2;
  /* |---------Get all column from table------------ */
  var columns = OPCUA.getColumns(model);
  // | adding additional field
  columns.push('epochtime');
  columns.push('time');
  columns.push('plc_time');
  columns.push('lotno2');
  columns.push('prod_order2');
  // |---------Get All value from OPCUA------------
  var value = [];
  // | Looping properties
  for (var key of Object.keys(model)) {
    var nodeVal = model[key].value;
    if(nodeVal === undefined) {
      nodeVal = 'NULL'
    }
    value.push(nodeVal);
  }
  
  // |----- LOGIKA PENGECEKAN PERUBAHAN DATA (ON-CHANGE) -----
  let currentStateString = JSON.stringify(value);
  if (previousValveIwaiOc2State === currentStateString) {
    // Jika datanya sama persis dengan detik sebelumnya, hentikan eksekusi di sini
    return;
  }
  // Jika beda, update nilai state terakhir dengan yang baru
  previousValveIwaiOc2State = currentStateString;
  // |---------------------------------------------------------

  // | Get identity from table (2 mean OCI2)
  var identity = OPCUA.getIdentity('2');
  // | Set ID for data
  var time = moment().format('YYYY-MM-DD HH:mm:ss');
  // | Adding value for additional field, the order must be the same
  value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
  value.push("'" + time + "'"); //time
  value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
  value.push("'" + identity.lotno + "'"); //lotno
  value.push("'" + identity.prod_order + "'"); //prod_order
  
  // | Inserting data to database
  insertIntoDatabase('valve_iwai_oc2', columns, value, time);
}

let previousAlarmAuhtOc2State = null;

async function alarm_auht_oc2() {
  /* |--------- Initalize model to be used on this table -------------- */
  var model = modelOCI2.alarm_auht_oc2;
  /* |---------Get all column from table------------ */
  var columns = OPCUA.getColumns(model);
  // | adding additional field
  columns.push('epochtime');
  columns.push('time');
  columns.push('plc_time');
  columns.push('lotno2');
  columns.push('prod_order2');
  // |---------Get All value from OPCUA------------
  var value = [];
  // | Looping properties
  for (var key of Object.keys(model)) {
    var nodeVal = model[key].value;
    if(nodeVal === undefined) {
      nodeVal = 'NULL'
    }
    value.push(nodeVal);
  }
  
  // |----- LOGIKA PENGECEKAN PERUBAHAN DATA (ON-CHANGE) -----
  // Cegah insert jika ADA data yang masih 'NULL' (karena PLC belum selesai merespon semua tag saat startup)
  if (value.includes('NULL')) {
    return;
  }

  let currentStateString = JSON.stringify(value);
  if (previousAlarmAuhtOc2State === currentStateString) {
    // Jika datanya sama persis dengan detik sebelumnya, hentikan eksekusi di sini (tidak di-insert ke DB)
    return;
  }
  // Jika beda, update nilai state terakhir dengan yang baru
  previousAlarmAuhtOc2State = currentStateString;
  // |---------------------------------------------------------

  // | Get identity from table (2 mean OCI2)
  var identity = OPCUA.getIdentity('2');
  // | Set ID for data (different between PLC time and local time is 5 seconds)
  var time = moment().format('YYYY-MM-DD HH:mm:ss');
  // | Adding value for additional field, the order must be the same
  value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
  value.push("'" + time + "'"); //time (fixed space)
  value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time (fixed space)
  value.push("'" + identity.lotno + "'"); //lotno (fixed space)
  value.push("'" + identity.prod_order + "'"); //prod_order (fixed space)
  
  // | Inserting data to database
  insertIntoDatabase('alarm_auht_oc2', columns, value, time);
}

async function status_prod1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.status_prod;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_prod_area_filling1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('status_prod1', model, identity, time)
	//checkPreAlarm('status_prod1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('status_prod1', columns, value, time);
	//deleteFromDatabase('status_prod1');
}
async function status_prod2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.status_prod;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (1 mean OCI1)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('cttn_prod_area_filling1', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('status_prod1', model, identity, time)
	//checkPreAlarm('status_prod1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('status_prod2', columns, value, time);
	//deleteFromDatabase('status_prod1');
}
async function kanesho_oc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.kanesho_oc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('kanesho_oc1', model, identity, time)
	checkPreAlarm('kanesho_oc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('kanesho_oc1', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function kanesho_oc2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.kanesho_oc2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2_min', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2_min', model, identity, time)
	//checkPreAlarm('vibration_oci2_min', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('kanesho_oc2', model, identity, time)
	checkPreAlarm('kanesho_oc2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('kanesho_oc2', columns, value, time);
	//deleteFromDatabase('vibration_oci2_min');
}
async function vibration_ffu_blow1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.vibration_ffu_blow1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('vibration_ffu_blow1', model, identity, time)
	checkPreAlarm('vibration_ffu_blow1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vibration_ffu_blow1', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function counter_area_packingoc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.counter_area_packingoc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('counter_area_packingoc1', model, identity, time)
	checkPreAlarm('counter_area_packingoc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('counter_area_packingoc1', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function packing_oc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.packing_oc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	//columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('packing_oc1', model, identity, time)
	checkPreAlarm('packing_oc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('packing_oc1', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function packing_oc2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.packing_oc2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	//columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('blow_add2', columns, value, time);
	// | Checking all outspec value
	//checkOutspecValue('prep_add2', model, identity, time)
	//checkPreAlarm('prep_add2', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('packing_oc2', model, identity, time)
	checkPreAlarm('packing_oc2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('packing_oc2', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function vphp_oc1() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI1.vphp_oc1;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno1');
	columns.push('prod_order1');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('1');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	checkOutspecValue('vphp_oc1', model, identity, time)
	checkPreAlarm('vphp_oc1', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vphp_oc1', columns, value, time);
	//deleteFromDatabase('prep_add2');
}
async function vphp_oc2() {
	// |--------- Initalize model to be used on this table --------------
	var model = modelOCI2.vphp_oc2;
	// |---------Get all column from table------------
	var columns = OPCUA.getColumns(model);
	// | adding additional field
	columns.push('epochtime');
	columns.push('time');
	columns.push('plc_time');
	columns.push('lotno2');
	columns.push('prod_order2');
	// |---------Get All value from OPCUA------------
	var value = [];
	// | Looping properties
	for (var key of Object.keys(model)) {
		var nodeVal = model[key].value;
		if(nodeVal === undefined) {
			nodeVal = 'NULL'
		}
		value.push(nodeVal);
	}
	// | Get identity from table (2 mean OCI2)
	var identity = OPCUA.getIdentity('2');
	// | Set ID for data (different between PLC time and local time is 5 seconds)
	var time = moment().format('YYYY-MM-DD HH:mm:ss');
	// | Adding value for additional field, the order must be the same
	value.push("UNIX_TIMESTAMP ('" + time + "')"); // epochtime
	value.push("'" + time + "'"); //time
	value.push("'" + moment(system.time.CurrentTime.value).tz('ETC/GMT').format('YYYY-MM-DD HH:mm:ss') + "'"); //plc_time
	value.push("'" + identity.lotno + "'"); //lotno
	value.push("'" + identity.prod_order + "'"); //prod_order
	// | Logging table, column and value
	//logValues('vibration_oci2_min', columns, value, time);
	//console.log('blow2', value);
	// | Checking all outspec value
	//checkOutspecValue('vibration_oci2_min', model, identity, time)
	//checkPreAlarm('vibration_oci2_min', model, identity, time)
	// | Checking all outspec value
	checkOutspecValue('vphp_oc2', model, identity, time)
	checkPreAlarm('vphp_oc2', model, identity, time)
	// | Inserting data to database
	insertIntoDatabase('vphp_oc2', columns, value, time);
	//deleteFromDatabase('vibration_oci2_min');
}
// ---------------------------------------------------------------------------------
function insertIntoDatabase(table, columns, data, time) {
	let checked = checkNullValue(columns, data);
	modelsStatic.localDB.query(
	    "INSERT INTO " + table + " (" + checked.columns.toString() + ") VALUES (" + checked.data.toString() + ")", {
	    	type: modelsStatic.localDB.QueryTypes.INSERT
	    })
	.then(function (result) {
		//console.log(table + 'oioi')
		console.log(table + ' at ' + time + ' inserted');
		// delete last element from table
		//deleteFromDatabase(table);
	})
	.catch(function(e) {
		console.log(table + ' : ', e);
		console.log(table + ' : Error ' + e.message);
	});
}

function checkNullValue(columns, data) {
	let newColumn = [];
	let newData = [];
	columns.forEach((x, i) => {
		if (data[i] !== null) {
			newColumn.push(x);
			newData.push(data[i])
		}
	})
	return {
		data: newData,
		columns: newColumn
	}
}

function logValues(table, columns, data, time) {
	console.log(table);
	//console.log(columns.toString());
	console.log(data.toString());
}

function deleteFromDatabase(table) {
	// console.log(table + " deleted");
	// modelsStatic.localDB.query(
	//     "DELETE FROM " + table + " ORDER BY epochtime LIMIT 1", {
	//     	type: modelsStatic.localDB.QueryTypes.DELETE
	//     })
	// .then(function (result) {});
}

function checkOutspecValue(table, object, identity, time) {
	for (var key of Object.keys(object)) {
		var element = object[key];
		//checking is threshold available
		if (element.threshold !== undefined) {
			var response = {};
			// get element threshold by its setting 
			var threshold = getThreshold(element, identity, 'ccp');
			// checking min max value
			response = checkMinMax(threshold, element.value);
			// Adding some properties
			response.table = table;
			response.field = element.column;
			response.value = element.value;
			response.time = time;
			response.status_value = element.status_value;
			response.value_update = element.last_update;
			if (!response.normal) {
				// Checking alert_count
				if (element.alert_count === undefined) {
					element.alert_count = 0;
				}
				// Increment alert count
				element.alert_count++;
				response.alert_count = element.alert_count;
				// IF DATA OUTSPEC MORE THAN 3 SECONDS
				var lineprod = system.OCI1mode;
				if(table.includes('2')) {
					lineprod = system.OCI2mode;
				}
				const production_mode = lineprod.value;
				if (response.alert_count === 4 && identity.prod_order != 0 && production_mode) {
					// DATA IS OUTSPEC
					insertAlert(response, identity);
					//reset to 0
					delete element.alert_count;
				}
				//console.log(response);
			} else {
				delete element.alert_count;
			}
		}
	}
}

function checkPreAlarm(table, object, identity, time) {
	for (var key of Object.keys(object)) {
		var element = object[key];
		//checking is threshold available
		if (element.prealarm !== undefined) {
			var response = {};
			// get element threshold by its setting 
			var threshold = getThreshold(element, identity, 'prealarm');
			//console.log(element);
			// checking min max value
			response = checkMinMax(threshold, element.value);
			// Adding some properties
			response.name = element.alarmname;
			response.state = 'alerting';
			response.metric = element.column;
			response.value = element.value;
			response.alarm_date = time;
			response.linesection = element.linesection;
			response.url = element.url;
			if (!response.normal) {
				// Checking alert_count
				if (element.prealert_count === undefined) {
					element.prealert_count = 0;
				}
				// Increment alert count
				element.prealert_count++;
				response.prealert_count = element.prealert_count;
				// IF DATA OUTSPEC MORE THAN 3 SECONDS
				var lineprod = system.OCI1mode;
				if(table.includes('2')) {
					lineprod = system.OCI2mode;
				}
				const production_mode = lineprod.value;
				if (response.prealert_count === 3 && identity.prod_order != 0 && production_mode) {
				// if (identity.prod_order != 0 && production_mode) {
					//socketIO.emit('notification', {path: 'notification', message: response.name, linesection: response.linesection});
					// DATA IS OUTSPEC
					insertPreAlarm(response, identity);
					//reset to 0
					delete element.prealert_count;
				}
				//console.log(response);
			} else {
				delete element.prealert_count;
			}
		}
	}
}

function getThreshold(element, identity, type) {
	var threshold;
	var identityField = [];
	var elementThreshold = element.threshold;
	//console.log(elementThreshold);
	if (type === 'prealarm') {
		elementThreshold = element.prealarm;
	}
	if (element.identity) {
		identityField = element.identity.split(',');
	}
	if (identityField.length != 0) {
		if (identityField.some(item => item === 'product')) {
			if(identity.product.includes('IW')) {
				threshold = elementThreshold.IW;
			} else {
				threshold = elementThreshold.PS;
			}
		} else if (identityField.some(item => item === 'size')) {
			if(identity.product.includes('35')) { // 350ml
				threshold = elementThreshold.t350;
			} else if (identity.product.includes('50')) { // 500ml
				threshold = elementThreshold.t500;
			} else { // 900 ml
				threshold = elementThreshold.t900;
			}
		}
	} else { // not identity base
		threshold = elementThreshold;
	}
	return threshold;
}

function insertAlert(response, identity) {
	var fields = [];
	var values = [];
	for (var key of Object.keys(response)) {
		if (key != 'normal' && key != 'alert_count') {
			fields.push("`" + key + "`");
			values.push("'" + response[key] + "'");
		}
	}
	fields.push("`lotno`");
	fields.push("`prod_order`");
	values.push("'"+identity.lotno+"'");
	values.push("'"+identity.prod_order+"'");
	modelsStatic.localDB.query(
	    "INSERT INTO alarm_outspec (" + fields.toString() + ") VALUES (" + values.toString() + ")", {
	    	type: modelsStatic.localDB.QueryTypes.INSERT
	    })
	.then(function (result) {
		console.log('alert inserted');
	});
}

async function insertPreAlarm(response, identity) {
	var fields = [];
	var values = [];
	for (var key of Object.keys(response)) {
		if (key != 'normal' && key != 'prealert_count' && key !== 'message' && key !== 'error_code') {
			fields.push("`" + key + "`");
			values.push("'" + response[key] + "'");
		}
	}
	fields.push("`lotno`");
	values.push("'"+identity.lotno+"'");
	fields.push("`prod_order`");
	values.push("'"+identity.prod_order+"'");
	var currentAlarm = await modelsStatic.serverDB.query(
	    `SELECT alarm_date FROM aio_iot_oci`+identity.line+`.tr_pre_alarm
	    WHERE lotno = '`+identity.lotno+`' AND linesection = '`+response.linesection+`' AND metric = '`+response.metric+`' AND prod_order = '`+identity.prod_order+`' ORDER BY id DESC LIMIT 1`, {
	    	type: modelsStatic.localDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	var cond = false;
	if (currentAlarm.length > 0) {
		var then = moment(currentAlarm[0].alarm_date);
		var now = moment(response.alarm_date);
		var duration = moment.duration(now.diff(then));
		if (duration.get("hours") > 0) {
			cond = true;
		}
	} else {
		cond = true;
	}
	if (cond) {
		var chatId = '-476553576';
		if (identity.line.toString() === '2') {
			chatId = '-473797382';
		}
		var messages = response.name + ' detected, value of ' + response.metric + ' (' + response.value + ') is ' + response.message;
        fetch('https://kjyappsvr.aio.co.id/telegram-api/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + messages)
          .then(res => res.text())
          .then(text => console.log('telegram messages sent'));
		socketIO.emit('notification', {path: 'notification', message: response.name, linesection: response.linesection, lineprod: identity.line});
		modelsStatic.serverDB.query(
		    "INSERT INTO aio_iot_oci"+identity.line+".tr_pre_alarm (" + fields.toString() + ") VALUES (" + values.toString() + ")", {
		    	type: modelsStatic.localDB.QueryTypes.INSERT
		    })
		.then(function (result) {
			console.log('prealarm inserted');
		});
	}
}

function checkMinMax(threshold, value) {
	var normal = false;
	var message = '';
	var error_code = '';
	if (threshold.min !== undefined && threshold.max !== undefined) {
		normal = value >= threshold.min && value <= threshold.max;
		message = value + ' outside the range (min = ' + threshold.min + ', max = ' + threshold.max + ')';
		error_code = 'bw';
	} else if ( threshold.min === undefined) {
		normal = value <= threshold.max;
		message = value + ' above max value ' + threshold.max;
		error_code = 'gt';
	} else {
		normal = value >= threshold.min;
		message = value + ' below min value ' + threshold.min;
		error_code = 'lt';
	}
	var response = {
		normal,
		message,
		error_code,
		min: threshold.min,
		max: threshold.max
	}
	return response;
}

function setIO(io) {
	socketIO = io;
}

module.exports = {
	ppi_ilb_filler_1,
	cttn_prod_area_filling1,
	ppi_ilb_filler_2,
	cttn_prod_area_filling2,
	cttn_injeksi1,
	cttn_injeksi2,
	blow1util,
	blow2,
	setIO,
	cttn_ln2keyence1,
	cttn_ln2keyence2,
	cttn_rejectionoc1,
	cttn_rejectionoc2,
	filler_add1,
	filler_add2,
	filler_add2_min,
	bpdoc1,
	bpdoc2,
	label_oci1,
	label_oci2,
	prep_add1,
	prep_add2,
	prep_add1_mtc_min,
	prep_add2_mtc_min,
	status_prod1,
	status_prod2,
	historyAlarmCapper1,
	historyAlarmCapper2,
	timer_plc_filler1,
	timer_plc_filler2,
	blow_add1,
	blow_add2,
	presco1,
	presco2,
	pre_alarm1,
	pre_alarm2,
	pre_alarm3,
	current_cv_pack1,
	current_cv_pack2,
	cttn_ccpfsb,
	cttn_baking_cooling_fsb,
	cttn_pillow_fsb,
	cttn_forming_fsb,
	cttn_hvac_fsb,
	fsb_pillow_keyence,
	camera_inline,
	hvac1,
	hvac2,
	piovan1,
	piovan2,
	alarm_valve_iwai,
	valve_iwai_oc2,
	alarm_auht_oc2,
	flow_nozzle_filler1,
	flow_nozzle_filler1_min,
	flow_nozzle_filler2,
	flow_nozzle_filler2_min,
	frontRearOci1,
	frontRearOci2,
	processTimeCapperOci2,
	cttn_caser1,
	cttn_caser2,
	vibration_oci1,
	vibration_oci2,
	vibration_oc1_min,
	vibration_oci2_min,
	k6pm_cap_checker_oc1,
	k6pm_kroness1_oc1,
	kanesho_oc1,
	kanesho_oc2,
	cntAlarmTgkOci1,
	cntAlarmTgkOci2,
	vibration_ffu_blow1,
	vphp_oc1,
	vphp_oc2,
	cb1,
	cb2,
	k6pmfsb,
	counter_area_packingoc1,
	packing_oc1,
	packing_oc2,
	packing_fx5uj_motorfsb
}