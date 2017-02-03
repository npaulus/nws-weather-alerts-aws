var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;

exports.handler = (event, context) => {
 
    console.log("URL IS: " + event.params.querystring.url)
    fetch(event.params.querystring.url)
        .then(function(res){
            if(res.ok){
                return res.text();
            } else {
                throw Error(res.statusText)
            }
        })
        .then(function(text){
            parseString(text, function (err, result) {
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
        })
        .catch(function(err) {
            console.log(err);
        });

}