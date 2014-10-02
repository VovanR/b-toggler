/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    '../../index',
], function (
    $,
    Toggler
) {

    var App;

    App = function () {
        this._initialize();
    };

    App.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('App init');

            this.Toggler = new Toggler({
                name: 'test',
            });
        },
    };

    return App;

});
