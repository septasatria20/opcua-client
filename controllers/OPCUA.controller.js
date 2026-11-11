const modelsStatic = require('./../config/sequelizeStatic');
const {
	AttributeIds,
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    ClientSubscription,
    ClientMonitoredItem,
    TimestampsToReturn
} = require("node-opcua");
const modelOCI1 = require('./../models/nodeOCI1');
const modelOCI2 = require('./../models/nodeOCI2');
const modelFSB = require('./../models/nodeFSB');
const system = require('./../models/system');
const endpointUrl = 'opc.tcp://192.168.9.8:4840/';
const connectionStrategy = {
  initialDelay: 1000,
  maxRetry: 1
};
const options = {
  applicationName: "MyClient",
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpoint_must_exist: false
};
var client = OPCUAClient.create(options);
var moment = require('moment');
var session;
var subscription;
var value = new Map();
var nodeLength = 0;
var identity;
var countTime = 0;

async function main() {
    try {
        // step 1 : connect to
        await client.connect(endpointUrl);
        console.log("connected !");

        // step 2 : createSession
        session = await client.createSession();
        console.log("session created !");
        
        // step 3 : Setting up subscription
        // ------- initialize subscription -----------
        initializeSubscription();
        // ------- update subscription -----------
        updateSubscription();
		// get lotno and pro
		updateIdentity();
		
    } catch (err) {
        console.log(" Cannot connect to " + endpointUrl);
        console.log(" Error = ", err.message);
        return;
    }
}
main();

async function updateSchedulerSubs() {
	session = await client.createSession();
	initializeSubscription();
	updateSubscription();
}

function initializeSubscription() {
	subscription = ClientSubscription.create(session, {
    	requestedPublishingInterval: 1000,
    	requestedLifetimeCount: 1000,
    	requestedMaxKeepAliveCount: 1000,
    	maxNotificationsPerPublish: 1000,
    	publishingEnabled: true,
    	priority: 1
	});
	console.log('subscription initialized');
}

function deleteAllSubcription() {
	subscription.terminate();
	console.log('all subscription deleted');
}

function updateSubscription() {
	// delete all subscription
	deleteAllSubcription();
	// initialize again
	initializeSubscription();
	// step 1 : create subscription for all value OCI1
    for (var table of Object.keys(modelOCI1)) {
    	for (var column of Object.keys(modelOCI1[table])) {
    		subscribeValue(modelOCI1[table][column]); //line, table, column, model
    		nodeLength++;
    	}
	}

	// step 2 : create subscription for all value OCI2
    for (var table of Object.keys(modelOCI2)) {
    	for (var column of Object.keys(modelOCI2[table])) {
    		subscribeValue(modelOCI2[table][column]); //line, table, column, model
    		nodeLength++;
    	}
	}

	// step 2.1 : create subscription for all value FSB
    for (var table of Object.keys(modelFSB)) {
    	for (var column of Object.keys(modelFSB[table])) {
    		subscribeValue(modelFSB[table][column]); //line, table, column, model
    		nodeLength++;
    	}
	}

	// step 3 : create subscription for OPC time
	subscribeValue(system.time.CurrentTime);
	nodeLength++;

	// step 4 : create subscription for OCI1 and OCI2 Production mode
	subscribeValue(system.OCI1mode);
	nodeLength++;
	subscribeValue(system.OCI2mode);
	nodeLength++;
}

async function getValue(model) {
	if (client === undefined) {
		main();
	}
	return model.value;
}

async function readValue(nodeId) {
	const dataValue2 = await session.readVariableValue(nodeId);
	return dataValue2.value.value;
}

async function forceUpdate(nodeId) {
	var tempValue = await readValue(nodeId);
	//console.log(nodeId, tempValue);
	value.set(nodeId, tempValue);
}

async function subscribeValue(model) {
	//console.log(line, table, column, model.node);
	//console.log(name, nodeId);
	/*
	subscription
	  .on("started", function() {
	    console.log(
	      "subscription started for 2 seconds - subscriptionId=",
	      subscription.subscriptionId
	    );
	  })
	  .on("keepalive", function() {
	    console.log("keepalive");
	  })
	  .on("terminated", function() {
	    console.log("terminated");
	  });*/

	// install monitored item

	const itemToMonitor = {
	  nodeId: model.node,
	  attributeId: AttributeIds.Value
	};
	const parameters = {
	  samplingInterval: 100,
	  discardOldest: true,
	  queueSize: 30
	};

	const monitoredItem = ClientMonitoredItem.create(
	  subscription,
	  itemToMonitor,
	  parameters,
	  TimestampsToReturn.Both
	);

	monitoredItem.on("changed", async (dataValue) => {
	  var valueTemp = dataValue.value.value;
	  if (model.decimal !== 'string') {
	  	valueTemp = Math.round((dataValue.value.value * model.decimal) * 1000)/1000;
	  }
	  model.status_value = 'updated';
	  model.last_update = moment().format('YYYY-MM-DD HH:mm:ss');
	  model.value = valueTemp;
	  value.set(model.column+'-'+model.node, valueTemp);
	});
	/*
	async function timeout(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}
	await timeout(10000);

	console.log("now terminating subscription");
	await subscription.terminate();*/
}

async function updateIdentity(){
	try {
		identity = await modelsStatic.serverDB.query(
	    	"SELECT lotno, prod_order, product, line, prod_start, prod_end FROM scada_db1.v_prodidentity_nodeservice", {
	    		type: modelsStatic.localDB.QueryTypes.SELECT
	    	})
		.then(function (result) {
			if (result.length === 0) {
				result.push({
					lotno: 'change lot',
					prod_order: 0,
					product: '500DOM',
					line: 'FSB1',
					prod_start: '',
					prod_end: '',
				});
			}
			return result;
		});
	} catch (e) {
		// fallback untuk lingkungan lokal ketika serverDB tidak tersedia
		identity = [
			{ lotno: 'change lot', prod_order: 0, product: 'LOCAL', line: 'FSB1', prod_start: '', prod_end: '' }
		];
	}
}

function getIdentity(line) {
	var data = [];
	if (identity && identity.length > 0) {
		data = identity.filter(data => data.line === line)
	}
	// Return found data or default fallback
	if (data.length > 0) {
		return data[0];
	}
	// Default fallback jika tidak ditemukan
	return {
		lotno: 'change lot',
		prod_order: 0,
		product: '500DOM',
		line: line || 'FSB1',
		prod_start: '',
		prod_end: '',
	};
}

function isSameSize() {
	var tens = Math.floor(nodeLength/10 % 10) * 10;
	console.log(value.size, nodeLength);
	return value.size >= tens;
}

function getColumns(table) {
	var columns = [];
	for (var key of Object.keys(table)) {
    	columns.push(table[key]['column']);
	}
	return columns;
}

function wait(time){
	var cond = false;
	if(time === countTime) {
		cond = true;
	} else {
		countTime++;
	}
	return cond;
}

module.exports = {
	getValue,
	readValue,
	updateIdentity,
	getIdentity,
	isSameSize,
	forceUpdate,
	getColumns,
	updateSubscription,
	updateSchedulerSubs,
	wait
}