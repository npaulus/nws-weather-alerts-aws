var http = require('https');

exports.handler = function(event, context){
    console.log("Event is: " + JSON.stringify(event));
    console.log("Lat is: " + event.params.querystring.latitude.toString());
	console.log(event.params.querystring.latitude.toString());
	console.log(event.params.querystring.longitude.toString());
	
	var options = {
    host : 'geo.fcc.gov', // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/api/census/block/find?format=json&latitude='+event.params.querystring.latitude+'&longitude='+event.params.querystring.longitude, // the rest of the url with parameters if needed
    method : 'GET' // do GET
    };
    console.log("Here is the path: " +options.path);
  
    var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
    

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      var fips = responseObject.State.code;
      fips += "C";
      fips += responseObject.County.FIPS.substr(responseObject.County.FIPS.length - 3);
      
      console.log("FIPS CODE RESULT: "+ fips)
      context.succeed(fips);
    });
  });

  req.end();
    
};
