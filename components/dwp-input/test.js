'use strict';

require('marko/node-require').install();

const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');
const template = require('./template.marko');

const templatePath = 'fakeTemplate.marko';

describe('<dwp-input/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc = '<dwp-input label=data.label/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a label attribute', () => {
    const templateSrc = '<dwp-input name=data.name/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "label" did not throw an error');
  });

  it('should render the correct markup', () => {
    const output = template.renderSync({
      label: 'Full name',
      name: 'full-name'
    });

    expect(output).to.equal(
      '<div class="form-group">' +
        '<label for="input-full-name">' +
          '<span class="form-label">Full name</span>' +
        '</label>' +
        '<input class="form-control" type="text" id="input-full-name" ' +
          'name="full-name" autocomplete="off">' +
      '</div>'
    );
  });

  it('should set the ID as input-${name} if ID attr not supplied', () => {
    const name = 'full-name';
    const output = template.renderSync({
      label: 'Full name',
      name
    });
    const $ = cheerio.load(output);
    const inputId = $('input').attr('id');

    expect(inputId).to.equal(`input-${name}`);
  });

  it('should use ID attribute value over generated input-${name} ID', () => {
    const id = 'my-id';
    const output = template.renderSync({
      label: 'Full name',
      name: 'full-name',
      id
    });
    const $ = cheerio.load(output);
    const inputId = $('input').attr('id');

    expect(inputId).to.equal(id);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'All your names';
    const output = template.renderSync({
      label: 'Full name',
      name: 'full-name',
      hint
    });
    const $ = cheerio.load(output);
    const formHintText = $('label .form-label + span.form-hint').html();

    expect(formHintText).to.equal(hint);
  });

  it('should add maxlength to input using the maxlength attribute', () => {
    const maxlength = '20';
    const output = template.renderSync({
      label: 'Full name',
      name: 'full-name',
      maxlength
    });
    const $ = cheerio.load(output);
    const inputMaxlength = $('input').attr('maxlength');

    expect(inputMaxlength).to.equal(maxlength);
  });

  it('should set the value of the input using the value attribute', () => {
    const value = 'Testy McTesterson';
    const output = template.renderSync({
      label: 'Full name',
      name: 'full-name',
      value
    });
    const $ = cheerio.load(output);
    const inputValue = $('input').attr('value');

    expect(inputValue).to.equal(value);
  });

  it('should add error message and classes when passed an error object', () => {
    const error = {msg: 'Name is wrong'};
    const name = 'full-name';
    const output = template.renderSync({
      label: 'Full name',
      name,
      error
    });
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('label .form-label + span.error-message').text();

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error.msg);
  });
});
