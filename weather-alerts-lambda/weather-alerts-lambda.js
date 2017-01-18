var http = require('https');
var parseString = require('xml2js').parseString;

exports.handler = (event, context) => {
	console.log("FIPS CODE IS: " + event.params.querystring.fips)
	var options = {
        host : 'alerts.weather.gov', 
        port : 443,
        path : '/cap/wwaatmget.php?x='+event.params.querystring.fips+'&y=0', // the rest of the url with parameters if needed
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
       parseString(responseString, function (err, jsonResult) {
          console.log(JSON.stringify(jsonResult));
          var result = new Object();
          result.alerts = [];
          for(var index = 0; index < jsonResult.feed.entry.length; index++){
            result.alerts[index] = new Object();
            result.alerts[index].feedTitle = jsonResult.feed.title;
            result.alerts[index].url = jsonResult.feed.entry[index].id;
            result.alerts[index].title = jsonResult.feed.entry[index].title;
            result.alerts[index].summary = jsonResult.feed.entry[index].summary;
            result.alerts[index].coordinates = jsonResult.feed.entry[index]['cap:polygon'];
          }

          context.succeed(result);
       });
    });
    
    req.on('error', function (e) {
      console.log(e);
    });
  });

  req.end();
};