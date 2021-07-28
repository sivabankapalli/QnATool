import axios from 'axios';
var graph = require('@microsoft/microsoft-graph-client');


function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  return user;
}

export async function getUserPhoto(accessToken) {
    const avatar = '';
    try {
        const graphEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";

        const response = await axios(graphEndpoint, { headers: { Authorization: `Bearer ${accessToken}` }, responseType: 'arraybuffer' });
        const image = new Buffer(response.data, 'binary').toString('base64');
        avatar = 'data:' + (response.headers["content-type"]) + ';base64,' + image;
    }
    catch (err)
    {
        avatar = 'data:jpeg;base64,';
    }

return avatar;
}
