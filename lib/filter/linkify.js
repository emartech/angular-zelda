'use strict';

class Linkify {

  constructor(textLinkHandler) {
    this._textLinkHandler = textLinkHandler;
  }

  linkify(text, target) {
    return this._textLinkHandler.linkify(text, target);
  }

  static create() {
    return [
      'textLinkHandler',
      (textLinkHandler) => {
        const filter = new Linkify(textLinkHandler);
        return filter.linkify.bind(filter);
      }
    ];
  }

}

module.exports = Linkify;
