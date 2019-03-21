'use strict';

const MODULE_NAME = 'zelda';
const Linkify = require('./filter/linkify');
const targets = require('zelda-js').targets;
const zeldaFactory = require('zelda-js').zeldaFactory;

module.exports = function(angular) {
  angular
    .module(MODULE_NAME, [])
    .filter('linkify', Linkify.create())
    .constant('linkTargets', targets)
    .provider('textLinkHandler', function() {
      let tokens = [];
      let placeholders = [];

      return {
        setTokens: function(value) {
          tokens = value;
        },

        setPlaceholders: function(value) {
          placeholders = value;
        },

        $get: [function() {
          return zeldaFactory(tokens, placeholders);
        }]
      };
    });

  return MODULE_NAME;
};

