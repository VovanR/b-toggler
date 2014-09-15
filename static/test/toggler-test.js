requirejs([
    '../js/modules/toggler',
], function (
    Toggler
) {

    'use strict';

    QUnit.start();

    QUnit.test('Toggler module', function (assert) {
        var Toggler = new Toggler();

        assert.equal(toggler.getName(), 'Toggler', 'Module name is Toggler');
    });

});
