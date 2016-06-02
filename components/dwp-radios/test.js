'use strict';

require('marko/node-require').install();

const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');
let tc;

describe('<dwp-radios/>', () => {
  beforeEach(() => {
    tc += '_';
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc =
      `<dwp-radios legend="Happy or sad?">
         <dwp-radios:radio label="Happy" value="happy"/>
         <dwp-radios:radio label="Sad" value="sad"/>
       </dwp-radios>`;

    try {
      marko.load(tc, templateSrc);
    } catch (error) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a legend attribute', () => {
    const templateSrc =
      `<dwp-radios name="mood">
         <dwp-radios:radio label="Happy" value="happy"/>
         <dwp-radios:radio label="Sad" value="sad"/>
       </dwp-radios>`;

    try {
      marko.load(tc, templateSrc);
    } catch (error) {
      return assert(true);
    }

    assert(false, 'missing attribute "legend" did not throw an error');
  });

  it('should render the correct markup', () => {
    const templateSrc =
      '<dwp-radios name="mood" legend="Happy or sad?"/>';

    const output = marko.load(tc, templateSrc).renderSync({});

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="visuallyhidden">Happy or sad?</span>' +
          '</legend>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should add error message and classes when passed an error object', () => {
    const templateSrc =
      `<dwp-radios legend=data.legend name=data.name error=data.error>
         <dwp-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <dwp-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </dwp-radios>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      error: {
        msg: 'Please tell me how you feel'
      }
    };

    const output = marko.load(tc, templateSrc).renderSync(data);
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const error = $('legend > span.visuallyhidden + span.error-message').text();
    const errorId = $('.error-message').attr('id');

    expect(formGroupClasses).to.equal('form-group error');
    expect(error).to.equal(data.error.msg);
    expect(errorId).to.equal(`error-message-${data.name}`);
  });

  it('should select the radio which has it\'s value in the value attr', () => {
    const templateSrc =
      `<dwp-radios legend=data.legend name=data.name value=data.value>
         <dwp-radios:radio label=value=data.radios[0].label
           value=data.radios[0].value/>
         <dwp-radios:radio label=value=data.radios[1].label
           value=data.radios[1].value/>
       </dwp-radios>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      radios: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      value: 'happy'
    };

    const output = marko.load(tc, templateSrc).renderSync(data);

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="visuallyhidden">Happy or sad?</span>' +
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

  describe('<dwp-radios:radio/>', () => {
    it('should error if you don\'t supply a label attribute', () => {
      const templateSrc =
        `<dwp-radios legend="Happy or sad?" name="mood">
           <dwp-radios:radio value="happy"/>
           <dwp-radios:radio label="Sad" value="sad"/>
         </dwp-radios>`;

      try {
        marko.load(tc, templateSrc);
      } catch (error) {
        return assert(true);
      }

      assert(false, 'missing attribute "label" did not throw an error');
    });

    it('should error if you don\'t supply a value attribute', () => {
      const templateSrc =
        `<dwp-radios legend="Happy or sad?" name="mood">
           <dwp-radios:radio label="Happy"/>
           <dwp-radios:radio label="Sad" value="sad"/>
         </dwp-radios>`;

      try {
        marko.load(tc, templateSrc);
      } catch (error) {
        return assert(true);
      }

      assert(false, 'missing attribute "value" did not throw an error');
    });

    it('should render the correct markup', () => {
      const templateSrc =
        `<dwp-radios legend=data.legend name=data.name>
           <dwp-radios:radio value=data.radios[0].value
             label=data.radios[0].label/>
           <dwp-radios:radio value=data.radios[1].value
             label=data.radios[1].label/>
         </dwp-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        radios: [
          {label: 'Happy', value: 'happy'},
          {label: 'Sad', value: 'sad'}
        ]
      };

      const output = marko.load(tc, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Happy or sad?</span>' +
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
        `<dwp-radios legend=data.legend name=data.name>
           <dwp-radios:radio value=data.checkbox.value
             label=data.checkbox.label/>
         </dwp-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy'}
      };

      const output = marko.load(tc, templateSrc).renderSync(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(`radio-${data.name}-0`);
    });

    it('should use ID attribute value over generated ID', () => {
      const templateSrc =
        `<dwp-radios legend=data.legend name=data.name>
           <dwp-radios:radio value=data.checkbox.value
             id=data.checkbox.id label=data.checkbox.label/>
         </dwp-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy', id: 'my-checkbox'}
      };

      const output = marko.load(tc, templateSrc).renderSync(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(data.checkbox.id);
    });

    it('should add a form hint using the hint attribute', () => {
      const templateSrc =
        `<dwp-radios legend=data.legend name=data.name>
           <dwp-radios:radio value=data.checkbox.value
             hint=data.checkbox.hint label=data.checkbox.label/>
         </dwp-radios>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {
          label: 'Happy',
          value: 'happy',
          hint: 'Select this if you are smiling'
        }
      };

      const output = marko.load(tc, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Happy or sad?</span>' +
            '</legend>' +
            '<label for="radio-mood-0" class="block-label">' +
              '<input id="radio-mood-0" name="mood" value="happy" ' +
                'type="radio">' +
              '<span class="heading-small">Happy</span><br>' +
              'Select this if you are smiling' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should add a data-target attr to label when provided reveal id', () => {
      const templateSrc =
        `<dwp-radios legend=data.legend name=data.name>
           <dwp-radios:radio value=data.radios[0].value
             label=data.radios[0].label/>
           <dwp-radios:radio value=data.radios[1].value
             label=data.radios[1].label/>
         </dwp-radios>`;

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

      const output = marko.load(tc, templateSrc).renderSync(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Happy or sad?</span>' +
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
