const chai = require('chai'),
      should = chai.should(),
      chaiAsPromised = require('chai-as-promised'),
      nock = require('nock'),
      isFree = require('../src/index.js'),
      serverUrl = 'http://free.iis.se/';

chai.use(chaiAsPromised);

describe('checking isFree for a domain', () => {
  it('should return FREE if the domain is available',() => {
    const availableDomain = 'www.available.se',
          nockServer = nock(serverUrl)
                    .get('/free?q=' + availableDomain)
                    .reply(200, 'free ' + availableDomain);

    return isFree(availableDomain).should.eventually.equal('FREE');
  });

  it('should return NOT_VALID if the domain is not valid',() => {
    const invalidDomain = 'www.not_valid.se',
          nockServer = nock(serverUrl)
                    .get('/free?q=' + invalidDomain)
                    .reply(200, 'not_valid ' + invalidDomain);

    return isFree(invalidDomain).should.eventually.equal('NOT_VALID');
  });

});
