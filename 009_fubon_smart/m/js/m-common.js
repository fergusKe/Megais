(function($) {
	var sliderIndex = 0;
	var sliderLiLength = $('.slider li').length;
	$(function() {
		setButton();
	});
	function setButton() {
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
		$('.scrollTop-btn').on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 1000, 'easeInOutQuint');
		});
	}
	function scrollToNotes() {
		var top = $('.notes-controller').offset().top;
		var winH = $(window).height();
		var notesControlH = $('.notes-controller').outerHeight(true);
		var notesH =  2202;
		var footerH = $('.footer').outerHeight(true);
		var underNotesH = notesControlH + notesH + footerH;
		if ( winH > underNotesH ) {
			top = top - ( winH - underNotesH );
		}
		$('html, body').animate({
			scrollTop: top
		}, 1300, 'easeInOutQuint');
		setTimeout(function() {
			$('.notes-controller span').fadeOut(200, function() {
				$(this).css('background-position', '0 -30px').fadeIn(200);
			});
		}, 550);
	}
	function slider() {
		console.log('sliderIndex = ', sliderIndex);
		if (sliderIndex > sliderLiLength - 1) {
			sliderIndex = 0;
		} else if (sliderIndex < 0) {
			sliderIndex = sliderLiLength - 1;
		}
		$('.slider li').removeClass('active').eq(sliderIndex).addClass('active');
		$('.slider li').fadeOut();
		$('.slider li.active').fadeIn();
	}
})(jQuery);