'use strict';

require('marko/node-require').install();

const marko = require('marko');
const {expect} = require('chai');

describe('<gov-prog-disclosure/>', () => {
  it('should render the correct markup', () => {
    const templateSrc =
      `<gov-prog-disclosure summary="More information">
         <p>You can have whatever you want in here</p>
         <ul>
           <li>a</li>
           <li>b</li>
           <li>c</li>
         </ul>
       </gov-prog-disclosure>`;

    const output = marko.load('test', templateSrc).renderSync({});

    expect(output).to.equal(
      '<details>' +
        '<summary>' +
          '<span class="summary">' +
            'More information' +
          '</span>' +
        '</summary>' +
        '<div class="panel-indent">' +
          '<p>You can have whatever you want in here</p>' +
          '<ul>' +
            '<li>a</li>' +
            '<li>b</li>' +
            '<li>c</li>' +
          '</ul>' +
        '</div>' +
      '</details>'
    );
  });
});
