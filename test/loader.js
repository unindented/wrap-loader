const loader = require('../index.js')
const source = 'source'

const mock = function (query) {
  const result = {
    cacheable: function () {},
    options: {}
  }

  if (query) {
    result.query = query
  }

  return result
}

module.exports.test = {

  'leaves source as-is': function (test) {
    const context = mock()
    const result = loader.call(context, source)
    test.equal(result, source)
    test.done()
  },

  'adds a single line before': function (test) {
    const context = mock({
      before: 'foo-before1'
    })
    const result = loader.call(context, source)
    test.equal('foo-before1\nsource', result)
    test.done()
  },

  'adds multiple lines before': function (test) {
    const context = mock({
      before: ['foo-before1', 'foo-before2']
    })
    const result = loader.call(context, source)
    test.equal('foo-before1\nfoo-before2\nsource', result)
    test.done()
  },

  'adds a single line after': function (test) {
    const context = mock({
      after: 'foo-after1'
    })
    const result = loader.call(context, source)
    test.equal('source\nfoo-after1', result)
    test.done()
  },

  'adds multiple lines after': function (test) {
    const context = mock({
      after: ['foo-after1', 'foo-after2']
    })
    const result = loader.call(context, source)
    test.equal('source\nfoo-after1\nfoo-after2', result)
    test.done()
  },

  'adds a single line before and after': function (test) {
    const context = mock({
      before: 'foo-before1',
      after: 'foo-after1'
    })
    const result = loader.call(context, source)
    test.equal('foo-before1\nsource\nfoo-after1', result)
    test.done()
  },

  'adds multiple lines before and after': function (test) {
    const context = mock({
      before: ['foo-before1', 'foo-before2'],
      after: ['foo-after1', 'foo-after2']
    })
    const result = loader.call(context, source)
    test.equal('foo-before1\nfoo-before2\nsource\nfoo-after1\nfoo-after2', result)
    test.done()
  }

}
