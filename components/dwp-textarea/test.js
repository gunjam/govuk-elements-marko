'use strict';

require('marko/node-require').install();

const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');
const template = require('./template.marko');

const templatePath = 'fakeTemplate.marko';

describe('<dwp-textarea/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc = '<dwp-textarea label=data.label/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a label attribute', () => {
    const templateSrc = '<dwp-textarea name=data.name/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "label" did not throw an error');
  });

  it('should render the correct markup', () => {
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details'
    });

    expect(output).to.equal(
      '<div class="form-group">' +
        '<label for="textarea-more-details">' +
          '<span class="form-label">More details</span>' +
        '</label>' +
        '<textarea class="form-control" id="textarea-more-details" ' +
          'rows="8" name="more-details"></textarea>' +
      '</div>'
    );
  });

  it('should set the ID as textarea-${name} if ID attr not supplied', () => {
    const name = 'more-details';
    const output = template.renderSync({
      label: 'More details',
      name
    });
    const $ = cheerio.load(output);
    const textareaId = $('textarea').attr('id');

    expect(textareaId).to.equal(`textarea-${name}`);
  });

  it('should use ID attribute value over generated textarea-${name} ID', () => {
    const id = 'my-id';
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details',
      id
    });
    const $ = cheerio.load(output);
    const textareaId = $('textarea').attr('id');

    expect(textareaId).to.equal(id);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'Do not include bank details';
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details',
      hint
    });
    const $ = cheerio.load(output);
    const formHintText = $('label .form-label + span.form-hint').html();

    expect(formHintText).to.equal(hint);
  });

  it('should add maxlength to textarea using the maxlength attribute', () => {
    const maxlength = '1200';
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details',
      maxlength
    });
    const $ = cheerio.load(output);
    const textareaMaxlength = $('textarea').attr('maxlength');

    expect(textareaMaxlength).to.equal(maxlength);
  });

  it('should add rows attribute to textarea using the rows attribute', () => {
    const rows = '12';
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details',
      rows
    });
    const $ = cheerio.load(output);
    const textareaRows = $('textarea').attr('rows');

    expect(textareaRows).to.equal(rows);
  });

  it('should set the value of the textarea using the value attribute', () => {
    const value = 'I really loved this service, it was great';
    const output = template.renderSync({
      label: 'More details',
      name: 'more-details',
      value
    });
    const $ = cheerio.load(output);
    const textareaText = $('textarea').text();

    expect(textareaText).to.equal(value);
  });

  it('should add error message and classes when passed an error object', () => {
    const error = {msg: 'Put something in the box'};
    const name = 'more-details';
    const output = template.renderSync({
      label: 'More details',
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
