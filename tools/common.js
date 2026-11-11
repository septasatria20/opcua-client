function ok(res, data) {

    return res.status(200).json({status : true,  'data'  : data});

}
function error(res, message, code) {
    
    return res.status(code).json({'status' : false,  'data' :{'message' : message} });
}

function getDayofWeek(day) {
  var dayNames = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  return dayNames[day]
}

module.exports = {
    ok,
    error,
    getDayofWeek

}