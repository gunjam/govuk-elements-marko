const assert = require('assert');
const html = require('../../../html');

test('content', context => {
  const output = context.render({content: 'Don\'t break the law!'});
  assert.equal(output.html.toString(), html`
    <p class="notice text">
      <i class="icon icon-important">
        <span class="visuallyhidden">Warning</span>
      </i>
      <strong class="bold-small">Don't break the law!</strong>
    </p>`
  );
});

test('lang en', context => {
  const output = context.render({content: 'Don\'t break the law!'});
  assert.equal(output.html.toString(), html`
    <p class="notice text">
      <i class="icon icon-important">
        <span class="visuallyhidden">Warning</span>
      </i>
      <strong class="bold-small">Don't break the law!</strong>
    </p>`
  );
});

test('lang cy', context => {
  const output = context.render({content: 'Don\'t break the law!', lang: 'cy'});
  assert.equal(output.html.toString(), html`
    <p class="notice text">
      <i class="icon icon-important">
        <span class="visuallyhidden">Rhybudd</span>
      </i>
      <strong class="bold-small">Don't break the law!</strong>
    </p>`
  );
});
