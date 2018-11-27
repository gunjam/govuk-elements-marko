const {assert} = require('chai');
const html = require('../../../html');

test('name', context => {
  const output = context.render({name: 'contact-by-text-phone'});
  assert.equal(output.html.toString(), html`
    <div class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" type="checkbox">
      <label for="checkbox-contact-by-text-phone"></label>
    </div>`);
});

test('label', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone'
  });
  assert.equal(output.html.toString(), html`
    <div class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" type="checkbox">
      <label for="checkbox-contact-by-text-phone">I need to be contacted using a text phone</label>
    </div>`);
});

test('value', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone',
    value: 'true'
  });
  assert.equal(output.html.toString(), html`
    <div class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" value="true" type="checkbox">
      <label for="checkbox-contact-by-text-phone">I need to be contacted using a text phone</label>
    </div>`);
});

test('hint', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone',
    hint: 'Hint.',
    value: 'true'
  });
  assert.equal(output.html.toString(), html`
    <div class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" value="true" type="checkbox">
      <label for="checkbox-contact-by-text-phone">
        <span class="heading-small">
          I need to be contacted using a text phone
        </span>
        <br>Hint.
      </label>
    </div>`);
});

test('checked', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone',
    hint: 'Hint.',
    value: 'true',
    checked: true
  });
  assert.equal(output.html.toString(), html`
    <div class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" value="true" type="checkbox" checked>
      <label for="checkbox-contact-by-text-phone">
        <span class="heading-small">
          I need to be contacted using a text phone
        </span>
        <br>Hint.
      </label>
    </div>`);
});

test('reveal', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone',
    hint: 'Hint.',
    value: 'true',
    checked: true,
    reveal: 'section'
  });
  assert.equal(output.html.toString(), html`
    <div data-target="section" class="multiple-choice">
      <input id="checkbox-contact-by-text-phone" name="contact-by-text-phone" value="true" type="checkbox" checked>
      <label for="checkbox-contact-by-text-phone">
        <span class="heading-small">
          I need to be contacted using a text phone
        </span>
        <br>Hint.
      </label>
    </div>`);
});

test('id', context => {
  const output = context.render({
    name: 'contact-by-text-phone',
    label: 'I need to be contacted using a text phone',
    hint: 'Hint.',
    value: 'true',
    checked: true,
    reveal: 'section',
    id: 'my-checkbox'
  });
  assert.equal(output.html.toString(), html`
    <div data-target="section" class="multiple-choice">
      <input id="my-checkbox" name="contact-by-text-phone" value="true" type="checkbox" checked>
      <label for="my-checkbox">
        <span class="heading-small">
          I need to be contacted using a text phone
        </span>
        <br>Hint.
      </label>
    </div>`);
});
