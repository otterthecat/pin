(function ($) {
	'use strict';

	// vars we'll use later to track & set
	// element position
	var _self, state, pinPos;

	// user configurable options
	// this object will also get a 'target' object
	// which is applied during instantiation so a user
	// cannot override it.
	var options = {
		'zIndex': 10,
		'stopper': null,
		'onPin': $.noop,
		'onStop': $.noop
	};

	// plugin's API
	var methods = {
		'init': function (opts) {
			options = $.extend(options, opts);
			methods.setPin();
			methods.setSibling();
			options.onPin();
			window.onscroll = methods.scroll;
		},
		'options': function () {
			return options;
		},
		'setPin': function () {
			options.target = {};
			options.target.top = _self.offset().top;
			options.target.height = _self.outerHeight();
			_self.css({
				'position': 'fixed',
				'z-index': options.zIndex,
				'width': _self.outerWidth(),
				'height': _self.outerHeight()
			});

			pinPos = methods.setLimit();
		},
		'setSibling': function () {
			var sibling = _self.siblings().first();
			var currentTopMargin = parseInt(sibling.css('margin-top'), 10);
			sibling.css('margin-top', currentTopMargin + options.target.height);
		},
		setLimit: function () {

			var limitNum = (typeof options.stopper === 'string') ?
				$(options.stopper).offset().top
				: $('body').outerHeight();
			return limitNum - (options.target.height + options.target.top);
		},
		updatePosition: function(cssObj){
			_self.css(cssObj);
		},
		// getPaddedStyle, getTopStyle, and getLimitStyle
		// are object containing CSS name/values which are then
		// applied to the targeing pin element on scroll event
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
		// the style applied here fixes the
		// element to a specific point on the page and can
		// be scrolled
		getLimitStyle: function(val){
			return {
				'position': 'absolute',
				'top': val
			};
		},
		// event handler for window's scroll event
		// applied in methods.init()
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

		if (methods.hasOwnProperty(arg)) {
			return methods[arg].apply(_self, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof arg === 'object' || !arg) {
			return methods.init.apply(_self, arguments);
		}

		return _self;
	};
})(jQuery);
