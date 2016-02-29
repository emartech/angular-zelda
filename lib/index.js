'use strict';

const MODULE_NAME = 'zelda';
const TextLinkHandler = require('./services/text-link-handler');
const Linkify = require('./filter/linkify');
const targets = require('zelda-js').targets;

module.exports = function(angular) {
  angular
    .module(MODULE_NAME, [])
    .service('textLinkHandler', TextLinkHandler.create())
    .filter('linkify', Linkify.create())
    .constant('linkTargets', targets);

  return MODULE_NAME;
};
