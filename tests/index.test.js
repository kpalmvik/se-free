var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var nock = require('nock'),
  helloWorld;

describe('calling the default Hello function', () => {
  beforeEach(() => {
    helloWorld = nock('http://www.helloworld.com')
                    .get('/')
                    .reply(200,
                      'Hello world'
                    );
  });

  it('should return Hello',() => {
    let hello = require('../src/index.js');
    return hello('helloworld').should.eventually.equal('Hello world');
  });
});
