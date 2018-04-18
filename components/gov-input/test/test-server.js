const assert = require('assert');
const html = require('../../../html');

test('name', context => {
  const output = context.render({name: 'full-name'});
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label"></span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('label', context => {
  const output = context.render({name: 'full-name', label: 'Full name'});
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('hint', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', hint: 'Your name'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
        <span class="form-hint">Your name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('id', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', id: 'name-field'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="name-field">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="name-field"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('error', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', error: 'Enter a name.'
  });
  assert.equal(output.html, html`
    <div class="form-group form-group-error">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
        <span id="error-message-full-name" class="error-message">
          Enter a name.
        </span>
      </label>
      <input class="form-control form-control-error" type="text"
        id="input-full-name" name="full-name" autocomplete="off">
    </div>`
  );
});

test('value', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', value: 'Hammond Eggs'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" value="Hammond Eggs" autocomplete="off">
    </div>`
  );
});

test('other', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name',
    '*': {maxlength: '9', 'data-test': 'test'}
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off" maxlength="9" data-test="test">
    </div>`
  );
});

test('group-classes undefined', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('group-classes', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', groupClasses: 'form-group-compound'
  });
  assert.equal(output.html, html`
    <div class="form-group form-group-compound">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('input-classes', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', inputClasses: 'form-control-1-4'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control form-control-1-4" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('hide-label true', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', hideLabel: true
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name" class="visually-hidden">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});

test('hide-label false', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', hideLabel: false
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});
