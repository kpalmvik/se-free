var expect = require('chai').expect;

describe('calling the default Hello function', function(){
  it('should return Hello',function(){
    var hello = require('./index.js');
    expect(hello()).to.equal('Hello');
  });
});
