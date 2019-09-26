import request from 'request-promise';
import uts46 from 'idna-uts46';

const returnValues = {
  free: 'FREE',
  not_valid: 'NOT_VALID',
  occupied: 'OCCUPIED',
};

export default function isFree(domain) {
  const idnEncodedDomain = uts46.toAscii(domain);
  const requestUrl = `http://free.iis.se/free?q=${idnEncodedDomain}`;

  return request(requestUrl)
    .then((data) => {
      const domainAvailability = data.split(' ')[0];
      const result = returnValues[domainAvailability];

      if (result) {
        return result;
      }

      return Promise.reject(new Error('Unknown error'));
    });
}
