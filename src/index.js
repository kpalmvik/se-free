import fetch from 'node-fetch';
import uts46 from 'idna-uts46';

const returnValues = {
  free: 'FREE',
  not_valid: 'NOT_VALID',
  occupied: 'OCCUPIED',
};

export default function isFree(domain) {
  const idnEncodedDomain = uts46.toAscii(domain);
  const requestUrl = `http://free.iis.se/free?q=${idnEncodedDomain}`;

  return fetch(requestUrl)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((body) => {
      const domainAvailability = body.split(' ')[0];
      const result = returnValues[domainAvailability];

      if (result) {
        return result;
      }

      return Promise.reject(new Error('Unknown error'));
    });
}
