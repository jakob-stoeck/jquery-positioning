(jQuery(function($){
	var wrapper = $('#wrapper');
	var css = $('#css_content');
	var wrapperOffset = wrapper.offset();
	var defaultHeight = 50;
	var defaultWidth = 150;
	var columns = 20;
	var topMargin = 750;
	var wrapperWidth = 760;
	var wrapperHeight = 600;

	wrapper.height(wrapperHeight);
	wrapper.width(wrapperWidth);

	$('#html_content').change(function() {
		var row = 0;
		var column = 0;
		
		$.each($('*', $(this).val()), function(i) {
			if(i%5 === 0) {
				row++;
				column = 0;
			}
			var newE = $('<div></div>');
			newE.text(this.id).resizable().draggable();
			newE.css({
				'position': 'absolute',
				'top': (defaultHeight + 2) * row + topMargin + 'px',
				'left': column * defaultWidth + 2 + 'px',
				'width': defaultWidth + 'px',
				'height': defaultHeight + 'px'
			});
			newE.dblclick(function() {
				$(this).css({
					'left': wrapperOffset.left + wrapperWidth/2 + 'px',
					'top': wrapperOffset.top + wrapperHeight/2 + 'px'
				}).unbind('dblclick');
			});
			column++;
			wrapper.append(newE);
		});
	});

	$('#get_css').click(function() {
		css.empty();
		$.each(wrapper.children(), function() {
			$this = $(this);
			var pos = $this.offset(); // position doesn't work because draggables are absolutely positioned
			var left = pos.left - wrapperOffset.left - 1;
			var top = pos.top - wrapperOffset.top - 1;

			if(left < wrapperWidth && top < wrapperHeight) {
				css.append('.jpoker_table .jpoker_ptable_' + $this.text() + ' {width: ' + $this.outerWidth() + 'px; height: ' + $this.outerHeight() + 'px; position:absolute; left:' + left + 'px; top:' + top + 'px; }\r');
			}
		});
	});
}));
