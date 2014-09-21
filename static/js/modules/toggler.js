/**
 * @author VovanR [mail@vovanr.com]
 */

define([
], function (
) {

    'use strict';

    var Toggler;

    /**
     * Toggler module
     *
     * @param {Object} o Options
     * @param {String} o.name
     * @constructor
     */
    Toggler = function (o) {
        this._name = o.name;

        this.bToggler = $('.b-toggler__toggler._name_' + this._name);
        this.bPanel = $('.b-toggler__panel._name_' + this._name);

        this._bindControls();
    };

    Toggler.prototype = {
        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            this.bToggler.on('click', function () {
                this.toggle();
            }.bind(this));
        },

        /**
         * Open toggler panel
         *
         * @private
         */
        _open: function () {
            this.bToggler.addClass('_state_opened');
            this.bPanel.addClass('_state_opened');
        },

        /**
         * Close toggler panel
         *
         * @private
         */
        _close: function () {
            this.bToggler.removeClass('_state_opened');
            this.bPanel.removeClass('_state_opened');
        },

        /**
         * Toggle toggler panel
         */
        toggle: function () {
            if (this.bToggler.hasClass('_state_opened')) {
                this._close();
            } else {
                this._open();
            }
        },
    };

    return Toggler;

});
