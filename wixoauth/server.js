const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;
const YOUR_APP_ID = process.env.YOUR_APP_ID || 'be9bfb88-8339-4d5a-a64f-5cf6fe74d873';
const YOUR_APP_SECRET = process.env.YOUR_APP_SECRET || 'a9e5da9c-466d-4830-a211-98183456f534';
const YOUR_REDIRECT_URL = process.env.YOUR_REDIRECT_URL || 'https://oauthwix-b8634c5ef964.herokuapp.com/redirect';

app.get('/', (req, res) => {
  res.send('App is running!');
});

app.get('/initiate-oauth', (req, res) => {
  const wixAuthUrl = `https://www.wix.com/installer/install?appId=${YOUR_APP_ID}&redirectUrl=${YOUR_REDIRECT_URL}`;
  res.redirect(wixAuthUrl);
});

app.get('/redirect', async (req, res) => {
  const authCode = req.query.code;
  
  try {
    const response = await axios.post('https://www.wixapis.com/oauth/access', {
      grant_type: 'authorization_code',
      client_id: YOUR_APP_ID,
      client_secret: YOUR_APP_SECRET,
      code: authCode
    });

    const accessToken = response.data.access_token;
    res.redirect(`https://www.wix.com/installer/close-window?access_token=${accessToken}`);
  } catch (error) {
    console.error(error);

    if (error.response) {
      res.status(error.response.status || 500).send(error.response.data || 'OAuth failed');
    } else if (error.request) {
      // Request was made, but no response was received
      res.status(500).send('No response received from Wix API');
    } else {
      // Other errors
      res.status(500).send('OAuth process encountered an error');
    }
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
