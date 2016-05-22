/* Custom jQuery Scripts For Expandable Navigation Menu by http://codyhouse.co/gem/secondary-expandable-navigation/ */
jQuery(document).ready(function($){
	/* 	FIRST TRIGGER WHEN CLICKING THE NON STICKY HEADER BUTTON */
	var $lateral_menu_trigger = $('.the-origin-header #nav-menu-trigger'),
		$content_wrapper = $('#main-content'),
		$navigation = $('.the-origin-header');

	/* 	SECOND TRIGGER WHEN CLICKING THE STICKY HEADER BUTTON */
	var $lateral_menu_trigger2 = $('.header-clone #nav-menu-trigger'),
		$content_wrapper2 = $('#main-content'),
		$navigation2 = $('.header-clone');

	//Open - Close Navigation Clickcing on the Origin Header Menu Icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('nav-wrapper-is-open');
		$content_wrapper.toggleClass('nav-wrapper-is-open');
		$('#nav-wrapper').toggleClass('nav-wrapper-opened');
		$('body').toggleClass('overflow-hidden');

		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$('body, a.nav-close').on('click', function(event){
		if( !$(event.target).is('#nav-menu-trigger, #nav-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('nav-wrapper-is-open');
			$navigation2.removeClass('nav-wrapper-is-open');
			$content_wrapper.removeClass('nav-wrapper-is-open');
			$('#nav-wrapper').removeClass('nav-wrapper-opened');
			$('body').removeClass('overflow-hidden');

			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});


	//Open - Close Navigation Clickcing on the Clone Header Menu Icon
	$lateral_menu_trigger2.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger2.toggleClass('is-clicked');
		$navigation2.toggleClass('nav-wrapper-is-open');
		$content_wrapper2.toggleClass('nav-wrapper-is-open');
		$('#nav-wrapper').toggleClass('nav-wrapper-opened');
		$('body').toggleClass('overflow-hidden');

		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$('body, a.nav-close').on('click', function(event){
		if( !$(event.target).is('#nav-menu-trigger, #nav-menu-trigger span') ) {
			$lateral_menu_trigger2.removeClass('is-clicked');
			$navigation2.removeClass('nav-wrapper-is-open');
			$content_wrapper2.removeClass('nav-wrapper-is-open');
			$('#nav-wrapper').removeClass('nav-wrapper-opened');
			$('body').removeClass('overflow-hidden');

			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

});