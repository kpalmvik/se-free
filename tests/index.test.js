const chai = require('chai'),
      should = chai.should(),
      chaiAsPromised = require('chai-as-promised'),
      nock = require('nock'),
      isFree = require('../src/index.js'),
      serverUrl = 'http://free.iis.se/';

chai.use(chaiAsPromised);

describe('checking isFree for a domain', () => {
  it('should return FREE if the domain is available',() => {
    const availableDomain = 'available.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': availableDomain})
            .reply(200, 'free ' + availableDomain);

    return isFree(availableDomain).should.eventually.equal('FREE');
  });

  it('should return NOT_VALID if the domain is not valid',() => {
    const invalidDomain = 'not_valid.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': invalidDomain})
            .reply(200, 'not_valid ' + invalidDomain);

    return isFree(invalidDomain).should.eventually.equal('NOT_VALID');
  });

  it('should return OCCUPIED if the domain is occupied',() => {
    const occupiedDomain = 'occupied.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': occupiedDomain})
            .reply(200, 'occupied ' + occupiedDomain);

    return isFree(occupiedDomain).should.eventually.equal('OCCUPIED');
  });

  it('should reject if the call fails with a HTTP error',() => {
    const exampleDomain = 'example.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': exampleDomain})
            .reply(500, 'occupied ' + exampleDomain);

    return isFree(exampleDomain).should.eventually.be.rejected;
  });

  it('should reject if the call returns something unknown',() => {
    const exampleDomain = 'example.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': exampleDomain})
            .reply(200, 'unknown-response');

    return isFree(exampleDomain).should.eventually.be.rejected;
  });

  it('should reject if the call does not return any content',() => {
    const exampleDomain = 'example.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': exampleDomain})
            .reply(200, null);

    return isFree(exampleDomain).should.eventually.be.rejected;
  });
});

describe('checking isFree for an internationalized domain', () => {
  it('should return FREE if the domain is available',() => {
    const availableDomain = 'räksmörgås.se',
          availableDomainEncoded = 'xn--rksmrgs-5wao1o.se',
          nockServer = nock(serverUrl)
            .get('/free')
            .query({'q': availableDomainEncoded})
            .reply(200, 'free ' + availableDomainEncoded)

    return isFree(availableDomain).should.eventually.equal('FREE');
  });
});
