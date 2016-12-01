'use strict';

require('marko/node-require').install();

const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');

const templatePath = 'fakeTemplate.marko';

describe('<gov-date-input/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc = '<gov-date-input legend="Date of birth" hint="Hint"/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a legend attribute', () => {
    const templateSrc = '<gov-date-input name="birth" hint="Hint"/>';

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "legend" did not throw an error');
  });

  it('should render the correct markup', () => {
    const legend = 'Date of birth';
    const hint = 'For example, 31 3 1980';
    const name = 'birth';
    const thisYear = new Date().getFullYear();

    const templateSrc =
      `<gov-date-input name="${name}" legend="${legend}" hint="${hint}"/>`;

    const output = marko.load(templatePath, templateSrc).renderToString({});

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label-bold">' +
              'Date of birth' +
            '</span>' +
            `<span class="form-hint" id="${name}-hint">` +
              'For example, 31 3 1980' +
            '</span>' +
          '</legend>' +
          '<div class="form-date">' +
            '<div class="form-group form-group-day">' +
              `<label class="form-label" for="input-${name}-day">` +
                'Day' +
              '</label>' +
              `<input class="form-control" id="input-${name}-day" ` +
                `type="number" name="${name}-day" pattern="[0-9]*" min="0" ` +
                'max="31" aria-describedby="birth-hint">' +
            '</div>' +
            '<div class="form-group form-group-month">' +
              `<label class="form-label" for="input-${name}-month">` +
                'Month' +
              '</label>' +
              `<input class="form-control" id="input-${name}-month" ` +
                `type="number" name="${name}-month" pattern="[0-9]*" ` +
                'min="0" max="12">' +
            '</div>' +
            '<div class="form-group form-group-year">' +
              `<label class="form-label" for="input-${name}-year">` +
                'Year' +
              '</label>' +
              `<input class="form-control" type="number" ` +
                `id="input-${name}-year" min="0" name="${name}-year" ` +
                `pattern="[0-9]*" max="${thisYear}">` +
            '</div>' +
          '</div>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should use ID attribute value over generated IDs', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      id: 'egg'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         id=(data.id)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const dayInputId = $('input#egg-day');
    const monthInputId = $('input#egg-month');
    const yearInputId = $('input#egg-year');
    const dayLabelFor = $('label[for="egg-day"]');
    const monthLabelFor = $('label[for="egg-month"]');
    const yearLabelFor = $('label[for="egg-year"]');

    assert(dayInputId, 'Day ID not found');
    assert(monthInputId, 'Month ID not found');
    assert(yearInputId, 'Year ID not found');
    assert(dayLabelFor, 'Matching label for Day not found');
    assert(monthLabelFor, 'Matching label for Month not found');
    assert(yearLabelFor, 'Matching label for Year not found');
  });

  it('should set the values of the inputs using the value attribute', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      value: {day: '12', month: '12', year: '2015'}
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         value=(data.value)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);

    const $ = cheerio.load(output);
    const dayValue = $('#input-birth-day').attr('value');
    const monthValue = $('#input-birth-month').attr('value');
    const yearValue = $('#input-birth-year').attr('value');

    expect(dayValue).to.equal(data.value.day);
    expect(monthValue).to.equal(data.value.month);
    expect(yearValue).to.equal(data.value.year);
  });

  it('should use camel cased name suffix if suffix="camel" is set', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      value: {day: '12', month: '12', year: '2015'},
      suffix: 'camel'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         value=(data.value) suffix=(data.suffix)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);

    const $ = cheerio.load(output);
    const dayName = $('#input-birth-day').attr('name');
    const monthName = $('#input-birth-month').attr('name');
    const yearName = $('#input-birth-year').attr('name');

    expect(dayName).to.equal('birthDay');
    expect(monthName).to.equal('birthMonth');
    expect(yearName).to.equal('birthYear');
  });

  it('should use object syntax name suffix if suffix="object" is set', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      value: {day: '12', month: '12', year: '2015'},
      suffix: 'object'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         value=(data.value) suffix=(data.suffix)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);

    const $ = cheerio.load(output);
    const dayName = $('#input-birth-day').attr('name');
    const monthName = $('#input-birth-month').attr('name');
    const yearName = $('#input-birth-year').attr('name');

    expect(dayName).to.equal('birth[day]');
    expect(monthName).to.equal('birth[month]');
    expect(yearName).to.equal('birth[year]');
  });

  it('should add error message and classes when passed an error object', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      error: 'Wrong date!'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         error=(data.error)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const legend = $('legend').html();

    expect(legend).to.equal(
      '<span class="form-label-bold">Date of birth</span>' +
      '<span class="form-hint" id="birth-hint">For example, 31 3 1980</span>' +
      '<span id="error-message-birth" class="error-message">Wrong date!</span>'
    );
  });

  it('should use the maxyear attr to set the max attr on year input', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      maxyear: '2020'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         maxyear=(data.maxyear)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const max = $('#input-birth-year').attr('max');

    expect(max).to.equal(data.maxyear);
  });

  it('should use Welsh labels if lang is set to "cy"', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      lang: 'cy'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         lang=(data.lang)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const dayText = $('[for="input-birth-day"]').text();
    const monthText = $('[for="input-birth-month"]').text();
    const yearText = $('[for="input-birth-year"]').text();

    expect(dayText).to.equal('Dydd');
    expect(monthText).to.equal('Mis');
    expect(yearText).to.equal('Blwyddyn');
  });

  it('should use English labels if lang is set to anything else', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      lang: 'egg'
    };

    const templateSrc =
      `<gov-date-input name=(data.name) legend=(data.legend) hint=(data.hint)
         lang=(data.lang)/>`;

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const dayText = $('[for="input-birth-day"]').text();
    const monthText = $('[for="input-birth-month"]').text();
    const yearText = $('[for="input-birth-year"]').text();

    expect(dayText).to.equal('Day');
    expect(monthText).to.equal('Month');
    expect(yearText).to.equal('Year');
  });
});
