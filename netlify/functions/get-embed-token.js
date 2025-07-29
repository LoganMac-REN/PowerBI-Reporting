const axios = require('axios');
const msal = require('@azure/msal-node');

const msalConfig = {
   auth: {
      clientId: process.env.CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
      clientSecret: process.env.CLIENT_SECRET,
   },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

// ✅ Hardcoded values for "OTD in WIP" Power BI report in "Operations" workspace
const workspaceId = 'f1093295-dcf8-4d85-a342-48ea5f6d57da';
const reportId = 'cad20245-4ba2-47ee-85c3-51d949787c46';

exports.handler = async function () {
   try {
      const accessToken = await cca.acquireTokenByClientCredential({
         scopes: ['https://analysis.windows.net/powerbi/api/.default'],
      });

      const response = await axios.post(
         `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`,
         { accessLevel: 'view' },
         {
            headers: {
               Authorization: `Bearer ${accessToken.accessToken}`,
               'Content-Type': 'application/json',
            },
         }
      );

      return {
         statusCode: 200,
         body: JSON.stringify({
            embedToken: response.data.token,
            embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${workspaceId}`,
            reportId: reportId,
         }),
      };
   } catch (error) {
      return {
         statusCode: 500,
         body: JSON.stringify({ error: error.message }),
      };
   }
};
