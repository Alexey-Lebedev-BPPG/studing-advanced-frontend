const urls = {
  location: (locationToken?: string) =>
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${locationToken}`,
  stripe: {
    getClientSecretByCustomer: ({
      utmCampaign,
      utmContent,
      utmMedium,
      utmSource,
      utmTerm,
    }: {
      utmCampaign: {};
      utmContent: {};
      utmMedium: {};
      utmSource: {};
      utmTerm: {};
    }) =>
      `stripe/subscriptions/?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}&utm_term=${utmTerm}`,
  },
};

export default urls;
