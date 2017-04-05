const assert = require('assert');
const html = require('../../../html');

test('render', context => {
  const output = context.render({});
  assert.equal(output.html, html`
    <div class="phase-banner">
      <p>
        <strong class="phase-tag">Beta</strong>
        <span></span>
      </p>
    </div>`
  );
});

test('phase', context => {
  const output = context.render({phase: 'alpha'});
  assert.equal(output.html, html`
    <div class="phase-banner">
      <p>
        <strong class="phase-tag">alpha</strong>
        <span></span>
      </p>
    </div>`
  );
});

test('render-body', context => {
  const output = context.render({renderBody: 'Please leave some feedback'});
  assert.equal(output.html, html`
    <div class="phase-banner">
      <p>
        <strong class="phase-tag">Beta</strong>
        <span>Please leave some feedback</span>
      </p>
    </div>`
  );
});
