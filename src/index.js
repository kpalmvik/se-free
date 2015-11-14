export default function isFree(domain) {
  const request = require('request-promise'),
        domainAvailabilityUrl = 'http://free.iis.se/free?q=';

  return request(domainAvailabilityUrl + domain)
    .then((responseData) => {
      const domainAvailability = responseData.split(' ')[0];

      if (domainAvailability === 'free') {
        return 'FREE';
      }

      if(domainAvailability === 'not_valid') {
        return 'NOT_VALID';
      }

      if(domainAvailability === 'occupied') {
        return 'OCCUPIED';
      }

      reject();
    });
}
