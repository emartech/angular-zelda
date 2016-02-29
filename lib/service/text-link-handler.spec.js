'use strict';

const targets = require('zelda-js').targets;
const Service = require('./text-link-handler');

describe('Text Link Handler', function() {

  const createService = (options = { tokens: ['$token 1$'] }) => {
    const service = new Service();
    service.setOptions(options);
    return service;
  };

  describe('#setTokens', function() {

    it('should not recognize tokens in urls when tokens not set through options', function() {
      const service = new Service();
      const urls = service.collectUrls('http://google.com?$token 1$');
      this.expect(urls).to.be.eql(['http://google.com?$token']);
    });

    it('should recognize tokens in urls when tokens set through options', function() {
      const service = createService();
      const urls = service.collectUrls('http://google.com?$token 1$');
      this.expect(urls).to.be.eql(['http://google.com?$token 1$']);
    });

  });

  describe('#colelctLinks', function() {

    it('should collect urls with tokens from plain text', function() {
      const service = createService();
      const urls = service.collectUrls('http://google.com?$token 1$, http://google.com?$token 1$');
      this.expect(urls).to.be.eql(['http://google.com?$token 1$', 'http://google.com?$token 1$']);
    });

  });

  describe('#linkify', function() {

    it('should collect urls with tokens from plain text', function() {
      const service = createService();
      const transformedText = service.linkify('http://google.com?$token 1$');
      this.expect(transformedText).to.be.eql('<a href="http://google.com?$token 1$">http://google.com?$token 1$</a>');
    });

    it('should collect urls with tokens from plain text and add target if it is given', function() {
      const service = createService();
      const transformedText = service.linkify('http://google.com?$token 1$', targets.SELF);
      this.expect(transformedText)
        .to.be.eql('<a href="http://google.com?$token 1$" target="_self">http://google.com?$token 1$</a>');
    });

  });

});
