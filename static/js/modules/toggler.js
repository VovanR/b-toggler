/**
 * @author VovanR [mail@vovanr.com]
 */

define([
], function (
) {

    var Toggler;

    /**
     * Toggler module
     *
     * @constructor
     */
    Toggler = function () {
        this.name = 'Toggler';
    };

    Toggler.prototype = {
        /**
         * Returns module name
         *
         * @returns {String} name
         */
        getName: function () {
            return this.name;
        },
    };

    return Toggler;

});
