'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  out.stream.req = out.stream.req || {};
  const language = input.lang || out.stream.req.language;
  const thisYear = new Date().getFullYear();

  if (language === 'cy') {
    input.dayLabel = 'Dydd';
    input.monthLabel = 'Mis';
    input.yearLabel = 'Blwyddyn';
  } else {
    input.dayLabel = 'Day';
    input.monthLabel = 'Month';
    input.yearLabel = 'Year';
  }
  input.value = input.value || {};
  input.maxyear = input.maxyear || thisYear;

  template.render(input, out);
};
