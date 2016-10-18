'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  const req = out.global.events.req || {};
  const language = input.lang || req.language;
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
