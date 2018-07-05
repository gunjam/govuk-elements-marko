const assert = require('assert');
const html = require('../../../html');

test('render', context => {
  const output = context.render({});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
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
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
      </fieldset>
    </div>`
  );
});

test('hint', context => {
  const output = context.render({
    legend: 'Things you do', name: 'do-things', hint: 'For real tho'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
          <span class="form-hint">For real tho</span>
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
      <fieldset class="inline">
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
      <fieldset class="inline">
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
    radios: [{}]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" type="radio">
          <label for="radio-do-things-0"></label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios label', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" type="radio">
          <label for="radio-do-things-0">Fly around</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios value', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around',
      value: 'fly'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">Fly around</label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios hint', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios id', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-radio'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="my-radio" name="do-things" value="fly" type="radio">
          <label for="my-radio">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios reveal', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-radio',
      reveal: 'hidden-field'
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div data-target="hidden-field" class="multiple-choice">
          <input id="my-radio" name="do-things" value="fly" type="radio">
          <label for="my-radio">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radios other', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [{
      label: 'Fly around',
      hint: 'In the sky',
      value: 'fly',
      id: 'my-radio',
      '*': {'data-click': 'click:radio:fly'}
    }]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input data-click="click:radio:fly" id="my-radio" name="do-things"
            value="fly" type="radio">
          <label for="my-radio">
            <span class="heading-small">Fly around</span><br>In the sky
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('value', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    value: 'fly',
    radios: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio" checked>
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('value: \'\'', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    value: '',
    radios: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('layout default < 3', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('layout default > 2', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [
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
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-2" name="do-things" value="sing" type="radio">
          <label for="radio-do-things-2">
            Sing a song
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('layout set inline', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    layout: 'inline',
    radios: [
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
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-2" name="do-things" value="sing" type="radio">
          <label for="radio-do-things-2">
            Sing a song
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('layout set stacked', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    layout: 'stacked',
    radios: [
      {
        label: 'Fly around',
        value: 'fly'
      },
      {
        label: 'Swim about',
        value: 'swim'
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
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
      </fieldset>
    </div>`
  );
});

test('radio renderbody', context => {
  const output = context.render({
    legend: 'Things you do',
    name: 'do-things',
    radios: [
      {
        label: 'Fly around',
        value: 'fly',
        renderBody: 'or'
      },
      {
        label: 'Swim about',
        value: 'swim'
      }
    ]
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset class="inline">
        <legend>
          <span class="form-label-bold">Things you do</span>
        </legend>
        <div class="multiple-choice">
          <input id="radio-do-things-0" name="do-things" value="fly" type="radio">
          <label for="radio-do-things-0">
            Fly around
          </label>
        </div>
        or
        <div class="multiple-choice">
          <input id="radio-do-things-1" name="do-things" value="swim" type="radio">
          <label for="radio-do-things-1">
            Swim about
          </label>
        </div>
      </fieldset>
    </div>`
  );
});
