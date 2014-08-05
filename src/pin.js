(function ($) {
	'use strict';

	var _self, state, pinPos;
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
			window.onscroll = methods.scroll;
		},
		'options': function () {
			return options;
		},
		'setPin': function (jq) {
			options.target = {};
			options.target.el = jq;
			options.target.top = jq.offset().top;
			options.target.height = jq.outerHeight()
			options.target.el.css({
				'position': 'fixed',
				'z-index': options.zIndex,
				'width': jq.outerWidth(),
				'height': jq.outerHeight()
			});

			pinPos = methods.setLimit();
		},
		'setSibling': function (jq) {
			var sibling = jq.siblings().first();
			var currentTopMargin = parseInt(sibling.css('margin-top'));
			sibling.css('margin-top', currentTopMargin + options.target.height);
		},
		setLimit: function () {

			var limitNum = (typeof options.stopper === 'string') ?
				$(options.stopper).offset().top :
				$('body').outerHeight();
			return limitNum - (options.target.height + options.target.top);
		},
		updatePosition: function(cssObj){
			options.target.el.css(cssObj);
		},
		getPaddedStyle: function(val){
			return {
				'position': 'fixed',
				'padding-top': val,
				'top': 0
			};
		},
		getTopStyle: function(val){
			return {
				'position': 'fixed',
				'padding-top': 0,
				'top': val
			};
		},
		getLimitStyle: function(val){
			return {
				'position': 'absolute',
				'top': val
			};
		},
		'scroll': function(){
			state = window.scrollY >= pinPos;

			if(!state && window.scrollY > options.target.top){
				methods.updatePosition(methods.getPaddedStyle(options.target.top));
			}
			if(!state && window.scrollY <= options.target.top){
				methods.updatePosition(methods.getTopStyle(options.target.top));
			}
			if(state){
				methods.updatePosition(methods.getLimitStyle(pinPos));
			}
		}
	};

	$.fn.pin = function (arg) {
		_self = this;

		if (methods[arg]) {
			return methods[arg].apply(_self, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof arg === 'object' || !arg) {
			return methods.init.apply(_self, arguments);
		}

		return _self;
	};
})(jQuery);
