const assert = require('assert');

test('summary', context => {
  const output = context.render({summary: 'More information'});
  assert.equal(output.html,
    '<details>' +
      '<summary>' +
        '<span class="summary">' +
          'More information' +
        '</span>' +
      '</summary>' +
      '<div class="panel panel-border-narrow">' +
      '</div>' +
    '</details>');
});

test('render-body', context => {
  const output = context.render({
    summary: 'More information', renderBody: 'Lots and lots of information'
  });
  assert.equal(output.html,
    '<details>' +
      '<summary>' +
        '<span class="summary">' +
          'More information' +
        '</span>' +
      '</summary>' +
      '<div class="panel panel-border-narrow">' +
        'Lots and lots of information' +
      '</div>' +
    '</details>');
});
