(function($) {
	var sliderIndex = 0;
	var sliderLiLength = 0;
	isMobile();
	$(function() {
		setButton();
		autoSlider();
	});
	function isMobile() {
		if(Fun.detectmobile.isMobile){
	        var params = location.href.split("?")[1],
	        url = "m/";
	        if(params){
	            url += "?" + params;
	        }
	        location.href = url;
	    };
	}
	function setButton() {
		sliderLiLength = $('.slider li').length;
		$('.slider .next-btn').on('click', function() {
			sliderIndex++;
			slider();
		});
		$('.slider .prev-btn').on('click', function() {
			sliderIndex--;
			slider();
		});
		$('.notes-controller').on('click', function() {
			$(this).toggleClass('active');
			if ( $(this).hasClass('active') ) {
				$('.notes').slideDown(500);
				scrollToNotes();
			} else {
				$('.notes').slideUp(1100, "easeInOutQuart");
				setTimeout(function() {
					$('.notes-controller span').fadeOut(200, function() {
						$(this).css('background-position', '0 0').fadeIn(200);
					});
				}, 700);
			}
		});
	}
	function scrollToNotes() {
		var top = $('.notes-controller').offset().top;
		var winH = $(window).height();
		var notesControlH = $('.notes-controller').height();
		var notesH =  470;
		var footerH = $('.footer').height();
		var underNotesH = notesControlH + notesH + footerH;
		if ( winH > underNotesH ) {
			top = top - ( winH - underNotesH );
		}
		$('html, body').animate({
			scrollTop: top
		}, 1300, 'easeInOutQuint');
		setTimeout(function() {
			$('.notes-controller span').fadeOut(200, function() {
				$(this).css('background-position', '0 -22px').fadeIn(200);
			});
		}, 550);
	}
	function slider() {
		if (sliderIndex > sliderLiLength - 1) {
			sliderIndex = 0;
		} else if (sliderIndex < 0) {
			sliderIndex = sliderLiLength - 1;
		}
		$('.slider li').removeClass('active').eq(sliderIndex).addClass('active');
		$('.slider li').fadeOut();
		$('.slider li.active').fadeIn();
	}
	function autoSlider() {
		var sliderInterval = 0;
		sliderIntervalFun();
		$('.slider .next-btn, .slider .prev-btn').on('click', function() {
			clearInterval(sliderInterval);
			sliderIntervalFun();
		});
		function sliderIntervalFun() {
			sliderInterval = setInterval(function() {
				$('.slider .next-btn').click();
			}, 4000);
		}
	}
})(jQuery);