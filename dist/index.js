'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isFree;

function isFree(domain) {
  var request = require('request-promise'),
      uts46 = require('idna-uts46'),
      domainAvailabilityUrl = 'http://free.iis.se/free?q=',
      idnEncodedDomain = uts46.toAscii(domain);

  return request(domainAvailabilityUrl + idnEncodedDomain).then(function (data) {
    var returnValues = {
      'free': 'FREE',
      'not_valid': 'NOT_VALID',
      'occupied': 'OCCUPIED'
    },
        domainAvailability = data.split(' ')[0];

    if (returnValues[domainAvailability]) {
      return returnValues[domainAvailability];
    }

    reject();
  });
}

module.exports = exports['default'];
