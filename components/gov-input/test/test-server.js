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

test('maxlength', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', maxlength: '9'
  });
  assert.equal(output.html, html`
    <div class="form-group">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off" maxlength="9">
    </div>`
  );
});

test('hidden', context => {
  const output = context.render({
    name: 'full-name', label: 'Full name', hidden: true
  });
  assert.equal(output.html, html`
    <div class="panel panel-border-narrow js-hidden" id="group-full-name">
      <label for="input-full-name">
        <span class="form-label">Full name</span>
      </label>
      <input class="form-control" type="text" id="input-full-name"
        name="full-name" autocomplete="off">
    </div>`
  );
});
