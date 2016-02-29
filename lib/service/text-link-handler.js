'use strict';

const Zelda = require('zelda-js').Zelda;

class TextLinkHandler {

  constructor() {
    this._zelda = new Zelda();
  }

  setOptions(options) {
    this._zelda.setOptions(options);
  }

  collectUrls(text) {
    return this._zelda.collectUrls(text);
  }

  linkify(text, target) {
    return this._zelda.linkify(text, target);
  }

  static create() {
    return [TextLinkHandler];
  }

}

module.exports = TextLinkHandler;
