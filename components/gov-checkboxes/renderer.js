'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  input.values = input.values ? input.values : [];
  input.values = input.values.constructor === Array ? input.values : [input.values];
  template.render(input, out);
};
