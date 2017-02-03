var http = require('https');
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;

exports.handler = (event, context) => {
	console.log("FIPS CODE IS: " + event.params.querystring.fips)
    
    fetch('https://alerts.weather.gov' + '/cap/wwaatmget.php?x='+event.params.querystring.fips+'&y=0')
        .then(function(res){
            console.log("Status is: " + res.status);
            if(res.ok){
                return res.text();
            } else {
                throw Error(res.statusText)
            }
        }).then(function(text){
            parseString(text, function (err, jsonResult) {
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
        })
        .catch(function(err) {
            console.log(err);
        });
};