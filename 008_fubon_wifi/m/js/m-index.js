(function() {
	$(function() {
		setButton();
		
		// 滿版背景
		var img = new Image;
		img.onload = function() {
			$(window).resize(function() {
				resizeBgFunction();
			}).resize();
		};
		img.src = $('.bg img').attr('src');
	});

	function setButton() {
		$('.popup-link').on('click', function(e) {
			var link = $(this).attr('link');
			var goToLink = confirm('您即將離開本網站\n並導向外部網站 ' + link + '\n您確定開啟此連結');
			if (goToLink) {
				var newwin = window.open();
				 newwin.location= link;
			}
		});
		$('.activity-controller').on('click', function() {
			$(this).toggleClass('active');
			if ( $(this).hasClass('active') ) {
				$('.activity-content').slideDown(500);
				scrollToActivity();
			} else {
				$('.activity-content').slideUp(1100, "easeInOutQuart");
				setTimeout(function() {
					$('.activity-controller img').fadeOut(200, function() {
						$(this).prop('src', 'images/activity-controller.png').fadeIn(200);
					});
				}, 700);
			}
		});
	}
	function scrollToActivity() {
		var top = $('.activity-controller').offset().top;
		$('html, body').animate({
			scrollTop: top
		}, 1000, 'easeInOutQuart');
		setTimeout(function() {
			$('.activity-controller img').fadeOut(200, function() {
				$(this).prop('src', 'images/activity-controller-open.png').fadeIn(200);
			});
		}, 600);
	}
	function resizeBgFunction() {
		var options = {
			minWidth: 1100,
			minHeight: 870
		}
		var bg = $('.bg'),
			bgImg = bg.find('img');
			bgImg.width('auto');
			bgImg.height('auto');
		var win_W = $(window).innerWidth(),
			win_H = $(window).innerHeight(),
			bgImg_W = bgImg.width(),
			bgImg_H = bgImg.height(),
			scale = Math.max( win_W / bgImg_W, win_H / bgImg_H),
			scale_W = Math.floor( bgImg_W * scale ),
			scale_H = Math.floor( bgImg_H * scale ),
			move_X = Math.floor( (win_W - scale_W) / 2 ),
			move_Y = Math.floor( (win_H - scale_H) / 2);

			if ( scale_H < options.minHeight ) {
				scale_H = options.minHeight;
				scale_W = ( scale_H / bgImg_H ) * bgImg_W;
			}
			if ( scale_W < options.minWidth ) {
				scale_W = options.minWidth;
				scale_H = ( scale_W / bgImg_W ) * bgImg_H;
			}
			if ( win_H < options.minHeight ) {
				move_Y = Math.floor( ( options.minHeight - scale_H) / 2 );
			}
			if ( win_W < options.minWidth ) {
				move_X = Math.floor( ( options.minWidth - scale_W ) / 2 );
			}

			if ( win_H < options.minHeight ) {
				// move_X = 0;
			}

			bgImg.css({
				width: scale_W,
				height: scale_H,
				left: move_X,
				top: 0
			});
	}
})(jQuery);