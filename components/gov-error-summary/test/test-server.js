const assert = require('assert');
const html = require('../../../html');

test('empty', context => {
  const output = context.render({});
  assert.equal(output.html, '');
});

test('errors', context => {
  const output = context.render({
    errors: {name: 'Enter a name.', colour: 'Pick a colour.'}
  });
  assert.equal(output.html, html`
    <div role="alert" aria-labelledby="error-summary-heading"
      tabindex="-1" class="error-summary">
      <h2 id="error-summary-heading"
        class="heading-medium error-summary-heading">
      </h2>
      <ul class="error-summary-list">
        <li><a href="#error-message-name">Enter a name.</a></li>
        <li><a href="#error-message-colour">Pick a colour.</a></li>
      </ul>
    </div>`
  );
});

test('heading', context => {
  const output = context.render({
    heading: 'There\'s been a problem',
    errors: {name: 'Enter a name.', colour: 'Pick a colour.'}
  });
  assert.equal(output.html, html`
    <div role="alert" aria-labelledby="error-summary-heading"
      tabindex="-1" class="error-summary">
      <h2 id="error-summary-heading"
        class="heading-medium error-summary-heading">
        There's been a problem
      </h2>
      <ul class="error-summary-list">
        <li><a href="#error-message-name">Enter a name.</a></li>
        <li><a href="#error-message-colour">Pick a colour.</a></li>
      </ul>
    </div>`
  );
});

test('summary', context => {
  const output = context.render({
    heading: 'There\'s been a problem',
    summary: 'Check these fields:',
    errors: {name: 'Enter a name.', colour: 'Pick a colour.'}
  });
  assert.equal(output.html, html`
    <div role="alert" aria-labelledby="error-summary-heading"
      tabindex="-1" class="error-summary">
      <h2 id="error-summary-heading"
        class="heading-medium error-summary-heading">
        There's been a problem
      </h2>
      <p>Check these fields:</p>
      <ul class="error-summary-list">
        <li><a href="#error-message-name">Enter a name.</a></li>
        <li><a href="#error-message-colour">Pick a colour.</a></li>
      </ul>
    </div>`
  );
});

test('empty errors object', context => {
  const output = context.render({
    heading: 'There\'s been a problem',
    summary: 'Check these fields:',
    errors: {}
  });
  assert.equal(output.html, '');
});
