/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
], function (
    $
) {

    'use strict';

    var Toggler;
    var opennedClass = '_state_opened';

    /**
     * Toggler module
     *
     * @param {Object} o Options
     * @param {String} o.name
     * @constructor
     */
    Toggler = function (o) {
        if (!o) {
            throw new Error('Missing options');
        }

        this._name = o.name;

        this._bToggler = null;
        this._bPanel = null;

        this._initialize();
    };

    Toggler.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Toggler init');

            this._bToggler = $('.b-toggler__toggler._name_' + this._name);
            this._bPanel = $('.b-toggler__panel._name_' + this._name);

            this._bindControls();
        },

        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            this._bToggler.on('click', function () {
                this.toggle();
            }.bind(this));
        },

        /**
         * Open toggler panel
         *
         * @private
         */
        _open: function () {
            this._bToggler.addClass(opennedClass);
            this._bPanel.addClass(opennedClass);
        },

        /**
         * Close toggler panel
         *
         * @private
         */
        _close: function () {
            this._bToggler.removeClass(opennedClass);
            this._bPanel.removeClass(opennedClass);
        },

        /**
         * Toggle toggler panel
         */
        toggle: function () {
            if (this._bToggler.hasClass(opennedClass)) {
                this._close();
            } else {
                this._open();
            }
        },
    };

    return Toggler;

});