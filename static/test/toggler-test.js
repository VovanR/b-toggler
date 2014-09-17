requirejs([
    'jquery',
    '../js/modules/toggler',
], function (
    $,
    Toggler
) {

    'use strict';

    QUnit.start();

    QUnit.module('Toggler module', {
        setup: function () {
            var bfix = $('#qunit-fixture');
            this.m = new Toggler({
                name: 'test',
            });
        },
        teardown: function () {
        }
    });

    QUnit.test('Should initialize', function (assert) {
        var m = this.m;

        assert.ok(m);
    });

    QUnit.test('Should have toggler block', function (assert) {
        var m = this.m;

        assert.ok(m.bToggler[0]);
    });

    QUnit.test('Should have panel block', function (assert) {
        var m = this.m;

        assert.ok(m.bPanel[0]);
    });

    QUnit.test('`_open` should open panel and change toggler text to \'Hide\'', function (assert) {
        var m = this.m;

        m._open();
        assert.ok(m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
        assert.ok(!m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
        assert.ok(m.bPanel.is(':visible'));
    });

    QUnit.test('`_close` should close panel and change toggler text to \'Show\'', function (assert) {
        var m = this.m;

        m._close();
        assert.ok(!m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
        assert.ok(m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
        assert.ok(!m.bPanel.is(':visible'));
    });

    QUnit.test('`toggle` should toggle panel and toggler text', function (assert) {
        var m = this.m;

        m.toggle();
        assert.ok(m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
        assert.ok(!m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
        assert.ok(m.bPanel.is(':visible'));
        m.toggle();
        assert.ok(!m.bToggler.find('.b-toggler__text._name_opened').is(':visible'));
        assert.ok(m.bToggler.find('.b-toggler__text._name_closed').is(':visible'));
        assert.ok(!m.bPanel.is(':visible'));
    });

});
