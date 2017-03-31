'use strict';

module.exports = function (strings, ...vars) {
  return strings.reduce((acc, val, index) => {
    return acc +
      (val + (vars[index] || ''))
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*<\s*/g, '<')
        .replace('\n', '')
        .replace(/\s{2,}/g, ' ');
  }, '');
};
