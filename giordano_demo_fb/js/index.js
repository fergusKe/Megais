(function($) {
	var thisPageNum = 0;
	var windowObj = {},
	_gameObj = {};
	$(function() {
		if(Fun.detectmobile.isMobile){
			var url = "m/",
			params = window.location.href.split("?")[1];
		    if(params){
		        url += "?" + params;
		    }
        
	        window.location.href = url;
	    }
		init();
	});

	function init(){
		$('.rules_content').rollbar({pathPadding: '0px'});
		TweenMax.staggerFrom( '.index .animate', 1, {y:100, opacity: 0}, 0.2);
		setButton();
		setEventListener();
		//imgLoader($('.bg img').eq(0).attr('src'), resizeBgFunction);
		//_gameObj.nowEle = $('.step1');
		changeStep('step1');
		initGame();

		// 滿版背景
		var img = new Image;
		img.onload = function() {
			$(window).resize(function() {
				resizeBgFunction();
			}).resize();
		};
		img.src = $('.bg img').attr('src');
	}

	function setButton() {
		$('.nav .award').on('click', function() {
			alert('敬請期待');
		});
		$('.index .letsgo-btn').on('click', function() {
			$('.nav .taiwan').click();
		});
		$('.logo').on('click', function() {
			$('.nav .index').click();
			navDown();
		});
		if (Fun.detectmobile.isIE) {
			console.log('ie');
            $('#field, #field-svg').addClass('ie');
        }
  		// console.log('Fun.detectmobile.isIE = ', Fun.detectmobile.isIE);

		/*nav*/
		$('.nav li').not('.award, .shopping, .fb').on('click', function() {
			var thisPage = "." + $(this).prop('class');
			thisPageNum = $(this).attr('page');
			TweenMax.to( $('.page-box'), .8, {
				left: - windowObj.w * thisPageNum,
				ease: Power1.easeInOut
			});
			if ( !$(this).hasClass('active') ) {
				if (thisPage == ".taiwan") {
					for (var i = 1; i <= 7; i++) {
						if ( $('#step' + i).css('display') == "block" ) {
							TweenMax.staggerFrom( $('#step' + i).find('.animate'), 1, {y:100, opacity: 0}, 0.2);
						}
					}
				} else {
					TweenMax.staggerFrom( $(thisPage).find('.animate'), 1, {y:100, opacity: 0}, 0.2);
				}
			}

			$('.nav li').removeClass('active');
			$(this).addClass('active');

			navDown();

			if(_gameObj.nowStep = "step7") changeStep("again");
		});
		$('.menu-controller').on('click', function() {
			if ( $(this).hasClass('active') ) {
				navDown();
			} else {
				navUp();
			}
		});
		function navDown() {
			console.log('navDown');
			$('.menu-controller').removeClass('active');
			TweenMax.to( $('.nav'), .4, {
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
		}
		function navUp() {
			$('.menu-controller').addClass('active');
			TweenMax.to( $('.nav'), .4, {
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

		/*taiwan*/
		$('.taiwan #step5 .law').on('click', function(e) {
			e.preventDefault();
			alert('本人已詳細閱讀並同意將上開之本人個人資料(包含姓名、性別、出生年月日、手機號碼、E-mail等資訊)提供予香港商捷時海外貿易有限公司台灣分公司(GIORDANO)（以下簡稱「GIORDANO」）及其委外服務廠商，基於消費行為統計及調查分析、客戶管理與服務、市場調查、產品開發或行銷及其他合於營業登記項目或章程所定之業務需要等目的為蒐集、處理與利用，並得以自動化機器(包含電磁記錄或其他類似方式)或其他非自動化之方式為利用(包括但不限於儲存、編輯、傳輸、建檔等)，且不限定利用之期間與地區，暨得基於上開目的將本人提供之個人資料匿名處理後提供予第三人處理、使用。本人有權查詢、請求閱覽、製給複製本、請求補充或更正、請求停止蒐集、處理或利用及刪除本人提供之個人資料(但「GIORDANO」基於依法應盡之義務或執行業務所必須者，不在此限)，行使權利之方式逕以電話通知「GIORDANO」0800-020-198辦理。本人了解可自由選擇是否提供個人資料，惟若未提供或資料不完整時，本人參加抽獎權益將受影響，「GIORDANO」亦將無法提供相關服務。');
		});

		// 切換 step
		$(".taiwan #step1 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step1") return;
			_gameObj.step1 = $('#step1 .slider .active').index();
			changeStep("step2");
			// TweenMax.staggerFrom( '.taiwan #step2 .animate', 1, {y:100, opacity: 0}, 0.2);
		});

		$(".taiwan #step2 .prev-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step2") return;
			_gameObj.step2 = $('#step2 .slider .active').index();
			changeStep("step1");
			TweenMax.staggerFrom( '.taiwan #step1 .animate', 1, {y:100, opacity: 0}, 0.2);
		});

		$(".taiwan #step2 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step2") return;
			_gameObj.step2 = $('#step2 .slider .active').index();
			changeStep("step3");
			TweenMax.staggerFrom( '.taiwan #step3 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step3 .prev-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step3") return;
			changeStep("step2");
			TweenMax.staggerFrom( '.taiwan #step2 .animate', 1, {y:100, opacity: 0}, 0.2);
		});

		$(".taiwan #step3 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step3") return;
			_gameObj.step3 = $('#step3 .slider .active').index();
			checkBigPhoto();
			TweenMax.staggerFrom( '.taiwan #step4 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step4 .prev-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step4") return;
			changeStep("step3");
            TweenMax.staggerFrom( '.taiwan #step3 .animate', 1, {y:100, opacity: 0}, 0.2);
		});

		$(".taiwan #step4 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step4") return;
			//window.fbLoginCallBack(true);
            Fun.loadingChange(true);
            FBapi.fbLogin({permissions:["publish_actions"]});
            TweenMax.staggerFrom( '.taiwan #step5 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step5 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step5") return;
			formCheck();
			TweenMax.staggerFrom( '.taiwan #step6 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step6 #fb-share-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step6") return;
			// window.fbUIShareCallBack(true);
			//fbUIShare();
			showShareInterface();
			TweenMax.staggerFrom( '.taiwan #step7 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step6 #next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step6") return;
			changeStep("step7");
			TweenMax.staggerFrom( '.taiwan #step7 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$('#fb-checkIn .fb-checkIn-btn').on('click', function(e){
			e.preventDefault();
			fbApiShare();
		});

		$('#fb-checkIn .cancel-btn').on('click', function(e){
			e.preventDefault();
			Fun.eleFadeOut($('#fb-checkIn'));
        	changeStep("step7");
		});

		$(".taiwan #step7 .next-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step7") return;
			changeStep("again");
			TweenMax.staggerFrom( '.taiwan #step1 .animate', 1, {y:100, opacity: 0}, 0.2);
		});
		
		$(".taiwan #step7 .story-btn").on('click', function(e){
			e.preventDefault();
			if(_gameObj.nowStep != "step7") return;
			$('.nav .story').click();
			//window.open("http://www.giordano.com");
		});
		
		$(".taiwan #step7 .shopping-btn").on('click', function(e){
			// e.preventDefault();
			if(_gameObj.nowStep != "step7") return;
			window.open("http://www.giordano.com");
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
		/*$('.taiwan .slider li').not('.active').mouseenter(function() {
			$(this).css({zIndex: 5});
		}).mouseout(function() {
			$(this).css({zIndex: ''});
		});*/

		/*story*/
		$('.story .step1 .next-btn').click(function() {
			$('.story .step1').fadeOut(function() {
				$('.story .step2').fadeIn();
				TweenMax.staggerFrom( '.story .step2 .animate', 1, {y:100, opacity: 0}, 0.2);
			});
		});
		$('.story .step2 .photo li').click(function() {
			var index = $(this).index();
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.story .step2 .info li').eq(index).addClass('active').siblings('li').removeClass('active');
		});
	}

	function setEventListener(){
		$(window).resize(function() {
			windowObj.w = $(document).width();
			$('.page-box').css({
				left: - windowObj.w * thisPageNum
			});
			TweenMax.killTweensOf($('.page-box'));

			var humanImg_W = $('.index .human img').width();
			var humanImg_H = $('.index .human img').height();
			$('.index .main').height(humanImg_H);
			$('.index .title').css({left: humanImg_W - 15});
		}).resize();
	}

	function initGame(){
		_gameObj.bigPhotoArr = [];
		//類別1
		_gameObj.bigPhotoArr.push([
			{title:"溫暖人情味", place:"九份老街", shareTxt:"走在小徑，我在人聲鼎沸的九份化身千尋，彷彿進入神隱少女場景", placeID:"1556662507957198"}
			, {title:"溫暖人情味", place:"鹿港老街", shareTxt:"紅磚道上沒有喧鬧，我放慢步調，在鹿港傳統店鋪尋回童年的記憶", placeID:"155260911218401"}
			, {title:"溫暖人情味", place:"基隆廟口", shareTxt:"縱使沒有米其林指南加持，熱鬧的廟口攤販美食卻總讓我幸福滿足", placeID:"1012844792071927"}
		]);

		//類別2
		_gameObj.bigPhotoArr.push([
			{title:"獨特景觀", place:"阿里山", shareTxt:"阿里山的雲海、神木、小火車，悠遊享受在如人間秘境的最佳地點!", placeID:"199466366738679"}
			, {title:"獨特景觀", place:"日月潭", shareTxt:"依山傍水，日月潭的湖光山色一覽無遺，品味幽雅而恬靜的潭邊氛圍", placeID:"109412002418580"}
			, {title:"獨特景觀", place:"太魯閣", shareTxt:"走遍世界勝景，不如看鬼斧神工的太魯閣，那美麗的縱谷地形與原始生態", placeID:"143141432416418"}
		]);

		//類別3
		_gameObj.bigPhotoArr.push([
			{title:"節慶風俗", place:"平溪天燈", shareTxt:"盞盞天燈冉冉上升，是我記憶中的美好經驗，也是幸福與夢想的開端!", placeID:"344428088980799"}
			, {title:"節慶風俗", place:"蘭嶼飛魚季", shareTxt:"接受一場離島原住民的文化洗禮，盡情宣洩對海洋的愛戀吧!", placeID:"271693419587697"}
			, {title:"節慶風俗", place:"台南鹽水蜂炮", shareTxt:"蜂炮震響雲霄，不僅為台灣祈福，更為春節尾聲畫上狂樂的休止符!", placeID:"205404879558805"}
		]);

		//tag
		_gameObj.tagArr = ["images/taiwan/step4/tag-Alex.png", "images/taiwan/step4/tag-Michelle.png", "images/taiwan/step4/tag-Amy.png"];
		setForm();
	}

    function changeStep(pStep){
    	console.log('pStep = ', pStep);
        _gameObj.nowStep = pStep;
    	switch(_gameObj.nowStep){
    		case "step1":
                eleShowAndHide('#step1');
    		break;
    		case "step2":
                eleShowAndHide('#step2');
    		break;
            case "step3":
            	$('#step3 .slider').attr('class', 'slider type' + (_gameObj.step2 + 1));
                eleShowAndHide('#step3');
            break;
            case "step4":
                eleShowAndHide('#step4');
            break;
            case "step5":
            	if(!_gameObj.form){
            		changeStep('step6');
					TweenMax.staggerFrom( '.taiwan #step6 .animate', 1, {y:100, opacity: 0}, 0.2);
            	}else{
            		eleShowAndHide('#step5');
            	}
                
            break;
            case "step6":
               eleShowAndHide('#step6'); 
            break;
            case "step7":
               eleShowAndHide('#step7'); 
            break;
    		case "again":
                delete _gameObj.step1;
                delete _gameObj.step2;
                delete _gameObj.step3;
                delete _gameObj.game_id;
                delete _gameObj.feedID;
                $("[prompt]").each(function(i) {
                    $(this).val($(this).attr('prompt')).trigger('blur');
                });
                $('.taiwan .bg img').attr('src', 'images/taiwan/taiwan-bg.jpg');
                changeStep('step1');
    		break;
            case "checkBigPhoto":
            break;
    	}
        //_nowStep = pStep;
    }

	function checkBigPhoto() {
		var obj = _gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3],
		imgUrl = "images/taiwan/step4/bg0_step2_-_step3_.jpg";
	    if (!obj.photo) {
	    	imgUrl = imgUrl.replace("_step2_", _gameObj.step2 + 1);
	    	imgUrl = imgUrl.replace("_step3_", _gameObj.step3 + 1);
	    	imgLoader(imgUrl, checkBigPhotoComplete);
	    }else {
	    	var tagClassName = "tag" + (_gameObj.step2 + 1) + "-" + (_gameObj.step3 + 1);
	    	$('.taiwan #tag').attr('class', tagClassName).find('img').attr('src', _gameObj.tagArr[_gameObj.step1]);
	    	$('.taiwan .bg img').attr('src', obj.photo);
	    	$('.taiwan #step4 #title').html('#' + obj.title);
	    	$('.taiwan #step4 #place').html('@' + obj.place);
	    	$("input#share_txt").attr('prompt', obj.shareTxt).val("").trigger('blur');
	    	changeStep("step4");
	    }
	    
	}

	function checkBigPhotoComplete(){
		_gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3].photo = $(this).attr('src');
		checkBigPhoto();
		console.log($(this).attr('src'));
	}

    function eleShowAndHide(pStr){
    	console.log('eleShowAndHide = ', pStr);
    	if(Fun.isIE8()){
    		eleShowAndHideIe8(pStr);
    		return;
    	}
        if(_gameObj.nowEle){
            Fun.eleFadeOut(_gameObj.nowEle, 'normal', function(){
            	Fun.eleFadeIn(_gameObj.nowEle);
            });

            delete _gameObj.nowEle;
        }
        _gameObj.nowEle = $(pStr);
        
    }
    function eleShowAndHideIe8(pStr) {
    	if(_gameObj.nowEle){
    		_gameObj.nowEle.hide();
    		delete _gameObj.nowEle;
    	}
    	_gameObj.nowEle = $(pStr);
    	_gameObj.nowEle.show();
    }

	function setForm(){
        Fun.setForm();
        /*$('#address_select').twzipcode({
            countyName: "city",
            districtName: "area",
            zipcodeName: "zipcode",
            countySel: "",//預設縣市
            districtSel: "",//預設區
            css: ["city","area", "zipcode"]//可以單獨設定css
        });*/

	    $('#share_txt').on('keyup', function(){
	        setRemainWord($(this).val().length);
	    }).on('blur', function(){
	    	if ($(this).val() == "" || $(this).val() == $(this).attr("prompt")) {
                setRemainWord(0);
            };
	    }).trigger('blur');

	    var yyNum = 1900;
	    $('#year').html('');
	    while(yyNum <= 2016){
	    	$('#year').append(rendreOption(yyNum));
	    	yyNum++;
	    }
	    var mmNum = 1;
	    $('#month').html('');
	    while(mmNum <= 12){
	    	$('#month').append(rendreOption(mmNum));
	    	mmNum++;
	    }

	    $('#year').on('change', function(e){
	    	$('#month').trigger('change');
	    });

	    $('#month').on('change', function(e){
	    	setOptionDay();
	    });

	    $('#day').on('change', function(e){
	    	_gameObj.dayNum = parseInt($(this).val());
	    });
	    $('#year')[0].selectedIndex = 80;
	    $('#year').trigger('change');
	}

	function setRemainWord(pNum){
		$('.remain-word').html(30 - pNum);
	}

	function setOptionDay(){
		var ddSum = monthToDay($('#year').val(), $('#month').val());
		$('#day').html("");
		for(var ddNum = 1; ddNum <= ddSum; ddNum++){
	    	$('#day').append(rendreOption(ddNum));
		}
		if(!_gameObj.dayNum || _gameObj.dayNum > ddSum){
			_gameObj.dayNum = 1;
		}
		$('#day')[0].selectedIndex = _gameObj.dayNum - 1;
	}

	function monthToDay(pYY, pMM) {
	    var dayNum = 31;
	    if (pMM == 4 || pMM == 6 || pMM == 9 || pMM == 11) {
	        dayNum = 30;
	    } else if (pMM == 2) {
	        dayNum = 28;
	        var checkBol = (pYY % 400 == 0) || (pYY % 4 == 0 && pYY % 100 != 0);
			if(checkBol){
				dayNum = 29;
			}
	    }
	    return dayNum;
	}

	function rendreOption(pNum){
		var optStr = '<option value="_num_">_num_</option>';
		optStr = optStr.replace(/_num_/g, pNum);
		return optStr;
	}

    function margeCheck(){
        var inputText = $("input#share_txt");
        //if(!checkValue(inputText)){ return false;}
       
        var sendObj = {};
        sendObj.step1 = _gameObj.step1 + 1;
        sendObj.step2 = _gameObj.step2 + 1;
        sendObj.step3 = _gameObj.step3 + 1;
        sendObj.txt = inputText.val();
        margePhoto(sendObj);
    }
	
    function formCheck(){
        if(!$('#field').prop("checked")){
        	alert("您尚未閱讀權利義務之相關條款");           
            return false;
        }

        var name_check  =/^[\u4e00-\u9fa5][\u4e00-\u9fa5]*$/;
        var inputName = $("input#name");
        if(!checkValue(inputName)){ return false;}
       
        var phone_check=/^0[0-9]{8,9}$/;
        var inputPhone = $("input#phone");
        if(!checkValue(inputPhone, phone_check, "電話格式錯誤")){ return false;}

        var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var inputEmail = $("input#email");
        if(!checkValue(inputEmail, email_check, "email格式錯誤")){ return false;}

        var sendObj = {};
        sendObj.step1 = _gameObj.step1 + 1;
        sendObj.step2 = _gameObj.step2 + 1;
        sendObj.step3 = _gameObj.step3 + 1;
        sendObj.txt = $("input#share_txt").val();
        sendObj.photo_url = _gameObj.photo_url;
        sendObj.name = inputName.val();
        sendObj.sex = $('input[name=gender]:checked').val();
        sendObj.birthday = $('#year').val() + '/' + $('#month').val() + '/' + $('#day').val();
        sendObj.phone = inputPhone.val();
        sendObj.email = inputEmail.val();
        sendObj.game_id = _gameObj.game_id;
        addUserData(sendObj);
    }
	
    function checkValue(pInput, pCheck, pCheckMsg){
    	pCheck = pCheck || false;
    	pCheckMsg = pCheckMsg || false;
        if(pInput.val() == "" || pInput.val() == pInput.attr('prompt') ){
            alert(pInput.attr('prompt'));                          
            pInput.focus();
        	return false;
        }

        if(pCheck){
	        if(!pCheck.test(pInput.val())){
	            alert(pCheckMsg);
	            pInput.focus();
	            return false;
	        }
        }
        return true;
    }

    /*function fbUIShare(){
        var shareObj = {}, obj = _gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3];
        shareObj.link = FBapi.host_name + "fb.html?utm_source=Facebook&utm_medium=social&utm_content=FB_share&utm_campaign=giordano_2016event&rnd=" + parseInt(Math.random() * 100000);
        shareObj.picture = FBapi.host_name + _gameObj.photo_url + "?rnd=" + parseInt(Math.random() * 100000);
        shareObj.name = "我相信台灣#_title_ 的美好‧我在台灣@_place_";
        shareObj.caption = "GIORDANO-相信台灣，我在台灣！";
        shareObj.description = "與GIORDANO一起發現美麗的台灣！6/30前至實體門市消費，憑FB分享畫面即可享滿額現抵唷！快分享吧！";
        shareObj.place = "189120677807743";
        shareObj.name = shareObj.name.replace('_title_', obj.title);
        shareObj.name = shareObj.name.replace('_place_', obj.place);
        FBapi.fbUIShare(shareObj);
        Fun.loadingChange(true);
        console.log(shareObj);
    }*/

    function showShareInterface(){
    	var shareObj = _gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3], ele = $('#fb-checkIn');
    	shareObj = $.extend(shareObj, getFbObj());
    	ele.find('.name').html(shareObj.fb_name);
    	ele.find('.user img').attr('src', FBapi.getFbHeadUrl(shareObj.fb_id));
    	ele.find('.type').html(shareObj.title);
    	ele.find('.location').html(shareObj.place);
    	ele.find('.locationPhoto img').attr('src', _gameObj.photo_url);
    	Fun.eleFadeIn(ele);
    }

    function fbApiShare(){
        var shareObj = {}, obj = _gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3], msg, msgEle;
        shareObj.link = FBapi.host_name + "fb.html?utm_source=Facebook&utm_medium=social&utm_content=FB_share&utm_campaign=giordano_2016event&rnd=" + parseInt(Math.random() * 100000);
        shareObj.picture = FBapi.host_name + _gameObj.photo_url;
        shareObj.name = "我相信台灣#_title_ 的美好‧我在台灣@_place_";
        shareObj.caption = "GIORDANO-相信台灣，我在台灣！";
        shareObj.description = "與GIORDANO一起發現美麗的台灣！6/30前至實體門市消費，憑FB分享畫面即可享滿額現抵唷！快分享吧！";
        shareObj.place = "189120677807743";
        shareObj.name = shareObj.name.replace('_title_', obj.title);
        shareObj.name = shareObj.name.replace('_place_', obj.place);
        shareObj.place = obj.placeID;
        msgEle = $('#message');
        msg = Fun.replaceBr(Fun.trim(msgEle.val()));
        if(msg != "" && msg != msgEle.attr('prompt')){
        	shareObj.message = msgEle.val();
        }
        FBapi.fbApiShare(shareObj);
        Fun.loadingChange(true);
        console.log(shareObj);
    }

    //loader
    function imgLoader(pSrc, pFun){
    	pFun = pFun || function(){};
		var img = new Image;
		img.onload = pFun;
		img.error = function(){console.log($(this).attr('src'));}
		img.src = pSrc;
    }

    //data
    function margePhoto(pObj){
        var sendObj = $.extend(getFbObj(), pObj);
        Fun.loadingChange(true);
        $.post("merge", sendObj, function(data){
            Fun.loadingChange(false);
            if(data.result){
                _gameObj.game_id = data.game_id;
                _gameObj.form = data.form;
                _gameObj.photo_url = data.photo_url;
				changeStep("step5");
            }else{

                alert(data.msg);
            }
        }, 'json');
        /*_gameObj.game_id = "1234567890";
        _gameObj.form = true;
        _gameObj.photo_url = _gameObj.bigPhotoArr[_gameObj.step2][_gameObj.step3].photo;
        changeStep("step5");*/
    }

    function addUserData(pObj){
        var sendObj = $.extend(getFbObj(), pObj);
        Fun.loadingChange(true);
        $.post("add_user_data", sendObj, function(data){
            Fun.loadingChange(false);
            if(data.result){
                //alert("資料送出成功！");
                //_userObj.event_id = data.event_id;
                _gameObj.game_id = data.game_id;
                changeStep("step6");
				console.log(data);
            }else{
                alert(data.msg);
            }
        }, 'json');
        /*changeStep("step6");
        console.log(sendObj);*/
    }

    function addShare(pObj){
        var sendObj = $.extend(getFbObj(), pObj);
        //Fun.loadingChange(true);
        $.post('add_share', sendObj, function(data){
            //Fun.loadingChange(false);
            if(data.result){
                
            }else{
                alert(data.msg);
            }
            
        }, 'json');
    }

    function getFbObj(){
        var obj = {};
        obj.fb_id = FBapi.userObj.fb_id;
        obj.fb_name = FBapi.userObj.fb_name;
        obj.fb_accessToken = FBapi.userObj.fb_accessToken;
        /*obj.fb_id = "aa123456789";
        obj.fb_name = "samuel";*/
        obj.device = "pc";
        if(Fun.detectmobile.isMobile){
            obj.device = "m";
        }

        return obj;
    }

    //facebook
    window.fbLoginCallBack = function(pBol){
        pBol = pBol || false;
        Fun.loadingChange(false);
        if(pBol){
        	Fun.loadingChange(true);
            margeCheck();
        }else{
        	alert("你尚未同意GIORDANO活動API或授權publish_actions的權限！");
        }
        
    };

    /*window.fbUIShareCallBack = function(pBol){
        pBol = pBol || false;
        Fun.loadingChange(false);
        if(pBol){
            addShare({game_id:_gameObj.game_id});
            _gameObj.feedID = FBapi.userObj.post_id;
            var img = 'images/taiwan/step5/checkIn/checkIn_type___place_.png';
            img = img.replace('_type_', (_gameObj.step2 + 1));
            img = img.replace('_place_', (_gameObj.step3 + 1));
            $('#fb-checkIn .animate').attr('src', img);
            Fun.eleFadeIn($('#fb-checkIn'));
        }else{
        	changeStep("step7");
        }
        TweenMax.staggerFrom( '.taiwan #step7 .animate', 1, {y:100, opacity: 0}, 0.2);
    }*/

    window.fbApiShareCallBack = function(pBol){
        pBol = pBol || false;
        Fun.loadingChange(false);
        if(pBol){
        	addShare({game_id:_gameObj.game_id});
        }else{
        	
        }
        changeStep("step7");
        $('#fb-checkIn .cancel-btn').trigger('click');
    }

    function resizeBgFunction() {
		var options = {
			minWidth: 1200,
			minHeight: 730
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