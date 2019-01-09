const {assert} = require('chai');
const html = require('../../../html');

test('summary', context => {
  const output = context.render({summary: 'More information'});
  assert.equal(output.html.toString(), html`
    <details>
      <summary>
        <span class="summary">
          More information
        </span>
      </summary>
      <div class="panel panel-border-narrow">
      </div>
    </details>`
  );
});

test('renderBody', context => {
  const output = context.render({
    summary: 'More information', renderBody: out => out.w('Lots and lots of information')
  });
  assert.equal(output.html.toString(), html`
    <details>
      <summary>
        <span class="summary">
          More information
        </span>
      </summary>
      <div class="panel panel-border-narrow">
        Lots and lots of information
      </div>
    </details>`
  );
});
