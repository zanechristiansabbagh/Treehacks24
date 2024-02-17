export default {
  providers: [
    {
      domain: process.env.OAUTH_DOMAIN,
      applicationID: process.env.OAUTH_CLIENT_ID,
    },
  ],
};
