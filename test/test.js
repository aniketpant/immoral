(function() {
  var $;

  $ = jQuery;

  $(function() {
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
      setup: function() {
        return this.elems = $('#qunit-fixture').children();
      }
    });
    return test('options', function() {
      expect(1);
      return strictEqual($.immoral($('#modal-1')), 'immoralized', 'should be immoral');
    });
  });

}).call(this);
