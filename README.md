[![Build Status](https://travis-ci.org/gunjam/govuk-elements-marko.png?branch=master)](https://travis-ci.org/gunjam/govuk-elements-marko)
[![Code Coverage](https://img.shields.io/codecov/c/github/gunjam/govuk-elements-marko.svg)](https://codecov.io/github/gunjam/govuk-elements-marko?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

A set of [Marko](http://markojs.com) components implementing
[GOV.UK elements](https://govuk-elements.herokuapp.com/).

# Installing

```
npm install govuk-elements-marko --save
```

**Note:** you will need to have the GOV.UK elements sass compiling in your service
in order for the components to be styled correctly.

```
npm install govuk-elements-sass --save
```

# Components

## &lt;gov-input/&gt;

The `<gov-input/>` tag will render a standard GOV.UK input and label pair.

The input id will be set as 'input' followed by a dash and the input's name
attribute.

For example:

```marko
<gov-input name='full-name' label='Full name'/>
```

Will produce the following markup:

```html
<div class="form-group">
  <label for="input-full-name">
    <span class="form-label">Full name</span>
  </label>
  <input class="form-control" type="text" id="input-full-name" name="full-name"
    autocomplete="off">
</div>
```

### Attributes
* **name** - sets input name attribute (required)
* **label** - sets label text (required)
* **hint** - sets label hint text
* **group-classes** - appends further classes `<div class="form-group">`
* **input-classes** - appends further classes `<input class="form-control">`;
  eg. `form-control-1-4` for quarter width.
* **id** - override generated input id attribute
* **error** - sets error message text
* **value** - sets input value attribute
* **maxlength** - sets input maxlength attribute
* **hide-label** - adds visually-hidden to the input label (true/false)

## &lt;gov-date-input/&gt;

`<gov-date-input\>` will generate the mark up for the [GOV.UK date input
pattern](http://govuk-elements.herokuapp.com/form-elements/example-date/). It
supports multiple name attribute formats to accommodate on your node
body parser set up. It does not currently support separate error messages and
highlighting per input.

The input ids are set as the input's name attribute followed by a dash and
either 'day', 'month' or 'year', eg. `birth-day`, `birth-month`, etc. The
format can be changed using the 'suffix' attribute, eg. `suffix="camel"` will
produce `name="birthDay"` while `suffix="object"` will give `name="birth[day]"`.
Kebab case is default, `name="birth-day"`.

**Note:** Day, month and year labels are currently hardcoded! Welsh is supported
using the 'lang' attribute. It is also detected from the 'language' property of
the express request object.

Example:

```marko
<gov-date-input name="date-of-birth" legend="What is your date of birth?"
  hint="For example, 31 3 1980"/>
```

Will produce the following markup:

```html
<div class="form-group">
  <fieldset>
    <legend>
      <span class="form-label-bold">What is your date of birth?</span>
      <span id="date-of-birth-hint" class="form-hint">For example, 31 3 1980</span>
    </legend>
    <div class="form-date">
      <div class="form-group form-group-day">
        <label for="input-date-of-birth-day" class="form-label">Day</label>
        <input aria-describedby="date-of-birth-hint" class="form-control"
          id="input-date-of-birth-day" name="date-of-birth-day"
          pattern="[0-9]*" min="0" max="31" type="number"/>
      </div>
      <div class="form-group form-group-month">
        <label for="input-date-of-birth-month" class="form-label">Month</label>
        <input class="form-control" id="input-date-of-birth-month"
          name="date-of-birth-month" pattern="[0-9]*" min="0"
          max="12" type="number"/>
      </div>
      <div class="form-group form-group-year">
        <label for="input-date-of-birth-year" class="form-label">Year</label>
        <input class="form-control" id="input-date-of-birth-year"
          name="date-of-birth-year" pattern="[0-9]*" min="0"
          type="number"/>
      </div>
    </div>
  </fieldset>
</div>
```

### Attributes
* **name** - sets input name attribute (required)
* **legend** - sets legend text (required)
* **hint** - sets legend hint text
* **group-classes** - appends further classes `<div class="form-group">`
* **id** - overrides the name part of the input ids
* **error** - sets error message text
* **value** - set input values using object, eg. `value={day: '1', month: '2', year: '2017'}`
* **value-day** - set value attribute day input
* **value-month** - set value attribute month input
* **value-year** - set value attribute year input
* **maxyear** - set max attribute on year input
* **suffix** - set input id generation suffix (explained above)
* **lang** - setting to 'cy' uses Welsh labels, anything else defaults to
English

## &lt;gov-checkbox/&gt;

Use `<gov-checkbox/>` to generate a GOV.UK checkbox!

The input id will be set as 'checkbox' followed by a dash and the input's name
attribute, eg. `checkbox-cat`.

Example:

```marko
<gov-checkbox label="I have a cat" name="cat" value="true"/>
```

Will produce the following mark up:

```html
<div class="multiple-choice">
  <input id="checkbox-cat" name="cat" value="true" type="checkbox"/>
  <label for="checkbox-cat">I have a cat</label>
</div>
```

### Attributes
* **&lt;gov-checkbox/&gt;**
  * **name** - sets name attribute value, overrides group name if it exists
  * **value** - sets input value attribute (required)
  * **label** - sets label text (required)
  * **hint** - sets label hint text
  * **reveal** - sets `data-target` attribute for [conditionally
    revealing content](https://govuk-elements.herokuapp.com/form-elements/#form-toggle-content).

## &lt;gov-checkboxes/&gt;

Use `<gov-checkboxes/>` to generate a GOV.UK checkbox group!

The input id will be set as 'checkbox' followed by a dash, the input's name
attribute, another dash and the index of the input, eg. `checkbox-cats-0`.

If you are implementing a one question per page pattern and wish to hide the
legend, you can set the 'hide-legend' to true. This will add a
'visually-hidden' class.

Example:

```marko
<gov-checkboxes legend="Which types of waste do you transport regularly?"
  name="waste-types" body-text="Select all that apply">
  <@checkbox value="waste-animal" label="Waste from animal carcasses"/>
  <@checkbox value="waste-mines" label="Waste from mines or quarries"/>
  <@checkbox value="waste-farm" label="Farm or agricultural waste"/>
</gov-checkboxes>
```

Will produce the following mark up:

```html
<div class="form-group">
  <fieldset>
    <legend>
      <span class="form-label-bold">
        Which types of waste do you transport regularly?
      </span>
      <span class="body-text">
        Select all that apply
      </span>
    </legend>
    <div class="multiple-choice">
      <input id="checkbox-waste-types-0" name="waste-types" value="waste-animal"
        type="checkbox"/>
      <label for="checkbox-waste-types-0">Waste from animal carcasses</label>
    </div>
    <div class="multiple-choice">
      <input id="checkbox-waste-types-1" name="waste-types" value="waste-mines"
        type="checkbox"/>
      <label for="checkbox-waste-types-1">Waste from mines or quarries</label>
    </div>
    <div class="multiple-choice">
      <input id="checkbox-waste-types-2" name="waste-types" value="waste-farm"
        type="checkbox"/>
      <label for="checkbox-waste-types-2">Farm or agricultural waste</label>
    </div>
  </fieldset>
</div>
```

### Attributes
* **&lt;gov-checkboxes/&gt;**
  * **name** - sets input name attribute for all inputs
  * **legend** - sets legend text (required)
  * **hide-legend** - boolean, adds visually-hidden class to legend if `true`
  * **hint** - sets legend hint text
  * **body-text** - sets legend body text
  * **error** - sets error message text
  * **values** - array of values, checkboxes with matching values will be
    rendered checked
* **&lt;@checkbox/&gt;**
  * **name** - sets name attribute value, overrides group name if it exists
  * **value** - sets input value attribute (required)
  * **label** - sets label text (required)
  * **checked** - boolean, checkes checkbox. Overrides matching values from
    &lt;gov-checkboxes/&gt values attribute if it exists
  * **hint** - sets label hint text
  * **reveal** - sets `data-target` attribute for [conditionally
    revealing content](https://govuk-elements.herokuapp.com/form-elements/#form-toggle-content).

## &lt;gov-radios/&gt;

Use `<gov-radios/>` to generate a GOV.UK radio button group!

2 radios will be rendered side-by-side, 3 or more radios will be displayed
vertically. Layout can be forced by setting the 'layout' attribute to `inline`
for side-by-side or `stacked` to display vertically.

The input id will be set as 'radio' followed by a dash, the input's name
attribute, another dash and the index of the input, eg. `radio-cats-0`.

If you are implementing a one question per page pattern and wish to hide the
legend you can set the 'hide-legend' to true. This will add a
'visually-hidden' class.

Example:

```marko
<gov-radios legend="Do you already have a personal user account?" name="account">
  <@radio value="yes" label="Yes"/>
  <@radio value="no" label="No"/>
</gov-radios>
```

Will produce the following mark up:

```html
<div class="form-group">
  <fieldset class="inline">
    <legend>
      <span class="form-label-bold">
        Do you already have a personal user account?
      </span>
    </legend>
    <div class="multiple-choice">
      <input id="radio-account-0" name="account" value="yes" type="radio"/>
      <label for="radio-account-0">Yes</label>
    </div>
    <div class="multiple-choice">
      <input id="radio-account-1" name="account" value="no" type="radio"/>
      <label for="radio-account-1">No</label>
    </div>
  </fieldset>
</div>
```

### Attributes
* **&lt;gov-radios/&gt;**
  * **name** - sets input name attribute for all inputs (required)
  * **legend** - sets legend text (required)
  * **hide-legend** - boolean, adds visually-hidden class to legend if `true`
  * **hint** - sets legend hint text
  * **error** - sets error message text
  * **value** - checks the radio which the matching value attribute
  * **layout** - `stacked` forces radios to display vertically, `inline` forces
    horizontal layout. Inline is default for less than 3 radios, stacked for 3
    or more.
* **&lt;@radio/&gt;**
  * **value** - sets input value attribute (required)
  * **label** - sets label text (required)
  * **hint** - sets label hint text
  * **reveal** - sets `data-target` attribute for [conditionally
    revealing content](https://govuk-elements.herokuapp.com/form-elements/#form-toggle-content).

## &lt;gov-textarea/&gt;

The `<gov-textarea/>` tag will render a textarea and label pair.

The input id will be set as 'textarea' followed by a dash and the textarea's
name attribute.

Example:

```marko
<gov-textarea name='what-wrong' label='What went wrong'/>
```

Will produce the following markup:

```html
<div class="form-group">
  <label for="textarea-what-wrong">
    <span class="form-label">What went wrong</span>
  </label>
  <textarea class="form-control" id="textarea-what-wrong" rows="8"
    name="what-wrong"/>
</div>
```

### Attributes
* **name** - sets textarea name attribute (required)
* **label** - sets label text (required)
* **hint** - sets label hint text
* **id** - override generated textarea id attribute
* **error** - sets error message text
* **value** - sets input value attribute
* **maxlength** - textarea textarea maxlength attribute
* **rows** - sets textarea rows attribute

## &lt;gov-error-summary/&gt;

`<gov-error-summary/>` can be used to display a GOV.UK Elements error summary
section at the top of your page, listing form validation errors. The list will
contain anchor links pointing the error-message ids generated by the
`<gov-input>` component.

It takes a heading, an optional summary and object of error messages. The error
message object should contain keys matching the name attribute of an input, with
the value as the appropriate error message.

If no errors object is passed, or errors is set to something non-truthy, the
error summary section will not be rendered.

Example:

```marko
<gov-error-summary heading="There's a problem" summary="Fix the following"
  errors={'full-name': 'You must provide a name.'}/>
```

Will produce the following markup:

```html
<div role="alert" aria-labelledby="error-summary-heading" tabindex="-1"
  class="error-summary">
  <h2 id="error-summary-heading" class="heading-medium error-summary-heading">
    There's a problem
  </h2>
  <p>Fix the following</p>
  <ul class="error-summary-list">
    <li>
      <a href="#error-message-full-name">You must provide a name.</a>
    </li>
  </ul>
</div>
```

### Attributes
* **errors** - errors object, keys match input names, associated values the
  error messages
* **heading** - sets heading text
* **summary** - sets summary text

## &lt;gov-prog-disclosure/&gt;

This tag will create an summary/details tag pair following the [GOV.UK
progressive disclosure pattern](http://govuk-elements.herokuapp.com/typography/#typography-hidden-text).

Example:

```marko
<gov-prog-disclosure summary="Help with nationality">  
  <p>
    If you’re not sure about your nationality, try to find out from an official
    document like a passport or national ID card.
  </p>
  <p>
    We need to know your nationality so we can work out which elections you’re
    entitled to vote in. If you can’t provide your nationality, you’ll have to
    send copies of identity documents through the post.
  </p>
</gov-prog-disclosure>
```

Will produce the following markup:

```html
<details>
  <summary>
    <span class="summary">Help with nationality</span>
  </summary>
  <div class="panel panel-border-narrow">
    <p>
      If you’re not sure about your nationality, try to find out from an
      official document like a passport or national ID card.
    </p>
    <p>
      We need to know your nationality so we can work out which elections you’re
      entitled to vote in. If you can’t provide your nationality, you’ll have to
      send copies of identity documents through the post.
    </p>
  </div>
</details>
```

### Attributes
* **summary** - sets summary text

## &lt;gov-legal/&gt;

`<gov-legal/>` can be used for displaying legal text in bold with a warning
icon.

**Note**: Visually hidden warning text is hardcoded. In English by default, can
be set to Welsh by setting the 'lang' attribute to `cy`.

Example:

```marko
<gov-legal content="You can be fined up to £5,000 if you don’t register."/>
```

Will produce:

```html
<p class="notice text">
  <i class="icon icon-important">
    <span class="visuallyhidden">Warning</span>
  </i>
  <strong class="bold-small">
    You can be fined up to £5,000 if you don’t register.
  </strong>
</p>
```

### Attributes
* **content** - sets content for the legal message
* **lang** - specifies the language for the visually hidden warning message,
  `lang="cy"` sets to Welsh, anything else defaults to English

## &lt;gov-phase-banner/&gt;

This tag will generate a GOV.UK phase banner. Setting the value of the `phase`
attribute changes the text in the phase tag, defaults to BETA.

Example:

```marko
<gov-phase-banner phase="alpha">
  This is a new service – your <a href="/feedback">feedback</a> will help us to
  improve it.
</gov-phase-banner>
```

Will produce:

```html
<div class="phase-banner">
  <p>
    <strong class="phase-tag">ALPHA</strong>
    <span>This is a new service – your <a href="/feedback">feedback</a> will
    help us to improve it.</span>
  </p>
</div>
```

### Attributes
* **phase** - sets content phase tag, defaults to beta.
