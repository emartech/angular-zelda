'use strict';

const MODULE_NAME = 'zelda';
const Linkify = require('./filter/linkify');
const targets = require('zelda-js').targets;
const Zelda = require('zelda-js').Zelda;

module.exports = function(angular) {
  angular
    .module(MODULE_NAME, [])
    .filter('linkify', Linkify.create())
    .constant('linkTargets', targets)
    .provider('textLinkHandler', function() {
      let tokens = [];

      return {
        setTokens: function(value) {
          tokens = value;
        },

        $get: [function() {
          return Zelda.create({ tokens: tokens });
        }]
      };
    });

  return MODULE_NAME;
};
