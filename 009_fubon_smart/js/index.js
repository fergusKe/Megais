(function() {
	$(function() {
		setButton();
	});

	function setButton() {
		// $('.popup-link').on('click', function(e) {
		// 	var link = $(this).attr('link');
		// 	var goToLink = confirm('您即將離開本網站\n並導向外部網站 ' + link + '\n您確定開啟此連結');
		// 	if (goToLink) {
		// 		var newwin = window.open();
		// 		 newwin.location= link;
		// 	}
		// });
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
		console.log('winH = ', winH);
		console.log('notesControlH = ', notesControlH);
		console.log('notesH = ', notesH);
		console.log('footerH = ', footerH);

		console.log('underNotesH = ', underNotesH);
		if ( winH > underNotesH ) {
			top = top - ( winH - underNotesH );
		}
		console.log('top = ', top);
		$('html, body').animate({
			scrollTop: top
		}, 1300, 'easeInOutQuint');
		setTimeout(function() {
			$('.notes-controller span').fadeOut(200, function() {
				$(this).css('background-position', '0 -22px').fadeIn(200);
			});
		}, 550);
	}
})(jQuery);