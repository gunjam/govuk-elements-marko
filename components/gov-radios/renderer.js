'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  input.radios = input.radios || [];

  if (input.radios.length > 2) {
    input.layout = input.layout === 'inline' ? 'inline' : '';
  } else {
    input.layout = input.layout === 'stacked' ? '' : 'inline';
  }

  template.render(input, out);
};
