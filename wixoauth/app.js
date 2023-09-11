const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const CLIENT_ID = 'be9bfb88-8339-4d5a-a64f-5cf6fe74d873';
const CLIENT_SECRET = 'a9e5da9c-466d-4830-a211-98183456f534';

// App URL endpoint
app.get('/app', (req, res) => {
  const token = req.query.token;
  const redirectUrl = `https://www.wix.com/installer/install?token=${token}&appId=${CLIENT_ID}&redirectUrl=https://d322-109-253-204-131.ngrok-free.app/redirect`;
  res.redirect(redirectUrl);
});

// Redirect URL endpoint
app.get('/redirect', async (req, res) => {
  const authCode = req.query.code;
  try {
    const response = await axios.post('https://www.wixapis.com/oauth/access', {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: authCode
    });
    const { access_token, refresh_token } = response.data;

    res.send(`
      <html>
        <body>
          <p>OAuth successful, this window will close in a few seconds...</p>
          <script>
            setTimeout(function() {
              window.close();
            }, 5000); // Close the window after 3 seconds
          </script>
        </body>
      </html>
    `);

  } catch (error) {
    res.send('OAuth failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on https://d322-109-253-204-131.ngrok-free.app:${port}`);
});
