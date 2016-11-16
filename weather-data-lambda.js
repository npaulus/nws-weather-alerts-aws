var http = require('https');
var parseString = require('xml2js').parseString;

exports.handler = (event, context) => {
	console.log("FIPS CODE IS: " + event.params.querystring.fips)
	var options = {
        host : 'alerts.weather.gov', 
        port : 443,
        path : '/cap/wwaatmget.php?x='+event.fips+'&y=0', // the rest of the url with parameters if needed
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
      var xmlToJson = JSON.parse('{\"feed\":{\"$\":{\"xmlns\":\"http:\/\/www.w3.org\/2005\/Atom\",\"xmlns:cap\":\"urn:oasis:names:tc:emergency:cap:1.1\",\"xmlns:ha\":\"http:\/\/www.alerting.net\/namespace\/index_1.0\"},\"id\":[\"https:\/\/alerts.weather.gov\/cap\/wwaatmget.php?x=PAC015&y=0\"],\"generator\":[\"NWS CAP Server\"],\"updated\":[\"2016-10-21T06:37:00-04:00\"],\"author\":[{\"name\":[\"w-nws.webmaster@noaa.gov\"]}],\"title\":[\"Current Watches, Warnings and Advisories for Bradford (PAC015) Pennsylvania Issued by the National Weather Service\"],\"link\":[{\"$\":{\"href\":\"https:\/\/alerts.weather.gov\/cap\/wwaatmget.php?x=PAC015&y=0\"}}],\"entry\":[{\"id\":[\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A804E54.FloodWarning.12561A9156E0PA.BGMFLSBGM.29bf5b2d0d0b7e2c06b01d557384eb69\"],\"updated\":[\"2016-10-21T06:37:00-04:00\"],\"published\":[\"2016-10-21T06:37:00-04:00\"],\"author\":[{\"name\":[\"w-nws.webmaster@noaa.gov\"]}],\"title\":[\"Flood Warning issued October 21 at 6:37AM EDT until October 22 at 6:00PM EDT by NWS\"],\"link\":[{\"$\":{\"href\":\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A804E54.FloodWarning.12561A9156E0PA.BGMFLSBGM.29bf5b2d0d0b7e2c06b01d557384eb69\"}}],\"summary\":[\"...The flood warning continues for the following rivers in Pennsylvania... Towanda Creek At Monroeton affecting Bradford County The Flood Warning continues for The Towanda Creek At Monroeton. * Until Saturday evening. * At 6 AM Friday the stage was 17.2 feet.\"],\"cap:event\":[\"Flood Warning\"],\"cap:effective\":[\"2016-10-21T06:37:00-04:00\"],\"cap:expires\":[\"2016-10-22T18:00:00-04:00\"],\"cap:status\":[\"Actual\"],\"cap:msgType\":[\"Alert\"],\"cap:category\":[\"Met\"],\"cap:urgency\":[\"Expected\"],\"cap:severity\":[\"Moderate\"],\"cap:certainty\":[\"Likely\"],\"cap:areaDesc\":[\"Bradford\"],\"cap:polygon\":[\"41.67,-76.87 41.74,-76.46 41.72,-76.42 41.68,-76.5 41.6,-76.86 41.67,-76.87\"],\"cap:geocode\":[{\"valueName\":[\"FIPS6\",\"UGC\"],\"value\":[\"042015\",\"PAC015\"]}],\"cap:parameter\":[{\"valueName\":[\"VTEC\"],\"value\":[\"\/O.EXT.KBGM.FL.W.0002.000000T0000Z-161022T2200Z\/\\n\/MONP1.2.ER.161021T0758Z.161021T0945Z.161022T1000Z.NO\/\"]}]},{\"id\":[\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A804C60.FlashFloodWarning.12561A80C0C8PA.BGMFFWBGM.3349d3419920290223aa2ea785725d64\"],\"updated\":[\"2016-10-21T06:32:00-04:00\"],\"published\":[\"2016-10-21T06:32:00-04:00\"],\"author\":[{\"name\":[\"w-nws.webmaster@noaa.gov\"]}],\"title\":[\"Flash Flood Warning issued October 21 at 6:32AM EDT until October 21 at 9:30AM EDT by NWS\"],\"link\":[{\"$\":{\"href\":\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A804C60.FlashFloodWarning.12561A80C0C8PA.BGMFFWBGM.3349d3419920290223aa2ea785725d64\"}}],\"summary\":[\"THE NATIONAL WEATHER SERVICE IN BINGHAMTON HAS ISSUED A * FLASH FLOOD WARNING FOR... SOUTHWESTERN BRADFORD COUNTY IN NORTHEASTERN PENNSYLVANIA... * UNTIL 930 AM EDT * AT 628 AM EDT...LOCAL OFFICIALS REPORTED HEAVY RAIN HAD CAUSED FLASH FLOODING AND ROAD CLOSURES AROUND THE AREA. OVER 4 INCHES OF\"],\"cap:event\":[\"Flash Flood Warning\"],\"cap:effective\":[\"2016-10-21T06:32:00-04:00\"],\"cap:expires\":[\"2016-10-21T09:30:00-04:00\"],\"cap:status\":[\"Actual\"],\"cap:msgType\":[\"Alert\"],\"cap:category\":[\"Met\"],\"cap:urgency\":[\"Immediate\"],\"cap:severity\":[\"Severe\"],\"cap:certainty\":[\"Likely\"],\"cap:areaDesc\":[\"Bradford\"],\"cap:polygon\":[\"41.79,-76.88 41.76,-76.41 41.56,-76.43 41.6,-76.88 41.79,-76.88\"],\"cap:geocode\":[{\"valueName\":[\"FIPS6\",\"UGC\"],\"value\":[\"042015\",\"PAC015\"]}],\"cap:parameter\":[{\"valueName\":[\"VTEC\"],\"value\":[\"\/O.NEW.KBGM.FF.W.0013.161021T1032Z-161021T1330Z\/\\n\/00000.0.ER.000000T0000Z.000000T0000Z.000000T0000Z.OO\/\"]}]},{\"id\":[\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A7FF8C8.FlashFloodWatch.12561A81C680PA.BGMFFABGM.4460646153d6d9113e9fc68769e9aa44\"],\"updated\":[\"2016-10-21T04:18:00-04:00\"],\"published\":[\"2016-10-21T04:18:00-04:00\"],\"author\":[{\"name\":[\"w-nws.webmaster@noaa.gov\"]}],\"title\":[\"Flash Flood Watch issued October 21 at 4:18AM EDT until October 21 at 4:00PM EDT by NWS\"],\"link\":[{\"$\":{\"href\":\"https:\/\/alerts.weather.gov\/cap\/wwacapget.php?x=PA12561A7FF8C8.FlashFloodWatch.12561A81C680PA.BGMFFABGM.4460646153d6d9113e9fc68769e9aa44\"}}],\"summary\":[\"...FLASH FLOOD WATCH IN EFFECT THROUGH THIS AFTERNOON... THE NATIONAL WEATHER SERVICE IN BINGHAMTON HAS EXPANDED THE * FLASH FLOOD WATCH TO INCLUDE PORTIONS OF CENTRAL NEW YORK AND NORTHEAST PENNSYLVANIA...INCLUDING THE FOLLOWING IN CENTRAL ... NEW YORK...TIOGA. IN NORTHEAST PENNSYLVANIA...BRADFORD. * THROUGH THIS AFTERNOON\"],\"cap:event\":[\"Flash Flood Watch\"],\"cap:effective\":[\"2016-10-21T04:18:00-04:00\"],\"cap:expires\":[\"2016-10-21T16:00:00-04:00\"],\"cap:status\":[\"Actual\"],\"cap:msgType\":[\"Alert\"],\"cap:category\":[\"Met\"],\"cap:urgency\":[\"Expected\"],\"cap:severity\":[\"Severe\"],\"cap:certainty\":[\"Possible\"],\"cap:areaDesc\":[\"Bradford\"],\"cap:polygon\":[\"\"],\"cap:geocode\":[{\"valueName\":[\"FIPS6\",\"UGC\"],\"value\":[\"042015\",\"PAZ038\"]}],\"cap:parameter\":[{\"valueName\":[\"VTEC\"],\"value\":[\"\/O.EXB.KBGM.FF.A.0004.000000T0000Z-161021T2000Z\/\\n\/00000.0.ER.000000T0000Z.000000T0000Z.000000T0000Z.OO\/\"]}]}]}}');
      var result = new Object();
      result.alerts = [];
      for(var index = 0; index < xmlToJson.feed.entry.length; index++){
        result.alerts[index] = new Object();
        result.alerts[index].url = xmlToJson.feed.entry[index].id.toString();
        result.alerts[index].title = xmlToJson.feed.entry[index].title.toString();
        result.alerts[index].summary = xmlToJson.feed.entry[index].summary.toString();
        result.alerts[index].coordinates = xmlToJson.feed.entry[index]['cap:polygon'].toString();
      }
      context.succeed(result);
      // parseString(responseString, function (err, result) {
         

      //    context.succeed(result);
      // });
    });
    
    req.on('error', function (e) {
      console.log(e);
    });
  });

  req.end();
};