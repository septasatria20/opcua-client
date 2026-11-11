var modelsStatic = require('./../config/sequelizeStatic');
var oci1 = require('./../config/oci1');
var oci2 = require('./../config/oci2');
var api = require('./../tools/common');

async function getLatestPRO(req, res) {
	var countData = 0;
	countData+= await updateLocalDatabase('tr_pro');
	countData+= await updateLocalDatabase('mst_prodidentity');
	api.ok(res, countData+' data created');
}

async function scheludeLatestPro() {
	var countData = 0;
	countData+= await updateLocalDatabase('tr_pro');
	countData+= await updateLocalDatabase('mst_prodidentity');

	console.log(countData+' data created');
}

async function updateLocalDatabase(table) {
	var countData = 0;
	// OCI1
	//Local data
	var localData1 = await modelsStatic.localDB.query(
	    "SELECT * FROM "+table+" ORDER BY id DESC LIMIT 1", {
	    	type: modelsStatic.localDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	//Server Data
	var newData1 = await modelsStatic.serverDB.query(
	    "SELECT * FROM "+table+" WHERE id > "+localData1[0].id, {
	    	type: modelsStatic.serverDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	//OCI2
	//Local data
	var localData2 = await modelsStatic.localDB.query(
	    "SELECT * FROM aio_iot_oci2."+table+" ORDER BY id DESC LIMIT 1", {
	    	type: modelsStatic.localDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	//Server Data
	var newData2 = await modelsStatic.serverDB.query(
	    "SELECT * FROM aio_iot_oci2."+table+" WHERE id > "+localData2[0].id, {
	    	type: modelsStatic.serverDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	var modelOci1 = oci1.tr_pro;
	var modelOci2 = oci2.tr_pro;
	if (table === 'mst_prodidentity') {
		modelOci1 = oci1.mst_prodidentity;
		modelOci2 = oci2.mst_prodidentity;
	}
	//OCI1
	for (var i = 0; i < newData1.length; i++) {
		var element = newData1[i];
		
		var create = await modelOci1.create(element)
	    .then(function (data) {
	    	return data
	    })
	    .catch(function (err) {
	    	return err
	    })
	    countData++;
	}
	//OCI2
	for (var i = 0; i < newData2.length; i++) {
		var element = newData2[i];
		
		var create = await modelOci2.create(element)
	    .then(function (data) {
	    	return data
	    })
	    .catch(function (err) {
	    	return err
	    })
	    countData++;
	}
	return countData;
}

async function uploadTransactionData(req,res) {
	var tables = await modelsStatic.localDB.query(
	    "SELECT table FROM mst_table_lims WHERE type = 'tr'", {
	    	type: modelsStatic.serverDB.QueryTypes.SELECT
	    })
	.then(function (result) {
		return result;
	});
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i].table;
		
	}
	api.ok(res, tables);
}

module.exports = {
	getLatestPRO,
	scheludeLatestPro,
	uploadTransactionData
};