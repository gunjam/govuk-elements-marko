const {assert} = require('chai');
const html = require('../../../html');

test('name', context => {
  const output = context.render({name: 'birth'});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold"></span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('legend', context => {
  const output = context.render({name: 'birth', legend: 'Date of birth'});
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('hint', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', hint: 'For example, 19 5 1992'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
          <span id="birth-hint" class="form-hint">
            For example, 19 5 1992
          </span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input aria-describedby="birth-hint" class="form-control"
              id="input-birth-day" type="number" name="birth-day"
              pattern="[0-9]*" min="0" max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('id', context => {
  const output = context.render({
    name: 'birth',
    legend: 'Date of birth',
    hint: 'For example, 19 5 1992',
    id: 'dob'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
          <span id="birth-hint" class="form-hint">
            For example, 19 5 1992
          </span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="dob-day" class="form-label">
              Day
            </label>
            <input aria-describedby="birth-hint" class="form-control"
              id="dob-day" type="number" name="birth-day"
              pattern="[0-9]*" min="0" max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="dob-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="dob-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="dob-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="dob-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('error', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', error: 'This is person is too old'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group form-group-error">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
          <span id="error-message-birth" class="error-message">
            This is person is too old
          </span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control form-control-error"
              id="input-birth-day" type="number" name="birth-day"
              pattern="[0-9]*" min="0" max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control form-control-error"
              id="input-birth-month" type="number" name="birth-month"
              pattern="[0-9]*" min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control form-control-error"
              id="input-birth-year" type="number" name="birth-year"
              pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('value', context => {
  const output = context.render({
    name: 'birth',
    legend: 'Date of birth',
    value: {
      day: '03',
      month: '04',
      year: '2015'
    }
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31" value="03">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12" value="04">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0" value="2015">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('value-day', context => {
  const output = context.render({
    name: 'birth',
    legend: 'Date of birth',
    valueDay: '03'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31" value="03">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('value-month', context => {
  const output = context.render({
    name: 'birth',
    legend: 'Date of birth',
    valueDay: '03',
    valueMonth: '04'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31" value="03">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12" value="04">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('value-year', context => {
  const output = context.render({
    name: 'birth',
    legend: 'Date of birth',
    valueDay: '03',
    valueMonth: '04',
    valueYear: '2015'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31" value="03">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12" value="04">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0" value="2015">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('maxyear', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', maxyear: '2017'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0" max="2017">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('lang en', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', lang: 'en'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('lang cy', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', lang: 'cy'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Dydd
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Mis
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Blwyddyn
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('suffix kebab', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', suffix: 'kebab'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('suffix camel', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', suffix: 'camel'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birthDay" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birthMonth" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birthYear" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('suffix object', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', suffix: 'object'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth[day]" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth[month]" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year" type="number"
              name="birth[year]" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('group-classes undefined', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('group-classes', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', groupClasses: 'form-group-compound'
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group form-group-compound">
      <fieldset>
        <legend>
          <span class="form-label-bold">Date of birth</span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input class="form-control" id="input-birth-day"
              type="number" name="birth-day" pattern="[0-9]*" min="0"
              max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});

test('hide-legend', context => {
  const output = context.render({
    name: 'birth', legend: 'Date of birth', hint: 'For example, 19 5 1992',
    hideLegend: true
  });
  assert.equal(output.html.toString(), html`
    <div class="form-group">
      <fieldset>
        <legend>
          <span class="visually-hidden">
            <span class="form-label-bold">Date of birth</span>
            <span id="birth-hint" class="form-hint">
              For example, 19 5 1992
            </span>
          </span>
        </legend>
        <div class="form-date">
          <div class="form-group form-group-day">
            <label for="input-birth-day" class="form-label">
              Day
            </label>
            <input aria-describedby="birth-hint" class="form-control"
              id="input-birth-day" type="number" name="birth-day"
              pattern="[0-9]*" min="0" max="31">
          </div>
          <div class="form-group form-group-month">
            <label for="input-birth-month" class="form-label">
              Month
            </label>
            <input class="form-control" id="input-birth-month"
              type="number" name="birth-month" pattern="[0-9]*"
              min="0" max="12">
          </div>
          <div class="form-group form-group-year">
            <label for="input-birth-year" class="form-label">
              Year
            </label>
            <input class="form-control" id="input-birth-year"
              type="number" name="birth-year" pattern="[0-9]*" min="0">
          </div>
        </div>
      </fieldset>
    </div>`
  );
});
