const assert = require('assert');
const html = require('../../../html');

test('render', context => {
  const output = context.render({});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold"></span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('legend', context => {
  const output = context.render({legend: 'Things you do'});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('hint', context => {
  const output = context.render({
    legend: 'Things you do', hint: 'For real tho'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
          <span class="form-hint">For real tho</span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('body-text', context => {
  const output = context.render({
    legend: 'Things you do', bodyText: 'Select all that apply', hint: 'Real things only'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
          <span class="body-text">Select all that apply</span>
          <span class="form-hint">Real things only</span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('error', context => {
  const output = context.render({
    legend: 'Things you do', name: 'do-things', error: 'Check something'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group form-group-error">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
          <span id="error-message-do-things" class="error-message">
            Check something
          </span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('hide-legend', context => {
  const output = context.render({
    legend: 'Things you do', name: 'do-things', hideLegend: true
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="visually-hidden">Things you do</span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('name', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{}]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" type="checkbox">
          <label for="checkbox-do-things-0"></label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes label', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" type="checkbox">
          <label for="checkbox-do-things-0">Fly around</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes value', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      value: 'fly'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" value="fly" type="checkbox">
          <label for="checkbox-do-things-0">Fly around</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes name', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [
      {
        label: 'Fly around',
        value: 'true',
        name: 'fly'
      },
      {
        label: 'Jump up and down',
        value: 'true',
        name: 'jump'
      },
      {
        label: 'Climb',
        value: 'climb'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-fly-0" name="fly" value="true" type="checkbox">
          <label for="checkbox-fly-0">Fly around</label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-jump-1" name="jump" value="true" type="checkbox">
          <label for="checkbox-jump-1">Jump up and down</label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-do-things-2" name="do-things" value="climb" type="checkbox">
          <label for="checkbox-do-things-2">Climb</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes hint', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" value="fly" type="checkbox">
          <label for="checkbox-do-things-0">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes id', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-checkbox'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="my-checkbox" name="do-things" value="fly" type="checkbox">
          <label for="my-checkbox">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes reveal', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-checkbox',
      reveal: 'hidden-field'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div data-target="hidden-field" class="multiple-choice">
          <input id="my-checkbox" name="do-things" value="fly" type="checkbox">
          <label for="my-checkbox">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes checked', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      value: 'fly',
      id: 'my-checkbox',
      checked: true
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="my-checkbox" name="do-things" value="fly" type="checkbox" checked>
          <label for="my-checkbox">Fly around</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('checkboxes renderBody', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    checkboxes: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-checkbox',
      reveal: 'hidden-field',
      renderBody: 'After checkbox'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div data-target="hidden-field" class="multiple-choice">
          <input id="my-checkbox" name="do-things" value="fly" type="checkbox">
          <label for="my-checkbox">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
        After checkbox
      </fieldset>
    </div>`
  );
});

test('values array', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    values: ['swim', 'sing'],
    checkboxes: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
      },
      {
        label: 'Sing a song',
        value: 'sing'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" value="fly" type="checkbox">
          <label for="checkbox-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-do-things-1" name="do-things" value="swim" type="checkbox" checked>
          <label for="checkbox-do-things-1">
            Swim about
          </label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-do-things-2" name="do-things" value="sing" type="checkbox" checked>
          <label for="checkbox-do-things-2">
            Sing a song
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('values string', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    values: 'fly',
    checkboxes: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
      },
      {
        label: 'Sing a song',
        value: 'sing'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="checkbox-do-things-0" name="do-things" value="fly" type="checkbox" checked>
          <label for="checkbox-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-do-things-1" name="do-things" value="swim" type="checkbox">
          <label for="checkbox-do-things-1">
            Swim about
          </label>
        </div>
        <div class="multiple-choice">
          <input id="checkbox-do-things-2" name="do-things" value="sing" type="checkbox">
          <label for="checkbox-do-things-2">
            Sing a song
          </label>
        </div>
      </fieldset>
    </div>`
  );
});
