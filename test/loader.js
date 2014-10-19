var loader = require('../index.js');
var source = 'source';

var toString = Object.prototype.toString;

var isArray = function (obj) {
  return toString.call(obj) === '[object Array]';
};

var mock = function (query, opts) {
  var result = {
    cacheable: function () {},
    options: {}
  };

  if (query) {
    result.query = '?' + (isArray(query) ? query.join('&') : query);
  }

  if (opts) {
    result.options.wrap = opts;
  }

  return result;
};

module.exports.test = {

  'leaves source as-is': function (test) {
    var context = mock();
    var result = loader.call(context, source);
    test.equal(result, source);
    test.done();
  },

  'adds a single line before': function (test) {
    var context = mock('foo', {
      foo: {
        before: 'foo-before1'
      }
    });
    var result = loader.call(context, source);
    test.equal('foo-before1\nsource', result);
    test.done();
  },

  'adds multiple lines before': function (test) {
    var context = mock('foo', {
      foo: {
        before: ['foo-before1', 'foo-before2']
      }
    });
    var result = loader.call(context, source);
    test.equal('foo-before1\nfoo-before2\nsource', result);
    test.done();
  },

  'adds a single line after': function (test) {
    var context = mock('foo', {
      foo: {
        after: 'foo-after1'
      }
    });
    var result = loader.call(context, source);
    test.equal('source\nfoo-after1', result);
    test.done();
  },

  'adds multiple lines after': function (test) {
    var context = mock('foo', {
      foo: {
        after: ['foo-after1', 'foo-after2']
      }
    });
    var result = loader.call(context, source);
    test.equal('source\nfoo-after1\nfoo-after2', result);
    test.done();
  },

  'adds a single line before and after': function (test) {
    var context = mock('foo', {
      foo: {
        before: 'foo-before1',
        after:  'foo-after1'
      }
    });
    var result = loader.call(context, source);
    test.equal('foo-before1\nsource\nfoo-after1', result);
    test.done();
  },

  'adds multiple lines before and after': function (test) {
    var context = mock('foo', {
      foo: {
        before: ['foo-before1', 'foo-before2'],
        after:  ['foo-after1', 'foo-after2']
      }
    });
    var result = loader.call(context, source);
    test.equal('foo-before1\nfoo-before2\nsource\nfoo-after1\nfoo-after2', result);
    test.done();
  },

  'adds a single line with multiple queries': function (test) {
    var context = mock(['foo', 'bar'], {
      foo: {
        before: 'foo-before1',
        after:  'foo-after1'
      },
      bar: {
        before: 'bar-before1',
        after:  'bar-after1'
      }
    });
    var result = loader.call(context, source);
    test.equal('bar-before1\nfoo-before1\nsource\nfoo-after1\nbar-after1', result);
    test.done();
  },

  'adds multiple lines with multiple queries': function (test) {
    var context = mock(['foo', 'bar'], {
      foo: {
        before: ['foo-before1', 'foo-before2'],
        after:  ['foo-after1', 'foo-after2']
      },
      bar: {
        before: ['bar-before1', 'bar-before2'],
        after:  ['bar-after1', 'bar-after2']
      }
    });
    var result = loader.call(context, source);
    test.equal('bar-before1\nbar-before2\nfoo-before1\nfoo-before2\nsource\nfoo-after1\nfoo-after2\nbar-after1\nbar-after2', result);
    test.done();
  }

};
