'use strict';

require('marko/node-require').install();

const marko = require('marko');
const {expect, assert} = require('chai');

const templatePath = 'fakeTemplate.marko';

describe('<gov-legal/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a content attribute', () => {
    const templateSrc = '<gov-legal/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "content" did not throw an error');
  });

  it('should render the correct markup', () => {
    const content = 'You can be fined up to £5,000 if you don’t register.';
    const templateSrc = `<gov-legal content=data.content/>`;
    const output = marko.load(templatePath, templateSrc).renderToString({content});

    expect(output).to.equal(
      '<p class="notice text">' +
        '<i class="icon icon-important">' +
          '<span class="visuallyhidden">Warning</span>' +
        '</i>' +
        `<strong class="bold-small">${content}</strong>` +
      '</p>'
    );
  });

  it('should use Welsh if lang is set to "cy"', () => {
    const content = 'Gallwch gael dirwy o hyd at £ 5,000 os nad ydych yn' +
      'cofrestru.';
    const templateSrc = `<gov-legal content=data.content lang="cy"/>`;
    const output = marko.load(templatePath, templateSrc).renderToString({content});

    expect(output).to.equal(
      '<p class="notice text">' +
        '<i class="icon icon-important">' +
          '<span class="visuallyhidden">Rhybudd</span>' +
        '</i>' +
        `<strong class="bold-small">${content}</strong>` +
      '</p>'
    );
  });
});
