(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#immoral', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.immoral(), this.elems, 'should be chainable');
  });

  test('is immoral', function() {
    expect(1);
    strictEqual(this.elems.immoral().text(), 'immoral0immoral1immoral2', 'should be immoral');
  });

  module('jQuery.immoral');

  test('is immoral', function() {
    expect(2);
    strictEqual($.immoral(), 'immoral.', 'should be immoral');
    strictEqual($.immoral({punctuation: '!'}), 'immoral!', 'should be thoroughly immoral');
  });

  module(':immoral selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is immoral', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':immoral').get(), this.elems.last().get(), 'knows immoral when it sees it');
  });

}(jQuery));
