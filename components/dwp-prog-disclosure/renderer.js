'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  template.render({
    summary: input.summary,
    renderBody: input.renderBody
  }, out);
};
