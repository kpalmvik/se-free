export default function isFree(domain) {
  const request = require('request-promise'),
        domainAvailabilityUrl = 'http://free.iis.se/free?q=';

  return request(domainAvailabilityUrl + domain)
    .then((data) => {
      const returnValues = {
              'free': 'FREE',
              'not_valid': 'NOT_VALID',
              'occupied': 'OCCUPIED'
            },
            domainAvailability = data.split(' ')[0];

      if(returnValues[domainAvailability]) {
        return returnValues[domainAvailability];
      }

      reject();
    });
}
