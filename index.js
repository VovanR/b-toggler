/**
 * Toggler for any content
 *
 * @module Toggler
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

/* global define document */
define([
	'jquery'
], function (
	$
) {
	'use strict';

	var Toggler;
	var opennedClass = '_state_opened';

	/**
	 * @param {Object} o Options
	 * @param {String} o.name
	 * @param {Function} [o.onOpen]
	 * @param {Function} [o.onClose]
	 * @param {Boolean} [o.closeOnBlur=false]
	 * @constructor
	 * @alias module:Toggler
	 */
	Toggler = function (o) {
		if (!o) {
			throw new Error('Missing options');
		}

		this._name = o.name;
		this._onOpen = o.onOpen || function () {};
		this._onClose = o.onClose || function () {};
		this._closeOnBlur = o.closeOnBlur || false;

		this._$toggler = null;
		this._$panel = null;
		this._$dummyPanel = null;

		this._init();
	};

	Toggler.prototype = {
		/**
		 * Initialize
		 *
		 * @private
		 */
		_init: function () {
			console.info('Toggler init');

			this._$toggler = $('.b-toggler__toggler._name_' + this._name);
			this._$panel = $('.b-toggler__panel._name_' + this._name);
			this._$dummyPanel = $('.b-toggler__dummy-panel._name_' + this._name);

			this._bindControls();
		},

		/**
		 * Bindings
		 *
		 * @private
		 */
		_bindControls: function () {
			this._$toggler.on('click', function (e) {
				e.preventDefault();
				this.toggle();
			}.bind(this));
		},

		/**
		 * Open toggler panel
		 *
		 * @private
		 */
		_open: function () {
			this._$toggler.addClass(opennedClass);
			this._$panel.addClass(opennedClass);
			this._$dummyPanel.addClass(opennedClass);

			if (this._closeOnBlur) {
				$(document).on('click.dj-feedback', function (e) {
					if (!$(e.target).closest('.b-toggler').length) {
						this.close();
					}
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
			this._$toggler.removeClass(opennedClass);
			this._$panel.removeClass(opennedClass);
			this._$dummyPanel.removeClass(opennedClass);

			if (this._closeOnBlur) {
				$(document).off('click.dj-feedback');
			}

			this._onClose();
		},

		/**
		 * Toggle toggler panel
		 *
		 * @public
		 */
		toggle: function () {
			if (this._$toggler.hasClass(opennedClass)) {
				this._close();
			} else {
				this._open();
			}
		},

		/**
		 * Open toggler panel
		 *
		 * @public
		 */
		open: function () {
			this._open();
		},

		/**
		 * Close toggler panel
		 *
		 * @public
		 */
		close: function () {
			this._close();
		}
	};

	return Toggler;
});
