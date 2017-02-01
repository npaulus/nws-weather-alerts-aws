NWS Weather Alerts
==================

This is a simple AWS Cloud application that will check for weather alerts issued by the US National Weather Service based on a user's location. It will plot the user's location on a Google map as well as draw any polygons impacting the user's county. The polygons are color coded similar to the National Weather Service color scheme (Red = Tornado, Severe Thunderstorm = Yellow, Flash Flood = Green, Flood = Dark Green). Additionally, the current radar is now overlayed on the Google map. The page is optimized for mobile or a larger screen.

The goal is to provide a way to easily pull weather alert information while traveling using a mobile device. Using the GeoLocation API, the user's GPS coordinates are used to determine the appropriate URL to retrieve weather alerts for their location.

This project was converted from a [Java web app](https://github.com/npaulus/nws-wx-alerts) to learn more about various Amazon Web Services offerings. This version relies on 3 AWS Lambda's written in Node.js for the backend. The front end is hosted in an S3 bucket behind CloudFront to use AWS's Certificate Manager for a free SSL certificate. There is theoretically no limit to how much traffic the app can handle. 

You can see this code in action [here.](https://alerts.vtmnts.com)

Usage
-----

It uses the following:

* Node.js
* jQuery
* [Google Maps API V3](https://developers.google.com/maps/documentation/javascript/) - API Key is required to use this
* AWS API Gateway
* AWS Lambda
* AWS S3 - static website hosting
* AWS CloudFront
* AWS Certificate Manager

How it works
------------

The general idea is when a user visits the page, JavaScript tries to get the users location through the GeoLocation API. The first AJAX call sends the GPS coordinates to the fcc-fips-code lambda which calls the FCC's [web service](http://www.fcc.gov/developers/census-block-conversions-api) for determining a county in the United States. The FIPS code for the county is used from the FCC response to generate the appropriately formatted URL for the NWS weather alert [feeds](http://alerts.weather.gov). This URL is used in the weather-alerts lambda to retrieve a list of alerts issued by the NWS. The returned list of alerts are used in the weather-alerts-details lambda to return the alert text to the webpage. The user's location is plotted on Google Maps. If any polygon coordinates are included with the weather alerts those are drawn on the map as well and color coded appropriately.  This makes it easy for the user to see if their location is impacted.  Recently, I added in a radar overlay for the google map. I'm getting the radar data from [IEM Open GIS Consortium Web Services](http://mesonet.agron.iastate.edu/ogc/).

Roadmap
-------

* Make the polygons color coded based on type of alert: (Added 2/6/2013)
    * Red = Tornado Warning
	* Yellow = Severe Thunderstorm Warning
	* Green = Flash Flood Warning
    * Dark Green = Flood Warning (added 2/1/2017)
	* Grey = All others
* Add Radar overlay to google maps (Added 2/5/2013)
* Replace "Retrieving weather info...." message with spinner to indicate page is loading
* Add color coded "boxing" around alerts to make it easier to determine which alert goes with which polygon
