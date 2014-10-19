var utils = require('loader-utils');

var toString = Object.prototype.toString;

var isArray = function (obj) {
  return toString.call(obj) === '[object Array]';
};

var isUndefined = function (obj) {
  return typeof obj === 'undefined';
};

var toArray = function (obj) {
  return isArray(obj) ? obj : !isUndefined(obj) ? [obj] : [];
};

module.exports = function (source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);
  var opts = this.options.wrap;

  var key;
  var value;
  var before = [];
  var after = [];

  for (key in query) {
    if (query.hasOwnProperty(key) && opts.hasOwnProperty(key)) {
      value = opts[key];
      before.unshift.apply(before, toArray(value.before));
      after.push.apply(after, toArray(value.after));
    }
  }

  return [].concat(before, source, after).join('\n');
};
