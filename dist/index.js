'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isFree;

function isFree(domain) {
  var request = require('request-promise'),
      domainAvailabilityUrl = 'http://free.iis.se/free?q=';

  return request(domainAvailabilityUrl + domain).then(function (data) {
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
