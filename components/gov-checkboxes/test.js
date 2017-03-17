'use strict';

require('marko/node-require').install();
const marko = require('marko');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');

const templatePath = 'fakeTemplate.marko';

describe('<gov-checkboxes/>', () => {
  afterEach(() => {
    delete require.cache[`${templatePath}.js`];
  });

  it('should error if you don\'t supply a name attribute', () => {
    const templateSrc =
      `<gov-checkboxes legend="Happy or sad?">
         <gov-checkboxes:checkbox label="Happy" value="happy"/>
         <gov-checkboxes:checkbox label="Sad" value="sad"/>
       </gov-checkboxes>`;

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "name" did not throw an error');
  });

  it('should error if you don\'t supply a legend attribute', () => {
    const templateSrc =
      `<gov-checkboxes name="mood">
         <gov-checkboxes:checkbox label="Happy" value="happy"/>
         <gov-checkboxes:checkbox label="Sad" value="sad"/>
       </gov-checkboxes>`;

    try {
      marko.load(templatePath, templateSrc);
    } catch (err) {
      return assert(true);
    }

    assert(false, 'missing attribute "legend" did not throw an error');
  });

  it('should render the correct markup', () => {
    const templateSrc =
      '<gov-checkboxes name="mood" legend="Happy or sad?"/>';

    const output = marko.load(templatePath, templateSrc).renderToString({});

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label-bold">Happy or sad?</span>' +
          '</legend>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should add a form hint using the hint attribute', () => {
    const templateSrc =
      '<gov-checkboxes name="mood" legend="Happy or sad?" hint="Your mood"/>';

    const output = marko.load(templatePath, templateSrc).renderToString({});

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label-bold">Happy or sad?</span>' +
            '<span class="form-hint">Your mood</span>' +
          '</legend>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should add error message and classes when passed an error object', () => {
    const templateSrc =
      `<gov-checkboxes legend=data.legend name=data.name error=data.error>
         <gov-checkboxes:checkbox label=value=data.checkboxes[0].label
           value=data.checkboxes[0].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[1].label
           value=data.checkboxes[1].value/>
       </gov-checkboxes>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      checkboxes: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      error: 'Please tell me how you feel'
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const error = $('legend > span.form-label-bold + span.error-message').text();
    const errorId = $('.error-message').attr('id');

    expect(formGroupClasses).to.equal('form-group form-group-error');
    expect(error).to.equal(data.error);
    expect(errorId).to.equal(`error-message-${data.name}`);
  });

  it('should select the checkbox which has it\'s value in the value attr', () => {
    const templateSrc =
      `<gov-checkboxes legend=data.legend name=data.name values=data.values>
         <gov-checkboxes:checkbox label=value=data.checkboxes[0].label
           value=data.checkboxes[0].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[1].label
           value=data.checkboxes[1].value/>
       </gov-checkboxes>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      checkboxes: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ],
      values: ['happy']
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="form-label-bold">Happy or sad?</span>' +
          '</legend>' +
          '<div class="multiple-choice">' +
            '<input id="checkbox-mood-0" name="mood" value="happy" type="checkbox" ' +
              'checked>' +
            '<label for="checkbox-mood-0">' +
              'Happy' +
            '</label>' +
          '</div>' +
          '<div class="multiple-choice">' +
            '<input id="checkbox-mood-1" name="mood" value="sad" type="checkbox">' +
            '<label for="checkbox-mood-1">' +
              'Sad' +
            '</label>' +
          '</div>' +
        '</fieldset>' +
      '</div>'
    );
  });

  it('should remove inline style if there is more than 2 checkboxes', () => {
    const templateSrc =
      `<gov-checkboxes legend=data.legend name=data.name>
         <gov-checkboxes:checkbox label=value=data.checkboxes[0].label
           value=data.checkboxes[0].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[1].label
           value=data.checkboxes[1].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[2].label
           value=data.checkboxes[2].value/>
       </gov-checkboxes>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      checkboxes: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'},
        {label: 'Neither', value: 'neither'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const classes = $('fieldset').attr('class');

    expect(classes).to.equal(undefined);
  });

  it('should add vissuallyhidden class to legend if hide-legend true', () => {
    const templateSrc =
      `<gov-checkboxes legend=data.legend name=data.name hide-legend=(true)>
         <gov-checkboxes:checkbox label=value=data.checkboxes[0].label
           value=data.checkboxes[0].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[1].label
           value=data.checkboxes[1].value/>
       </gov-checkboxes>`;

    const data = {
      legend: 'Happy or sad?',
      name: 'mood',
      checkboxes: [
        {label: 'Happy', value: 'happy'},
        {label: 'Sad', value: 'sad'}
      ]
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const classes = $('legend > span:first-child').attr('class');

    expect(classes).to.equal('visuallyhidden');
  });

  describe('<gov-checkboxes:checkbox/>', () => {
    it('should error if you don\'t supply a label attribute', () => {
      const templateSrc =
        `<gov-checkboxes legend="Happy or sad?" name="mood">
           <gov-checkboxes:checkbox value="happy"/>
           <gov-checkboxes:checkbox label="Sad" value="sad"/>
         </gov-checkboxes>`;

      try {
        marko.load(templatePath, templateSrc);
      } catch (err) {
        return assert(true);
      }

      assert(false, 'missing attribute "label" did not throw an error');
    });

    it('should error if you don\'t supply a value attribute', () => {
      const templateSrc =
        `<gov-checkboxes legend="Happy or sad?" name="mood">
           <gov-checkboxes:checkbox label="Happy"/>
           <gov-checkboxes:checkbox label="Sad" value="sad"/>
         </gov-checkboxes>`;

      try {
        marko.load(templatePath, templateSrc);
      } catch (err) {
        return assert(true);
      }

      assert(false, 'missing attribute "value" did not throw an error');
    });

    it('should render the correct markup', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkboxes[0].value
             label=data.checkboxes[0].label/>
           <gov-checkboxes:checkbox value=data.checkboxes[1].value
             label=data.checkboxes[1].label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkboxes: [
          {label: 'Happy', value: 'happy'},
          {label: 'Sad', value: 'sad'}
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label-bold">Happy or sad?</span>' +
            '</legend>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-0" name="mood" value="happy" type="checkbox">' +
              '<label for="checkbox-mood-0">' +
                'Happy' +
              '</label>' +
            '</div>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-1" name="mood" value="sad" type="checkbox">' +
              '<label for="checkbox-mood-1">' +
                'Sad' +
              '</label>' +
            '</div>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should set the ID as checkbox-{name}-{index} if no ID attr', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkbox.value
             label=data.checkbox.label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy'}
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(`checkbox-${data.name}-0`);
    });

    it('should use ID attribute value over generated ID', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkbox.value
             id=data.checkbox.id label=data.checkbox.label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkbox: {label: 'Happy', value: 'happy', id: 'my-checkbox'}
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=happy]').attr('id');

      expect(inputId).to.equal(data.checkbox.id);
    });

    it('should add a form hint using the hint attribute', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkboxes[0].value
             label=data.checkboxes[0].label hint=data.checkboxes[0].hint/>
           <gov-checkboxes:checkbox value=data.checkboxes[1].value
             label=data.checkboxes[1].label hint=data.checkboxes[1].hint/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkboxes: [
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

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label-bold">Happy or sad?</span>' +
            '</legend>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-0" name="mood" value="happy" type="checkbox">' +
              '<label for="checkbox-mood-0">' +
                '<span class="heading-small">' +
                  'Happy' +
                '</span>' +
                '<br>' +
                'Select this if you are smiling' +
              '</label>' +
            '</div>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-1" name="mood" value="sad" type="checkbox">' +
              '<label for="checkbox-mood-1">' +
                '<span class="heading-small">' +
                  'Sad' +
                '</span>' +
                '<br>' +
                'This is the mood of a ghost' +
              '</label>' +
            '</div>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should add a data-target attr to label when provided reveal id', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkboxes[0].value
             label=data.checkboxes[0].label/>
           <gov-checkboxes:checkbox value=data.checkboxes[1].value
             label=data.checkboxes[1].label reveal=data.checkboxes[1].reveal/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkboxes: [
          {
            label: 'Happy',
            value: 'happy'
          },
          {
            reveal: 'cheer-up-message',
            label: 'Sad',
            value: 'sad'
          }
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label-bold">Happy or sad?</span>' +
            '</legend>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-0" name="mood" value="happy" type="checkbox">' +
              '<label for="checkbox-mood-0">' +
                'Happy' +
              '</label>' +
            '</div>' +
            '<div class="multiple-choice" data-target="cheer-up-message">' +
              '<input id="checkbox-mood-1" name="mood" value="sad" type="checkbox">' +
              '<label for="checkbox-mood-1">' +
                'Sad' +
              '</label>' +
            '</div>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should render mark up in body after the wrapper div', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkboxes[0].value
             label=data.checkboxes[0].label/>
           <gov-checkboxes:checkbox value=data.checkboxes[1].value
             label=data.checkboxes[1].label>
             <p>Bonus paragraph</p>
           </gov-checkboxes:checkbox>
         </gov-checkboxes>`;

      const data = {
        legend: 'Happy or sad?',
        name: 'mood',
        checkboxes: [
          {
            label: 'Happy',
            value: 'happy'
          },
          {
            label: 'Sad',
            value: 'sad'
          }
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="form-label-bold">Happy or sad?</span>' +
            '</legend>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-0" name="mood" value="happy" type="checkbox">' +
              '<label for="checkbox-mood-0">' +
                'Happy' +
              '</label>' +
            '</div>' +
            '<div class="multiple-choice">' +
              '<input id="checkbox-mood-1" name="mood" value="sad" type="checkbox">' +
              '<label for="checkbox-mood-1">' +
                'Sad' +
              '</label>' +
            '</div>' +
            '<p>Bonus paragraph</p>' +
          '</fieldset>' +
        '</div>'
      );
    });
  });
});
