const assert = require('assert');

test('render', context => {
  const output = context.render({});
  assert.equal(output.html,
    '<div class="phase-banner">' +
      '<p>' +
        '<strong class="phase-tag">BETA</strong>' +
        '<span></span>' +
      '</p>' +
    '</div>');
});

test('phase', context => {
  const output = context.render({phase: 'alpha'});
  assert.equal(output.html,
    '<div class="phase-banner">' +
      '<p>' +
        '<strong class="phase-tag">ALPHA</strong>' +
        '<span></span>' +
      '</p>' +
    '</div>');
});

test('render-body', context => {
  const output = context.render({renderBody: 'Please leave some feedback'});
  assert.equal(output.html,
    '<div class="phase-banner">' +
      '<p>' +
        '<strong class="phase-tag">BETA</strong>' +
        '<span>Please leave some feedback</span>' +
      '</p>' +
    '</div>');
});
