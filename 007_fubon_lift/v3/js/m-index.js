(function($) {
	$(function() {
		init();

	});

	function init() {
		if (!Fun.detectmobile.isAndroid) {
			$('.footer .app a').prop("href", "https://itunes.apple.com/tw/app/shou-jie-fang-bian/id703477266?l=zh");
		}
	}
})(jQuery);
