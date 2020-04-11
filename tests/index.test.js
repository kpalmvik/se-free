import nock from 'nock';

import isFree from '../src/index';

const serverUrl = 'http://free.iis.se/';

describe('checking isFree for a domain', () => {
  it('should resolve to FREE if the domain is available', () => {
    const availableDomain = 'available.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: availableDomain })
      .reply(200, `free ${availableDomain}`);

    return expect(isFree(availableDomain)).resolves.toBe('FREE');
  });

  it('should resolve to NOT_VALID if the domain is not valid', () => {
    const invalidDomain = 'not_valid.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: invalidDomain })
      .reply(200, `not_valid ${invalidDomain}`);

    return expect(isFree(invalidDomain)).resolves.toBe('NOT_VALID');
  });

  it('should resolve to OCCUPIED if the domain is occupied', () => {
    const occupiedDomain = 'occupied.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: occupiedDomain })
      .reply(200, `occupied ${occupiedDomain}`);

    return expect(isFree(occupiedDomain)).resolves.toBe('OCCUPIED');
  });

  it('should reject if the call fails with a HTTP error', () => {
    const exampleDomain = 'example.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: exampleDomain })
      .reply(500, `occupied ${exampleDomain}`);

    return expect(isFree(exampleDomain)).rejects.toThrow(new Error('Internal Server Error'));
  });

  it('should reject if the request returns an unknown response', () => {
    const exampleDomain = 'example.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: exampleDomain })
      .reply(200, 'unknown-response');

    return expect(isFree(exampleDomain)).rejects.toThrow(new Error('Unknown error'));
  });

  it('should reject if the request does not return any content', () => {
    const exampleDomain = 'example.se';
    nock(serverUrl)
      .get('/free')
      .query({ q: exampleDomain })
      .reply(200, null);

    return expect(isFree(exampleDomain)).rejects.toThrow(new Error('Unknown error'));
  });
});

describe('checking isFree for an internationalized domain', () => {
  it('should resolve to FREE if the domain is available', () => {
    const availableDomain = 'räksmörgås.se';
    const availableDomainEncoded = 'xn--rksmrgs-5wao1o.se';

    nock(serverUrl)
      .get('/free')
      .query({ q: availableDomainEncoded })
      .reply(200, `free ${availableDomainEncoded}`);

    return expect(isFree(availableDomain)).resolves.toBe('FREE');
  });
});
