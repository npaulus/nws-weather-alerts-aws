import axios from 'axios';

// CORS headers to allow requests from your static site
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://alerts.vtmnts.com',
  'Access-Control-Allow-Credentials': 'true'
};

export const handler = async (event) => {
  const { lat, lon } = event.queryStringParameters || {};

  if (!lat || !lon) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing lat or lon parameter' })
    };
  }

  const url = `https://api.weather.gov/alerts/active?point=${lat},${lon}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'nws-weather-alerts-lambda',
        'Accept': 'application/geo+json'
      }
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(response.data.features)
    };
  } catch (error) {
    console.error('NWS Alerts API error:', error.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to retrieve weather alerts' })
    };
  }
};
