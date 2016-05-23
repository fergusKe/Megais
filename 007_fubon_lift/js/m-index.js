(function($) {
	$(function() {
		init();
		// console.log('scrollbar = ', $.getScrollbarWidth());
		// document.body.innerHTML = "Scrollbar width is: "+getScrollbarWidth()+"px";
		
	});

	function init() {
		if (!Fun.detectmobile.isAndroid) {
			$('.footer .app a').prop("href", "https://itunes.apple.com/tw/app/shou-jie-fang-bian/id703477266?l=zh");
		}
	}

	

})(jQuery);
