var http = require('https');
var parseString = require('xml2js').parseString;
const url = require('url');

exports.handler = (event, context) => {
    
    console.log("URL IS: " + event.params.querystring.url)
    var weatherDetailUrl = url.parse(event.params.querystring.url);
	var options = {
        host : weatherDetailUrl.hostname, 
        port : 443,
        path : weatherDetailUrl.path, // the rest of the url with parameters if needed
        method : 'GET' // do GET
    };
    console.log("Here is the path: " +options.path);
  
    var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
    console.log("Status code: " + res.statusCode);
    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });
        
    res.on('end', function() {
      
    parseString(responseString, function (err, result) {
        var alertDetails = new Object();
        alertDetails.headline = result.alert.info[0].headline;
        alertDetails.polygon = result.alert.info[0].area[0].polygon;
        alertDetails.description = result.alert.info[0].description;
        alertDetails.instructions = result.alert.info[0].instruction;
        alertDetails.phenomena = "";
        var parameters = result.alert.info[0].parameter;
        //get vtec phenomena if it is a warning to determine type of warning
        for(param in parameters){
            console.log("Param is: " + param);
            if(parameters[param].valueName == "VTEC"){
                var vtec = parameters[param].value.toString().split(".");
                if("W" == vtec[4]){
                    alertDetails.phenomena = vtec[3];
                }
            }
        }
        console.log(JSON.stringify(result));
        context.succeed(alertDetails);
      });
    });
    
    req.on('error', function (e) {
      console.log(e);
    });
  });

  req.end();
}