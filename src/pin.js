(function ($) {
	'use strict';

	var _self;
	var options = {
		'zIndex': 10,
		'stopper': null,
		'onPin': $.noop,
		'onStop': $.noop
	};

	var methods = {
		'init': function (opts) {
			options = $.extend(options, opts);
			methods.setPin(_self);
			methods.setSibling(_self);
			options.onPin();
		},
		'options': function () {
			return options;
		},
		'setPin': function (jq) {
			jq.css('position', 'fixed');
		},
		'setSibling': function (jq) {
			options.sibling = jq.siblings().first();
			options.sibling.css('margin-top', jq.outerHeight());
		}
	}

	$.fn.pin = function (method) {
		_self = this;

		if (methods[method]) {
			return methods[method].apply(_self, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			return methods.init.apply(_self, arguments);
		};

		return _self;
	};
})(jQuery);
