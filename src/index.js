export default function isFree(domain) {
  const request = require('request-promise'),
        domainAvailabilityUrl = 'http://free.iis.se/free?q=';

  return request(domainAvailabilityUrl + domain)
    .then((htmlString) => {
      if (htmlString.split(' ')[0] === 'free') {
        return 'FREE';
      }
      return '';
    });
}
