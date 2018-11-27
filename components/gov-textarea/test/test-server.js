const {assert} = require('chai');
const html = require('../../../html');

test('name', context => {
  const output = context.render({name: 'feedback'});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label"></span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=8 name="feedback"></textarea>
    </div>`
  );
});

test('label', context => {
  const output = context.render({name: 'feedback', label: 'Feedback'});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=8 name="feedback"></textarea>
    </div>`
  );
});

test('hint', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', hint: 'Tell us about your experience'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
        <span class="form-hint">Tell us about your experience</span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=8 name="feedback"></textarea>
    </div>`
  );
});

test('id', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', id: 'feedback-box'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="feedback-box">
        <span class="form-label">Feedback</span>
      </label>
      <textarea class="form-control" id="feedback-box"
        rows=8 name="feedback"></textarea>
    </div>`
  );
});

test('error', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', error: 'We need feedback.'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group form-group-error">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
        <span id="error-message-feedback" class="error-message">
          We need feedback.
        </span>
      </label>
      <textarea class="form-control form-control-error"
        id="textarea-feedback" rows=8 name="feedback"></textarea>
    </div>`
  );
});

test('value', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', value: 'Hammond Eggs'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=8 name="feedback">Hammond Eggs</textarea>
    </div>`
  );
});

test('maxlength', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', maxlength: '9'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=8 name="feedback" maxlength="9"></textarea>
    </div>`
  );
});

test('rows', context => {
  const output = context.render({
    name: 'feedback', label: 'Feedback', rows: 10
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <label for="textarea-feedback">
        <span class="form-label">Feedback</span>
      </label>
      <textarea class="form-control" id="textarea-feedback"
        rows=10 name="feedback"></textarea>
    </div>`
  );
});
