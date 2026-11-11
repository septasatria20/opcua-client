var cron = require('node-cron');
var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
var cors = require('cors');
var http = require('http');
var port = 2022;

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if(req.method=='OPTIONS'){
    res.sendStatus(200);
  }else {
    next();
  }
});

//Controller
var OPCUACtrl = require('./controllers/OPCUA.controller')
var CollectorCtrl = require('./controllers/Collector.controller')
var SocketCtrl = require('./controllers/Socket.controller')

//scheduler per second
cron.schedule('0-59 * * * * *',  function () {
  if (OPCUACtrl.wait(2)) { // wait 1 seconds
    console.log('--------------------------');
    CollectorCtrl.ppi_ilb_filler_1();
    CollectorCtrl.cttn_prod_area_filling1();
    CollectorCtrl.ppi_ilb_filler_2();
    CollectorCtrl.cttn_prod_area_filling2();
    CollectorCtrl.filler_add1();
    CollectorCtrl.filler_add2();
    // BPD
    CollectorCtrl.bpdoc1();
    CollectorCtrl.bpdoc2();
    CollectorCtrl.prep_add1();
    CollectorCtrl.prep_add2();
    CollectorCtrl.pre_alarm1();
    CollectorCtrl.pre_alarm2();
    //status prod
    CollectorCtrl.status_prod1();
    CollectorCtrl.status_prod2();
    CollectorCtrl.timer_plc_filler1();
    CollectorCtrl.timer_plc_filler2();
    //fsb
    CollectorCtrl.cttn_ccpfsb();
    CollectorCtrl.fsb_pillow_keyence();
    //hvac
    CollectorCtrl.hvac1();
    CollectorCtrl.hvac2();  
    //alarm capper
    CollectorCtrl.historyAlarmCapper1();
    CollectorCtrl.historyAlarmCapper2();
    //flowmeter nozzle
    CollectorCtrl.flow_nozzle_filler1();
    CollectorCtrl.flow_nozzle_filler2();
    //presco blow
    CollectorCtrl.presco1();
    CollectorCtrl.presco2();
    CollectorCtrl.blow1util();
    CollectorCtrl.blow2();

    // Front Rear
    CollectorCtrl.frontRearOci1();
    CollectorCtrl.frontRearOci2();

    // Alarm TGK
    CollectorCtrl.cntAlarmTgkOci1();
    CollectorCtrl.cntAlarmTgkOci2();

    // Process Time Capper
    CollectorCtrl.processTimeCapperOci2();

    // Alarm valvle iwai oc2
    CollectorCtrl.alarm_valve_iwai();

    // Valve iwai oc2
    CollectorCtrl.valve_iwai_oc2();

    // Alarm AUHT OC2
    CollectorCtrl.alarm_auht_oc2();
  
    



  }
});

// scheduler per 2 second
// cron.schedule('*/2 * * * * *',  function () {
//   if (OPCUACtrl.wait(2)) { // wait 1 seconds
//     console.log('--------------------------');
// pindah ke per detik
//     CollectorCtrl.historyAlarmCapper1();
//     CollectorCtrl.historyAlarmCapper2();
//   }
// });

//scheduler per minutes
cron.schedule('0 0-59 * * * *',  function () {
  console.log('--------------------------');
  OPCUACtrl.updateIdentity();
  if (OPCUACtrl.wait(2)) { // wait 1 seconds
  
    CollectorCtrl.cttn_injeksi1();
    CollectorCtrl.cttn_injeksi2();
    CollectorCtrl.blow_add1();
    CollectorCtrl.blow_add2();
    CollectorCtrl.filler_add2_min();
    CollectorCtrl.prep_add1_mtc_min();
    CollectorCtrl.prep_add2_mtc_min();
    CollectorCtrl.cttn_rejectionoc1();
    CollectorCtrl.cttn_rejectionoc2();
    CollectorCtrl.label_oci1();
    CollectorCtrl.label_oci2();
    CollectorCtrl.cttn_baking_cooling_fsb();
    CollectorCtrl.cttn_pillow_fsb();
    CollectorCtrl.cttn_forming_fsb();
    CollectorCtrl.cttn_hvac_fsb();    
    CollectorCtrl.camera_inline();
    CollectorCtrl.current_cv_pack1();
    CollectorCtrl.current_cv_pack2();
    CollectorCtrl.piovan1();
    CollectorCtrl.piovan2();
    CollectorCtrl.cttn_caser1();
    CollectorCtrl.cttn_caser2();
    CollectorCtrl.vibration_oc1_min();
    CollectorCtrl.vibration_oci2_min();
    //kanesho
    CollectorCtrl.kanesho_oc1();
    CollectorCtrl.kanesho_oc2();
    //vphp
    CollectorCtrl.vphp_oc1();
    CollectorCtrl.vphp_oc2();
    //counter_area_packingoc1
    CollectorCtrl.counter_area_packingoc1();
    CollectorCtrl.packing_oc1(); 
    CollectorCtrl.packing_oc2(); 
    CollectorCtrl.flow_nozzle_filler2_min();
    CollectorCtrl.flow_nozzle_filler1_min();
    //FSB
    CollectorCtrl.packing_fx5uj_motorfsb();

     
  }
  //CollectorCtrl.getNullValue();
});
//scheduler per 10 minutes
cron.schedule('*/10 * * * *', function () {
  console.log('--------------------------');
  OPCUACtrl.updateIdentity();
  if (OPCUACtrl.wait(2)) { // wait 1 seconds
    //vibration
    CollectorCtrl.vibration_oci1();
    CollectorCtrl.vibration_oci2();
  }
  //CollectorCtrl.getNullValue();
});

// scheduler per hours
cron.schedule('0 * * * *', function () {
  console.log('---- cron per hours');
  CollectorCtrl.k6pm_cap_checker_oc1();
  CollectorCtrl.pre_alarm3();
  //kroness
  CollectorCtrl.k6pm_kroness1_oc1();
  //vibration_ffu_blow1
  CollectorCtrl.vibration_ffu_blow1(); 
  // cb1 dan 2
    CollectorCtrl.cb1();
    CollectorCtrl.cb2();
    //fsb 
    CollectorCtrl.k6pmfsb();
     

})

// scheduler per day
cron.schedule('0 0 * * *', function() {
  console.log('---- cron per days');

})


// |-------------- PLEASE DON'T MODIFY THIS SECTION -------------------
//scheduler per 6 hours for resfresh subscription data 
cron.schedule('0 */6 * * *',  function () {
  // OPCUACtrl.updateSubscription();
  OPCUACtrl.updateSchedulerSubs();
  //CollectorCtrl.getNullValue();
});

//scheduler LN OC1 per 10detik
cron.schedule('*/10 * * * * *',  function () {
  console.log('--------------------------');
  OPCUACtrl.updateIdentity();
  if (OPCUACtrl.wait(2)) { // wait 1 seconds
    CollectorCtrl.cttn_ln2keyence1();
    CollectorCtrl.cttn_ln2keyence2();
  }
  //CollectorCtrl.getNullValue();
});
// |-------------- END OF THIS SECTION -------------------

var server = http.createServer(app);

const options = {
  path: '/api/iot/socketservice',
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
}
const io = require('socket.io')(server, options);

// socket io service
io.on('connection', socket => {
  SocketCtrl.socketHandler(socket, io);
});

CollectorCtrl.setIO(io);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
  ? 'Pipe ' + port
  : 'Port ' + port;


  switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
    default:
    throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
}

console.log('API IOT Jalan di server: '+ port)


module.exports = server;