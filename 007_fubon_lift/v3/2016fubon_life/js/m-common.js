(function($) {
	var index, j_slider, j_slider_ul, j_slider_li, j_slider_li_widt, j_slider_li_length, tmp;
	var index = 0,
		slider1_index = 0,
		slider2_index = 0;
	var sliderInterval;

	$(function() {
		slider();
		autoSlider();
		sliderTouch();
		setNav();
		setHamburger();
		setButton();
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
	function setNav() {
		var j_win = $(window);
		var navBtn = $('.nav-btn');
		var nav = $('.nav');
		var navMask = $('.nav-mask');
		var footer = $('.footer');
		
		navBtn.click(function() {
			navBtn.removeClass('active');
			nav.slideUp();
			navMask.css({display: 'none'});
			$('body').css({
				overflow: ''
			});
			$('.header .header-content').css({
				'padding-right': ''
			});

			// console.log('j_win.offsetWidth = ', j_win.offsetWidth);
			// console.log('j_win.clientWidth = ', j_win.clientWidth);

			if ( nav.css('display') == 'none' ) {
				navBtn.addClass('active');
				nav.slideDown();
				navMask.css({display: 'block'});
				$('body').css({
					overflow: 'hidden'
				});
				$('.header .header-content').css({
					'padding-right': '15px'
				});
			}
		});
		navMask.click(function() {
			$('.hamburger ').click();
		});
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