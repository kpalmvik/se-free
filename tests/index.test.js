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

  it('should return OCCUPIED if the domain is occupied',() => {
    const occupiedDomain = 'www.occupied.se',
          nockServer = nock(serverUrl)
                    .get('/free?q=' + occupiedDomain)
                    .reply(200, 'occupied ' + occupiedDomain);

    return isFree(occupiedDomain).should.eventually.equal('OCCUPIED');
  });

  it('should reject if the call fails with a HTTP error',() => {
    const exampleDomain = 'www.example.se',
          nockServer = nock(serverUrl)
                    .get('/free?q=' + exampleDomain)
                    .reply(500, 'occupied ' + exampleDomain);

    return isFree(exampleDomain).should.eventually.be.rejected;
  });
});
