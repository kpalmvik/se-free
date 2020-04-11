"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFree;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _idnaUts = _interopRequireDefault(require("idna-uts46"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var returnValues = {
  free: 'FREE',
  not_valid: 'NOT_VALID',
  occupied: 'OCCUPIED'
};

function isFree(domain) {
  var idnEncodedDomain = _idnaUts.default.toAscii(domain);

  var requestUrl = `http://free.iis.se/free?q=${idnEncodedDomain}`;
  return (0, _nodeFetch.default)(requestUrl).then(function (res) {
    if (res.ok) {
      return res.text();
    }

    return Promise.reject(new Error(res.statusText));
  }).then(function (body) {
    var domainAvailability = body.split(' ')[0];
    var result = returnValues[domainAvailability];

    if (result) {
      return result;
    }

    return Promise.reject(new Error('Unknown error'));
  });
}

module.exports = exports.default;
