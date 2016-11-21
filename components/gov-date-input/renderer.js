'use strict';

const template = require('./template.marko');

const labels = {
  en: {day: 'Day', month: 'Month', year: 'Year'},
  cy: {day: 'Dydd', month: 'Mis', year: 'Blwyddyn'}
};
const suffixes = {
  camel: {day: 'Day', month: 'Month', year: 'Year'},
  kebab: {day: '-day', month: '-month', year: '-year'},
  object: {day: '[day]', month: '[month]', year: '[year]'}
};

exports.renderer = function (input, out) {
  const lang = input.lang || (out.stream.req || {}).language;
  const label = labels[lang] || labels.en;
  const maxyear = input.maxyear || new Date().getFullYear();
  const suffix = suffixes[input.suffix] || suffixes.kebab;
  const value = input.value || {
    day: input.valueDay, month: input.valueMonth, year: input.valueYear
  };

  template.render(Object.assign(input, {label, value, maxyear, suffix}), out);
};
