const express = require('express');
const axios = require('axios');
const msal = require('@azure/msal-node');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const msalConfig = {
   auth: {
      clientId: process.env.CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
      clientSecret: process.env.CLIENT_SECRET,
   },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
   const result = await cca.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default'],
   });
   return result.accessToken;
}

app.get('/api/get-embed-token', async (req, res) => {
   try {
      const accessToken = await getAccessToken();
      const { WORKSPACE_ID, REPORT_ID } = process.env;

      const response = await axios.post(
         `https://api.powerbi.com/v1.0/myorg/groups/${WORKSPACE_ID}/reports/${REPORT_ID}/GenerateToken`,
         { accessLevel: 'view' },
         { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      res.json({
         embedToken: response.data.token,
         embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${REPORT_ID}&groupId=${WORKSPACE_ID}`,
         reportId: REPORT_ID,
      });
   } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'Token generation failed.' });
   }
});

app.listen(port, () => {
   console.log(`Power BI backend running on port ${port}`);
});
