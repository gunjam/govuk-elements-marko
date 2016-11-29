'use strict';

require('marko/node-require').install();

const marko = require('marko');
const {expect} = require('chai');

const templatePath = 'fakeTemplate.marko';

describe('<gov-error-summary/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should render a header, summary and list of error links', () => {
    const templateSrc =
      `<gov-error-summary heading=data.heading summary=data.summary
         errors=data.errors/>`;

    const data = {
      heading: 'You have errors!',
      summary: 'Fix your errors.',
      errors: {
        colour: 'Pick a colour',
        age: 'You are too old'
      }
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);

    expect(output).to.equal(
      '<div class="error-summary" role="group" ' +
        'aria-labelledby="error-summary-heading" tabindex="-1">' +
        '<h1 class="heading-medium error-summary-heading" ' +
          'id="error-summary-heading">' +
            'You have errors!' +
        '</h1>' +
        '<p>Fix your errors.</p>' +
        '<ul class="error-summary-list">' +
          '<li><a href="#error-message-colour">Pick a colour</a></li>' +
          '<li><a href="#error-message-age">You are too old</a></li>' +
        '</ul>' +
      '</div>'
    );
  });

  it('should render without summary <p> if no summary is supplied', () => {
    const templateSrc =
      `<gov-error-summary heading=data.heading summary=data.summary
         errors=data.errors/>`;

    const data = {
      heading: 'You have errors!',
      errors: {
        colour: 'Pick a colour',
        age: 'You are too old'
      }
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);

    expect(output).to.equal(
      '<div class="error-summary" role="group" ' +
        'aria-labelledby="error-summary-heading" tabindex="-1">' +
        '<h1 class="heading-medium error-summary-heading" ' +
          'id="error-summary-heading">' +
            'You have errors!' +
        '</h1>' +
        '<ul class="error-summary-list">' +
          '<li><a href="#error-message-colour">Pick a colour</a></li>' +
          '<li><a href="#error-message-age">You are too old</a></li>' +
        '</ul>' +
      '</div>'
    );
  });

  it('should not render if there are no errors', () => {
    const templateSrc =
      `<gov-error-summary heading=data.heading summary=data.summary
         errors=data.errors/>`;

    const data = {
      heading: 'You have errors!',
      summary: 'Fix your errors.'
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);

    expect(output).to.equal('');
  });
});
