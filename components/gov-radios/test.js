'use strict';

require('marko/node-require').install();
const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');

const templatePath = 'fakeTemplate.marko';

describe('<gov-radios/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc =
      `<gov-radios legend="Happy or sad?">
         <gov-radios:radio label="Happy" value="happy"/>
         <gov-radios:radio label="Sad" value="sad"/>
       </gov-radios>`;

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a legend attribute', () => {
    const templateSrc =
      `<gov-radios name="mood">
         <gov-radios:radio label="Happy" value="happy"/>
         <gov-radios:radio label="Sad" value="sad"/>
       </gov-radios>`;

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "legend" did not throw an error');
  });

  it('should render the correct markup', () => {
    const templateSrc =
      '<gov-radios name="mood" legend="Happy or sad?"/>';

    const output = marko.load(templatePath, templateSrc).renderSync({});

    expect(output).to.equal(
      '<div class="form-group inline">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label">Happy or sad?</span>' +
          '</legend>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should add a form hint using the hint attribute', () => {
    const templateSrc =
      '<gov-radios name="mood" legend="Happy or sad?" hint="Your mood"/>';

    const output = marko.load(templatePath, templateSrc).renderSync({});

    expect(output).to.equal(
      '<div class="form-group inline">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label">Happy or sad?</span>' +
            '<span class="form-hint">Your mood</span>' +
          '</legend>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should add error message and classes when passed an error object', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name error=data.error>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      error: 'Please tell me how you feel'
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const error = $('legend > span.form-label + span.error-message').text();
    const errorId = $('.error-message').attr('id');

    expect(formGroupClasses).to.equal('form-group inline error');
    expect(error).to.equal(data.error);
    expect(errorId).to.equal(`error-message-${data.name}`);
  });

  it('should select the radio which has it\'s value in the value attr', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name value=data.value>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      value: 'happy'
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);

    expect(output).to.equal(
      '<div class="form-group inline">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label">Happy or sad?</span>' +
          '</legend>' +
          '<label for="radio-mood-0" class="block-label">' +
            '<input id="radio-mood-0" name="mood" value="happy" type="radio" ' +
              'checked>' +
            'Happy' +
          '</label>' +
          '<label for="radio-mood-1" class="block-label">' +
            '<input id="radio-mood-1" name="mood" value="sad" type="radio">' +
            'Sad' +
          '</label>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should remove inline style if there is more than 2 radios', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
         <gov-radios:radio label=value=data.radios[2].label
           value=data.radios[2].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'},
        {label: 'Neither', value: 'neither'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const classes = $('div.form-group').attr('class');

    expect(classes).to.equal('form-group');
  });

  it('should set inline style when layout attribute is "inline"', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name layout=data.layout>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
         <gov-radios:radio label=value=data.radios[2].label
           value=data.radios[2].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      layout: 'inline',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'},
        {label: 'Neither', value: 'neither'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const classes = $('div.form-group').attr('class');

    expect(classes).to.equal('form-group inline');
  });

  it('should remove inline style when layout attribute is "stacked"', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name layout=data.layout>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      layout: 'stacked',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const classes = $('div.form-group').attr('class');

    expect(classes).to.equal('form-group');
  });

  it('should add vissuallyhidden class to legend if hide-legend true', () => {
    const templateSrc =
      `<gov-radios legend=data.legend name=data.name layout=data.layout
         hide-legend=(true)>
         <gov-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <gov-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </gov-radios>`;

    const data = {
      legend: 'Happy or sad?',
      layout: 'stacked',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const classes = $('legend > span:first-child').attr('class');

    expect(classes).to.equal('visuallyhidden');
  });

  describe('<gov-radios:radio/>', () => {
    it('should error if you don\'t supply a label attribute', () => {
      const templateSrc =
        `<gov-radios legend="Happy or sad?" name="mood">
           <gov-radios:radio value="happy"/>
           <gov-radios:radio label="Sad" value="sad"/>
         </gov-radios>`;

      try {
        marko.load(templatePath, templateSrc);
      } catch (err) {
        return assert(true);
      }

      assert(false, 'missing attribute "label" did not throw an error');
    });

    it('should error if you don\'t supply a value attribute', () => {
      const templateSrc =
        `<gov-radios legend="Happy or sad?" name="mood">
           <gov-radios:radio label="Happy"/>
           <gov-radios:radio label="Sad" value="sad"/>
         </gov-radios>`;

      try {
        marko.load(templatePath, templateSrc);
      } catch (err) {
        return assert(true);
      }

      assert(false, 'missing attribute "value" did not throw an error');
    });

    it('should render the correct markup', () => {
      const templateSrc =
        `<gov-radios legend=data.legend name=data.name>
           <gov-radios:radio value=data.radios[0].value
             label=data.radios[0].label/>
           <gov-radios:radio value=data.radios[1].value
             label=data.radios[1].label/>
         </gov-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        radios: [
          {label: 'Happy', value: 'happy'},
          {label: 'Sad', value: 'sad'}
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group inline">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label">Happy or sad?</span>' +
            '</legend>' +
            '<label for="radio-mood-0" class="block-label">' +
              '<input id="radio-mood-0" name="mood" value="happy" ' +
                'type="radio">' +
              'Happy' +
            '</label>' +
            '<label for="radio-mood-1" class="block-label">' +
              '<input id="radio-mood-1" name="mood" value="sad" ' +
                'type="radio">' +
              'Sad' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should set the ID as radio-${name}-${index} if no ID attr', () => {
      const templateSrc =
        `<gov-radios legend=data.legend name=data.name>
           <gov-radios:radio value=data.checkbox.value
             label=data.checkbox.label/>
         </gov-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy'}
      };

      const output = marko.load(templatePath, templateSrc).renderSync(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(`radio-${data.name}-0`);
    });

    it('should use ID attribute value over generated ID', () => {
      const templateSrc =
        `<gov-radios legend=data.legend name=data.name>
           <gov-radios:radio value=data.checkbox.value
             id=data.checkbox.id label=data.checkbox.label/>
         </gov-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy', id: 'my-checkbox'}
      };

      const output = marko.load(templatePath, templateSrc).renderSync(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(data.checkbox.id);
    });

    it('should add a form hint using the hint attribute', () => {
      const templateSrc =
        `<gov-radios legend=data.legend name=data.name>
           <gov-radios:radio value=data.radios[0].value
             label=data.radios[0].label/>
           <gov-radios:radio value=data.radios[1].value
             label=data.radios[1].label/>
         </gov-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        radios: [
          {
            label: 'Happy',
            value: 'happy',
            hint: 'Select this if you are smiling'
          },
          {
            label: 'Sad',
            value: 'sad',
            hint: 'This is the mood of a ghost'
          }
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group inline">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label">Happy or sad?</span>' +
            '</legend>' +
            '<label for="radio-mood-0" class="block-label">' +
              '<input id="radio-mood-0" name="mood" value="happy" ' +
                'type="radio">' +
              'Happy' +
            '</label>' +
            '<label for="radio-mood-1" class="block-label">' +
              '<input id="radio-mood-1" name="mood" value="sad" ' +
                'type="radio">' +
              'Sad' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should add a data-target attr to label when provided reveal id', () => {
      const templateSrc =
        `<gov-radios legend=data.legend name=data.name>
           <gov-radios:radio value=data.radios[0].value
             label=data.radios[0].label/>
           <gov-radios:radio value=data.radios[1].value
             label=data.radios[1].label/>
         </gov-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        radios: [
          {
            label: 'Happy',
            value: 'happy',
            hint: 'Select this if you are smiling'
          },
          {
            reveal: 'cheer-up-message',
            label: 'Sad',
            value: 'sad',
            hint: 'This is the mood of a ghost'
          }
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group inline">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label">Happy or sad?</span>' +
            '</legend>' +
            '<label for="radio-mood-0" class="block-label">' +
              '<input id="radio-mood-0" name="mood" value="happy" ' +
                'type="radio">' +
              'Happy' +
            '</label>' +
            '<label for="radio-mood-1" class="block-label">' +
              '<input id="radio-mood-1" name="mood" value="sad" ' +
                'type="radio">' +
              'Sad' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });
  });
});
