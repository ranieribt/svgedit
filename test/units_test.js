/* eslint-env qunit */
/* globals $, svgedit, equals */
/* eslint-disable no-var */
$(function () {
  // log function
  QUnit.log = function (details) {
    if (window.console && window.console.log) {
      window.console.log(details.result + ' :: ' + details.message);
    }
  };

  function setUp () {
    svgedit.units.init({
      getBaseUnit: function () { return 'cm'; },
      getHeight: function () { return 600; },
      getWidth: function () { return 800; },
      getRoundDigits: function () { return 4; },
      getElement: function (elementId) { return document.getElementById(elementId); }
    });
  }

  test('Test svgedit.units package', function () {
    expect(2);
    ok(svgedit.units);
    equals(typeof svgedit.units, typeof {});
  });

  test('Test svgedit.units.shortFloat()', function () {
    expect(7);

    setUp();

    ok(svgedit.units.shortFloat);
    equals(typeof svgedit.units.shortFloat, typeof function () {});

    var shortFloat = svgedit.units.shortFloat;
    equals(shortFloat(0.00000001), 0);
    equals(shortFloat(1), 1);
    equals(shortFloat(3.45678), 3.4568);
    equals(shortFloat(1.23443), 1.2344);
    equals(shortFloat(1.23455), 1.2346);
  });

  test('Test svgedit.units.isValidUnit()', function () {
    expect(18);

    setUp();

    ok(svgedit.units.isValidUnit);
    equals(typeof svgedit.units.isValidUnit, typeof function () {});

    var isValidUnit = svgedit.units.isValidUnit;
    ok(isValidUnit('0'));
    ok(isValidUnit('1'));
    ok(isValidUnit('1.1'));
    ok(isValidUnit('-1.1'));
    ok(isValidUnit('.6mm'));
    ok(isValidUnit('-.6cm'));
    ok(isValidUnit('6000in'));
    ok(isValidUnit('6px'));
    ok(isValidUnit('6.3pc'));
    ok(isValidUnit('-0.4em'));
    ok(isValidUnit('-0.ex'));
    ok(isValidUnit('40.123%'));

    equals(isValidUnit('id', 'uniqueId', document.getElementById('uniqueId')), true);
    equals(isValidUnit('id', 'newId', document.getElementById('uniqueId')), true);
    equals(isValidUnit('id', 'uniqueId'), false);
    equals(isValidUnit('id', 'uniqueId', document.getElementById('nonUniqueId')), false);
  });

  test('Test svgedit.units.convertUnit()', function () {
    expect(4);

    setUp();

    ok(svgedit.units.convertUnit);
    equals(typeof svgedit.units.convertUnit, typeof function () {});
    // cm in default setup
    equals(svgedit.units.convertUnit(42), 1.1113);
    equals(svgedit.units.convertUnit(42, 'px'), 42);
  });
});
