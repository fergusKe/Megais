(function($) {
	$(function() {
		if(Fun.detectmobile.isMobile){
			var url = "m/",
			params = window.location.href.split("?")[1];
		    if(params){
		        url += "?" + params;
		    }
        
	        window.location.href = url;
	    }
		setButton();
		$('.rules_content').rollbar({pathPadding: '0px'});

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
		$('.nav .award').on('click', function() {
			alert('敬請期待');
		});
		$('.index .letsgo-btn').on('click', function() {
			$('.nav .taiwan').click();
		});
		/*nav*/
		$('.nav li').not('.award, .shopping, .fb').on('click', function() {
			var thisPage = "." + $(this).prop('class');
			$(thisPage).css({'z-index': 9999}).siblings('.page').css({'z-index': 1});
			TweenMax.to(thisPage, .8, {
				left: 0,
				ease: Power1.easeInOut,
				onComplete: function() {
					$(thisPage).siblings('.page').css({
						left: '200%'
					});
				}
			});
			$('.nav li').removeClass('active');
			$(this).addClass('active');
		});
		$('.menu-controller').on('click', function() {
			if ( $(this).hasClass('active') ) {
				$(this).removeClass('active');
				TweenMax.to( $('.nav'), .6, {
					bottom: -58,
					onComplete: function() {
						$('.menu-controller').css({height: 30});
						TweenMax.to( $('.menu-controller img'), .3, {
							'margin-top': 8,
							onComplete: function() {
								$('.menu-controller img').prop('src', 'images/nav/nav-btn-open.png').fadeOut(0).fadeIn();
							}
						});
						TweenMax.to( $('.nav ul'), .3, {
							'margin-top': 13
						});
						
					}
				});
			} else {
				$(this).addClass('active');
				TweenMax.to( $('.nav'), .6, {
					bottom: 32,
					onComplete: function() {
						$('.menu-controller').css({height: 18});
						TweenMax.to( $('.menu-controller img'), .3, {
							'margin-top': 4,
							onComplete: function() {
								$('.menu-controller img').prop('src', 'images/nav/nav-btn-close.png').fadeOut(0).fadeIn();
							}
						});
						TweenMax.to( $('.nav ul'), .3, {
							'margin-top': 0
						});
					}
				});
			}
			
		});

		/*taiwan*/
		// 切換 step
		var stepIndex = 1;
		var nextStepIndex = 0;
		var stepLength = $('.taiwan .next-btn').length;
		var bg = $('.taiwan .bg'),
			bgImg = bg.find('img');
		$(".taiwan .next-btn").click(function() {
			if (stepIndex > stepLength) {
				stepIndex = 1;
			}
			nextStepIndex = stepIndex + 1;
			if (stepIndex >= stepLength) {
				nextStepIndex = 1;
				bgImg.prop('src', 'images/taiwan/taiwan-bg.jpg');
			}
			// 會依據使用者選擇的地點切換背景圖
			if (nextStepIndex == 4) {
				bgImg.prop('src', 'images/taiwan/step4/bg01-1.jpg');
			}
			// console.log('stepIndex = ', stepIndex);
			// console.log('nextStepIndex = ', nextStepIndex);
			$(".taiwan .step" + stepIndex + "").fadeOut(function() {
				$(".taiwan .step" + nextStepIndex + "").fadeIn();
			});
			stepIndex++;
		});

		// step1~3 照片切換
		$('.taiwan .slider li').click(function() {
			var index = $(this).index();
			var next = index + 1;
			var prev = index - 1;
			var step = $(this).parents('.slider').parent().prop('class');
			var length = $(".taiwan ." + step + " .slider li").length;
			var sliderLi = $(".taiwan ." + step + " .slider li");

			if (next >= length) {
				next = 0;
			}
			if (prev < 0) {
				prev = length - 1;
			}
			$(this).addClass('active').siblings('li').removeClass('active');
			
			sliderLi.removeClass('center left right');
			$(this).addClass('center');
			sliderLi.eq(next).addClass('right');
			sliderLi.eq(prev).addClass('left');
		});

		/*story*/
		$('.story .step1 .next-btn').click(function() {
			$('.story .step1').fadeOut(function() {
				$('.story .step2').fadeIn();
			});
		});
		$('.story .step2 .photo li').click(function() {
			var index = $(this).index();
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.step2 .info li').eq(index).addClass('active').siblings('li').removeClass('active');
		});
	}


	function resizeBgFunction() {
		var options = {
			minWidth: 1200,
			minHeight: 700
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

			bgImg.css({
				width: scale_W,
				height: scale_H,
				left: move_X,
				top: move_Y
			});
	}
})(jQuery);