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
     * @param {Function} [o.onOpen]
     * @param {Function} [o.onClose]
     * @param {Boolean} [o.closeOnBlur=false]
     * @constructor
     */
    Toggler = function (o) {
        if (!o) {
            throw new Error('Missing options');
        }

        this._name = o.name;
        this._onOpen = o.onOpen || function () {};
        this._onClose = o.onClose || function () {};
        this._closeOnBlur = o.closeOnBlur || false;

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
            this._bToggler.on('click', function (e) {
                e.preventDefault();
                this.toggle();
            }.bind(this));

            if (this._closeOnBlur) {
                this._bPanel.on('click', function (e) {
                    e.preventDefault();
                });
            }
        },

        /**
         * Open toggler panel
         *
         * @private
         */
        _open: function () {
            this._bToggler.addClass(opennedClass);
            this._bPanel.addClass(opennedClass);

            if (this._closeOnBlur) {
                $(document).on('click.dj-feedback', function (e) {
                    if (e.isDefaultPrevented()) {
                        return;
                    }

                    this.close();
                }.bind(this));
            }

            this._onOpen();
        },

        /**
         * Close toggler panel
         *
         * @private
         */
        _close: function () {
            this._bToggler.removeClass(opennedClass);
            this._bPanel.removeClass(opennedClass);

            if (this._closeOnBlur) {
                $(document).off('click.dj-feedback');
            }

            this._onClose();
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

        /**
         * Open toggler panel
         */
        open: function () {
            this._open();
        },

        /**
         * Close toggler panel
         */
        close: function () {
            this._close();
        },
    };

    return Toggler;

});
