'use strict';

module.exports = function (strings) {
  return strings.reduce((acc, val, index) => {
    return acc +
      (val + (arguments[index + 1] || ''))
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*<\s*/g, '<')
        .replace('\n', '')
        .replace(/\s{2,}/g, ' ');
  }, '');
};
