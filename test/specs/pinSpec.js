

describe('Pin jQuery Plugin', function () {
	'use strict';

	var fixture;
	beforeEach(function(){
		fixture = $('<div class="pin" style="height: 126px"></div><div class="sib"></div>');
		$('body').append(fixture);
	});

	afterEach(function(){
		$(fixture).remove();
	});

	it('should be added to jQuery fn object', function () {
		expect($.fn.pin).toBeDefined();
	});

	describe('#pin called with object', function(){
		it('should apply options if passed object', function(){
			var obj = {'stopper': '.selector'};
			$('.pin').pin(obj);

			expect($('.pin').pin('options').stopper).toMatch(obj.stopper);
		});
	});

	describe('#pin with no argumet', function(){
		it('should fire a callback when initiated', function(){
			var callbackStub = {
				'cb': function(){}
			};
			spyOn(callbackStub, 'cb');
			$('.pin').pin({'onPin': callbackStub.cb});
			expect(callbackStub.cb).toHaveBeenCalled();
		});

		it('should apply position attribute to fixed pin element', function(){
			$('.pin').pin();
			expect($('.pin').css('position')).toBe('fixed');
		});

		it('should apply margin attribute to first sibling', function(){
			$('.pin').pin();
			expect($('.pin').siblings().first().css('margin-top')).toBe('126px');
		});
	});
});
