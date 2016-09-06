'use strict';

require('marko/node-require').install();

const marko = require('marko');
const {expect} = require('chai');

describe('<gov-date-input/>', () => {
  it('should render the correct markup', () => {
    const templateSrc = '<gov-beta-banner>Description</gov-beta-banner>';
    const output = marko.load('betaBanner', templateSrc).renderSync({});

    expect(output).to.equal(
      '<div class="phase-banner-beta">' +
        '<p>' +
          '<strong class="phase-tag">BETA</strong>' +
          '<span>Description</span>' +
        '</p>' +
      '</div>'
    );
  });
});
