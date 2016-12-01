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
      `<gov-checkboxes legend="Favourite colour?">
         <gov-checkboxes:checkbox label="Red" value="red"/>
         <gov-checkboxes:checkbox label="Blue" value="blue"/>
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
      `<gov-checkboxes name="colour">
         <gov-checkboxes:checkbox label="Red" value="red"/>
         <gov-checkboxes:checkbox label="Blue" value="blue"/>
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
      '<gov-checkboxes name="colour" legend="Favourite colour?"/>';

    const output = marko.load(templatePath, templateSrc).renderToString({});

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="visuallyhidden">Favourite colour?</span>' +
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
      legend: 'Favourite colour?',
      name: 'colour',
      checkboxes: [
        {label: 'Red', value: 'red'},
        {label: 'Blue', value: 'blue'}
      ],
      error: 'Please pick a colour'
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const error = $('legend > span.visuallyhidden + span.error-message').text();
    const errorId = $('.error-message').attr('id');

    expect(formGroupClasses).to.equal('form-group error');
    expect(error).to.equal(data.error);
    expect(errorId).to.equal(`error-message-${data.name}`);
  });

  it('should check boxes which have values in the values array attr', () => {
    const templateSrc =
      `<gov-checkboxes legend=data.legend name=data.name values=data.values>
         <gov-checkboxes:checkbox label=value=data.checkboxes[0].label
           value=data.checkboxes[0].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[1].label
           value=data.checkboxes[1].value/>
         <gov-checkboxes:checkbox label=value=data.checkboxes[2].label
           value=data.checkboxes[2].value/>
       </gov-checkboxes>`;

    const data = {
      legend: 'Favourite colour?',
      name: 'colour',
      checkboxes: [
        {label: 'Red', value: 'red'},
        {label: 'Blue', value: 'blue'},
        {label: 'Green', value: 'green'}
      ],
      values: ['red', 'green']
    };

    const output = marko.load(templatePath, templateSrc).renderToString(data);

    expect(output).to.equal(
      '<div class="form-group">' +
        '<fieldset>' +
          '<legend>' +
            '<span class="visuallyhidden">Favourite colour?</span>' +
          '</legend>' +
          '<label for="checkbox-colour-0" class="block-label">' +
            '<input id="checkbox-colour-0" name="colour" value="red" ' +
              'type="checkbox" checked="checked">' +
            'Red' +
          '</label>' +
          '<label for="checkbox-colour-1" class="block-label">' +
            '<input id="checkbox-colour-1" name="colour" value="blue" ' +
              'type="checkbox">' +
            'Blue' +
          '</label>' +
          '<label for="checkbox-colour-2" class="block-label">' +
            '<input id="checkbox-colour-2" name="colour" value="green" ' +
              'type="checkbox" checked="checked">' +
            'Green' +
          '</label>' +
        '</fieldset>' +
      '</div>'
    );
  });

  describe('<gov-checkboxes:checkbox/>', () => {
    it('should error if you don\'t supply a label attribute', () => {
      const templateSrc =
        `<gov-checkboxes legend="Favourite colour?" name="colour">
           <gov-checkboxes:checkbox value="red"/>
           <gov-checkboxes:checkbox label="Blue" value="blue"/>
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
        `<gov-checkboxes legend="Favourite colour?" name="colour">
           <gov-checkboxes:checkbox label="Red"/>
           <gov-checkboxes:checkbox label="Blue" value="blue"/>
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
        legend: 'Favourite colour?',
        name: 'colour',
        checkboxes: [
          {label: 'Red', value: 'red'},
          {label: 'Blue', value: 'blue'}
        ]
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Favourite colour?</span>' +
            '</legend>' +
            '<label for="checkbox-colour-0" class="block-label">' +
              '<input id="checkbox-colour-0" name="colour" value="red" ' +
                'type="checkbox">' +
              'Red' +
            '</label>' +
            '<label for="checkbox-colour-1" class="block-label">' +
              '<input id="checkbox-colour-1" name="colour" value="blue" ' +
                'type="checkbox">' +
              'Blue' +
            '</label>' +
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
        legend: 'Favourite colour?',
        name: 'colour',
        checkbox: {label: 'Red', value: 'red'}
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=red]').attr('id');

      expect(inputId).to.equal(`checkbox-${data.name}-0`);
    });

    it('should use ID attribute value over generated ID', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkbox.value
             id=data.checkbox.id label=data.checkbox.label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Favourite colour?',
        name: 'colour',
        checkbox: {label: 'Red', value: 'red', id: 'my-checkbox'}
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);
      const $ = cheerio.load(output);
      const inputId = $('input[value=red]').attr('id');

      expect(inputId).to.equal(data.checkbox.id);
    });

    it('should add a form hint using the hint attribute', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkbox.value
             hint=data.checkbox.hint label=data.checkbox.label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Favourite colour?',
        name: 'colour',
        checkbox: {label: 'Red', value: 'red', hint: 'Blood is this colour'}
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Favourite colour?</span>' +
            '</legend>' +
            '<label for="checkbox-colour-0" class="block-label">' +
              '<input id="checkbox-colour-0" name="colour" value="red" ' +
                'type="checkbox">' +
              '<span class="heading-small">Red</span><br>' +
              'Blood is this colour' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });

    it('should add a data-target attr to label when provided reveal id', () => {
      const templateSrc =
        `<gov-checkboxes legend=data.legend name=data.name>
           <gov-checkboxes:checkbox value=data.checkbox.value
             reveal=data.checkbox.reveal hint=data.checkbox.hint
             label=data.checkbox.label/>
         </gov-checkboxes>`;

      const data = {
        legend: 'Favourite colour?',
        name: 'colour',
        checkbox: {
          reveal: 'spooky-ghost',
          label: 'Grey',
          value: 'grey',
          hint: 'This is the colour of a ghost'
        }
      };

      const output = marko.load(templatePath, templateSrc).renderToString(data);

      expect(output).to.equal(
        '<div class="form-group">' +
          '<fieldset>' +
            '<legend>' +
              '<span class="visuallyhidden">Favourite colour?</span>' +
            '</legend>' +
            '<label for="checkbox-colour-0" class="block-label" ' +
              'data-target="spooky-ghost">' +
              '<input id="checkbox-colour-0" name="colour" value="grey" ' +
                'type="checkbox">' +
              '<span class="heading-small">Grey</span><br>' +
              'This is the colour of a ghost' +
            '</label>' +
          '</fieldset>' +
        '</div>'
      );
    });
  });
});
