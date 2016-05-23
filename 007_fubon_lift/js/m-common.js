(function($) {
	var index, j_slider, j_slider_ul, j_slider_li, j_slider_li_widt, j_slider_li_length, tmp;
	var index = 0,
		slider1_index = 0,
		slider2_index = 0;
	var sliderInterval;
	var scrollbarWidth = 0;

	$(function() {
		slider();
		autoSlider();
		sliderTouch();
		setNav();
		setHamburger();
		setButton();
		// console.log('my_div1: ' + $('#my_div1').hasScrollBar());
		// console.log('content 1: ' + $(window).hasScrollBar());

		// Check if body height is higher than window height :)
		if ($("body").height() > $(window).height()) {
	        console.log("Vertical Scrollbar! D:");
	    }

	    // Check if body width is higher than window width :)
	    if ($("body").width() > $(window).width()) {
	        console.log("Horizontal Scrollbar! D:<");
	    }

		// var scrollbarWidth = getScrollbarWidth();
		// console.log('scrollbarWidth = ', scrollbarWidth);
	});

	function setButton() {
		$('.sliderBar li').click(function() {
			clearInterval(sliderInterval);
			autoSlider();
		});
	}
	function setHamburger() {
		var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

	    var hamburgers = document.querySelectorAll(".hamburger");
	    if (hamburgers.length > 0) {
	      forEach(hamburgers, function(hamburger) {
	        hamburger.addEventListener("click", function() {
	          this.classList.toggle("is-active");
	        }, false);
	      });
	    }
	}
	function getScrollbarWidth() {
	    var outer = document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    document.body.appendChild(outer);
	    
	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";
	    
	    // add innerdiv
	    var inner = document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild(inner);        
	    
	    var widthWithScroll = inner.offsetWidth;
	    
	    // remove divs
	    outer.parentNode.removeChild(outer);
	    
	    return widthNoScroll - widthWithScroll;
	}
	function setNav() {
		var j_win = $(window);
		var navBtn = $('.nav-btn');
		var nav = $('.nav');
		var navMask = $('.nav-mask');
		var footer = $('.footer');
		var navPopup = $('.nav-popup');
		var scrollbarWidth = getScrollbarWidth();
		// nav.css({
		// 	background: 'rgba(0, 0, 0, .5)'
		// });
		
		navBtn.click(function(e) {
			clearTimeout(moveYA2);
			navBtn.removeClass('active');
			// navPopup.removeClass('turn').addClass('return');
			navPopup.removeClass('turn');
			nav.slideUp(10);
			navMask.removeClass('active');
			var moveYA = setTimeout(function() {
				navMask.css({
					display: 'none'
				});
			}, 400);
			// navPopup.css({
			// 	transform: 'rotateY(-180deg)'
			// });
			// navMask.fadeOut();
			
			// setInterval(function() {
				$('html').css({
					overflow: '',
					paddingRight: ''
				});
			// }, 400);
			// $('.header .header-content').css({
			// 	'padding-right': ''
			// });
			// $('.nav .nav-content').css({
			// 	paddingLeft: ''
			// });

			// console.log('j_win.offsetWidth = ', j_win.offsetWidth);
			// console.log('j_win.clientWidth = ', j_win.clientWidth);

			if ( nav.css('display') == 'none' ) {
				clearTimeout(moveYA);
				navBtn.addClass('active');
				navMask.css({
					display: 'block'
				});
				// navPopup.delay(1000).addClass('active');
				nav.slideDown(10).find('.nav-popup').removeClass('return').addClass('turn');
				var moveYA2 = setTimeout(function() {
					navMask.addClass('active');
				}, 10);
				// navMask.fadeIn();
				// $('.header .header-content').css({
				// 	'padding-left': '15px'
				// });
				// TweenMax.to( navPopup, 0, {
				// 	display: 'block',
				// 	onComplete: function() {
				// 		TweenMax.to( navPopup, 1, {
				// 			rotationY: 0,
				// 			transformOrigin:"center center"
				// 		});
				// 	}
				// 	// ease: Power1.easeInOut
				// });
				setTimeout(function() {
					$('html').css({
						overflow: 'hidden',
						paddingRight: scrollbarWidth
					});
					// $('.nav .nav-content').css({
					// 	paddingLeft: scrollbarWidth
					// });
				}, 0);
			}
			// console.log('nav : ' + $('.nav').hasScrollBar());
		});
		nav.click(function() {
			$('.hamburger ').click();
			console.log('nav');
		});
		navPopup.on('click', function(e) {
			e.stopPropagation();
		})
	}
	$.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
	function sliderTouch() {
		var j_slider = $('.slider'),
		    startX,
		    endX;

		j_slider.on("touchstart", touchStart);
		j_slider.on("touchend", touchEnd);

		function touchStart() {
		    startX = event.targetTouches[0].pageX;
		}

		function touchEnd() {
		    endX = event.changedTouches[0].pageX;
		    moveX = endX - startX;

		    if( moveX > 50 ){
		        SliderPrevNavi();
		    }
		    
		    if( moveX < -50 ){
		    	SliderNextNavi();
		    }
		}
	}
	function slider(pOther) {
		pOther = pOther || $('.slider');
		j_slider = pOther;
		j_slider_ul = j_slider.find('.slider-content');
		j_slider_li = j_slider_ul.find('li');
		j_slider_li_width = j_slider.width();
		j_slider_li_length = j_slider_li.length;


		j_slider.append('<ul class="sliderBar"></ul>');
		j_sliderBar = $('.sliderBar');
		for (i = 0; i < j_slider_li.length; i++){
				j_sliderBar.append('<li></li>');
		}
		j_sliderBar_li = j_sliderBar.find('li');
		tmp = true;

		j_sliderBar_li.eq(index).addClass('active');
		j_sliderBar_li.click(function(){
			index = $(this).index();

			j_slider_ul.stop().animate({left: -index * j_slider_li_width }, 800, 'easeOutQuart');
			$(this).addClass('active').siblings('li').removeClass('active');
		});

		$(window).resize(function() {
			j_slider_li.width( pOther.width() );
			j_slider_li_width = pOther.width();
			j_slider_ul.stop().animate({left: -index * j_slider_li_width }, 0, 'easeOutQuart');
			
		}).resize();
	}

	function autoSlider() {
		sliderInterval = setInterval(SliderNextNavi, 4000);
	}
	function SliderNextNavi() {
		var index = $('.sliderBar .active').index();
		index++;
		if (index >= $('.sliderBar li').length) {
			index = 0;
		}
		$('.sliderBar li').eq(index).click();
	}
	function SliderPrevNavi() {
		var index = $('.sliderBar .active').index();
		index--;
		if (index > $('.sliderBar li').length) {
			index = $('.sliderBar li').length - 1;
		}
		$('.sliderBar li').eq(index).click();
	}

	function next(pSlider) {
		var slider = pSlider;
		var slider_ul = slider.find('.slider-content');
		if ( slider.hasClass('slider2') ) {
			slider2_index++;
			if (slider2_index > j_slider_li_length) {
				slider2_index = 1;
				slider_ul.css({left: 0});
				tmp = true;
			}
			index = slider2_index;
		} else {
			slider1_index++;
			if (slider1_index > j_slider_li_length) {
				slider1_index = 1;
				slider_ul.css({left: 0});
				tmp = true;
			}
			index = slider1_index;
		}
		tmp = false;

		if (index >= j_slider_li_length) {
			slider_ul.stop().animate({left: -index * j_slider_li_width }, 800, 'easeOutQuart', function() {
			});
		} else {
			slider_ul.stop().animate({left: -index * j_slider_li_width }, 800, 'easeOutQuart', function() {
				tmp = true;
			});
		}
	}
	function prev(pSlider) {
		var slider = pSlider;
		var slider_ul = slider.find('.slider-content');
		tmp = false;
		
		if ( slider.hasClass('slider2') ) {
			if (slider2_index <= 0) {
				slider2_index = j_slider_li_length
				index = j_slider_li_length;
				slider_ul.css({left: -index * j_slider_li_width });
			}
			slider2_index--;
			index = slider2_index;
		} else {
			if (slider1_index <= 0) {
				slider1_index = j_slider_li_length
				index = j_slider_li_length;
				slider_ul.css({left: -index * j_slider_li_width });
			}
			slider1_index--;
			index = slider1_index;
		}
		slider_ul.stop().animate({left: -index * j_slider_li_width }, 800, 'easeOutQuart', function() {
			tmp = true;
		});
	}
})(jQuery);