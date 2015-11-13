export default function Hello(domain) {
  var rp = require('request-promise');

  return rp('http://www.' + domain + '.com')
    .promise();
}
