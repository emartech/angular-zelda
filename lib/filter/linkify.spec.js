'use strict';

const targets = require('zelda-js').targets;
const zeldaFactory = require('zelda-js').zeldaFactory;
const Filter = require('./linkify');

describe('Linkify', function() {

  const createTextLinkHandler = (tokens = ['$token 1$']) => {
    return zeldaFactory(tokens);
  };

  const createFilter = (textLinkHandler = createTextLinkHandler()) => {
    const filter = new Filter(textLinkHandler);
    return filter.linkify.bind(filter);
  };

  describe('#linkify', function() {

    it('should linkify plain text', function() {
      const linkify = createFilter();
      const transformedText = linkify('http://$token 1$.com');
      this.expect(transformedText).to.eql('<a href="http://$token 1$.com">http://$token 1$.com</a>');
    });

    it('should linkify plain text with target if it is given', function() {
      const linkify = createFilter();
      const transformedText = linkify('http://$token 1$.com', targets.PARENT);
      this.expect(transformedText).to.eql('<a href="http://$token 1$.com" target="_parent">http://$token 1$.com</a>');
    });

    it('should not recognize uninitialized tokens in urls', function() {
      const linkify = createFilter();
      const transformedText = linkify('http://$token 2$.com', targets.SELF);
      this.expect(transformedText).to.eql('http://$token 2$.com');
    });

  });

});
