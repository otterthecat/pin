(function ($) {
	'use strict';

	var _self, state, pinPos;
	var options = {
		'zIndex': 10,
		'stopper': '.mainFooter',
		'onPin': $.noop,
		'onStop': $.noop
	};

	var methods = {
		'init': function (opts) {
			options = $.extend(options, opts);
			options.target = {};
			options.sibling = {};
			methods.setPin(_self);
			methods.setSibling(_self);
			options.onPin();

			if(typeof options.stopper === 'string'){
				pinPos = $(options.stopper).offset().top - (options.target.height + options.target.top);
			}

			window.onscroll = methods.scroll;
		},
		'options': function () {
			return options;
		},
		'setPin': function (jq) {
			options.target.el = jq;
			options.target.top = jq.offset().top;
			options.target.width = jq.outerWidth();
			options.target.height = jq.outerHeight();
			options.target.el.css('position', 'fixed');
			options.target.el.css('z-index', options.zIndex);
			options.target.el.css('width', options.target.width);
			options.target.el.css('height', options.target.height);
		},
		'setSibling': function (jq) {
			options.sibling.el = jq.siblings().first();
			var currentTopMargin = parseInt(options.sibling.el.css('margin-top'));
			options.sibling.el.css('margin-top', currentTopMargin + options.target.height);
		},
		'scroll': function(){
			state = window.scrollY >= pinPos;

			if(!state && window.scrollY > options.target.top){
				options.target.el.css('position', 'fixed')
					.css('padding-top', options.target.top)
					.css('top', 0);
			}
			if(!state && window.scrollY <= options.target.top){
				options.target.el.css('position', 'fixed')
					.css('padding-top', 0)
					.css('top', options.target.top);
			}
			if(state){
				options.target.el.css('position', 'absolute')
					.css('top', pinPos);
			}
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
