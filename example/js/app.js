/**
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

/* global define */
define([
	'jquery',
	'toggler'
], function (
	$,
	Toggler
) {
	'use strict';

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

			this._toggler = new Toggler({
				name: 'test'
			});
		}
	};

	return new App();
});
