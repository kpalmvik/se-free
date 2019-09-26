import request from 'request-promise';
import uts46 from 'idna-uts46';

export default function isFree(domain) {
  const domainAvailabilityUrl = 'http://free.iis.se/free?q=';
  const idnEncodedDomain = uts46.toAscii(domain);

  return request(domainAvailabilityUrl + idnEncodedDomain)
    .then((data) => {
      const returnValues = {
        free: 'FREE',
        not_valid: 'NOT_VALID',
        occupied: 'OCCUPIED',
      };
      const domainAvailability = data.split(' ')[0];

      if (returnValues[domainAvailability]) {
        return returnValues[domainAvailability];
      }

      return Promise.reject(new Error('Unknown error'));
    });
}
