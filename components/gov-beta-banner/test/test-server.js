const assert = require('assert');

test('render-body', context => {
  const output = context.render({renderBody: 'Please leave some feedback'});
  assert.equal(output.html,
    '<div class="phase-banner-beta">' +
      '<p>' +
        '<strong class="phase-tag">BETA</strong>' +
        '<span>Please leave some feedback</span>' +
      '</p>' +
    '</div>');
});
