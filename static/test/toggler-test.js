requirejs([
    '../vendor/chai/chai',
    'jquery',
    '../js/modules/toggler',
], function (
    chai,
    $,
    Toggler
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Toggler', function () {
        var module = function () {
            return new Toggler({
                name: 'test',
            });
        };

        beforeEach(function () {
        });

        afterEach(function () {
        });

        var test = {
            isActive: function (m) {
                assert.ok(m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
                assert.notOk(m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
                assert.ok(m.bPanel.is(':visible'));
            },
            isInactive: function (m) {
                assert.notOk(m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
                assert.ok(m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
                assert.notOk(m.bPanel.is(':visible'));
            },
        };

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });

            it('should have toggler block', function () {
                var m = module();
                assert.isDefined(m.bToggler[0]);
            });

            it('should have panel block', function () {
                var m = module();
                assert.isDefined(m.bPanel[0]);
            });

            it('should throw if no options', function () {
                assert.throw(function () {
                    var m = new Toggler();
                });
            });
        });

        describe('#_open', function () {
            it('should open panel and change toggler text to \'Hide\'', function () {
                var m = module();
                m._open();
                test.isActive(m);
            });
        });

        describe('#_close', function () {
            it('should close panel and change toggler text to \'Show\'', function () {
                var m = module();
                m._close();
                test.isInactive(m);
            });
        });

        describe('#toggle', function () {
            it('should toggle panel and toggler text', function () {
                var m = module();
                m.toggle();
                test.isActive(m);
                m.toggle();
                test.isInactive(m);
            });
        });

        describe('ui', function () {
            describe('click on toggler text', function () {
                it('should toggle toggler', function () {
                    var m = module();

                    m.bToggler.trigger('click');
                    test.isActive(m);
                    m.bToggler.trigger('click');
                    test.isInactive(m);
                });
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
