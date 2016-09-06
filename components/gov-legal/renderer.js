'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  out.stream.req = out.stream.req || {};
  const language = input.lang || out.stream.req.language;

  if (language === 'cy') {
    input.warning = 'Rhybudd';
  } else {
    input.warning = 'Warning';
  }

  template.render(input, out);
};
