const chai = require('chai'),
      should = chai.should(),
      chaiAsPromised = require('chai-as-promised'),
      nock = require('nock'),
      isFree = require('../src/index.js'),
      serverUrl = 'http://free.iis.se/';

chai.use(chaiAsPromised);

describe('checking isFree for a domain', () => {
  it('should return FREE if the domain is available',() => {
    const availableDomain = 'www.available.se';
    const nockServer = nock(serverUrl)
                    .get('/free?q=' + availableDomain)
                    .reply(200, 'free ' + availableDomain);

    return isFree(availableDomain).should.eventually.equal('FREE');
  });
});
