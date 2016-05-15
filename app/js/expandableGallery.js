jQuery(document).ready(function($){
	var itemInfoWrapper = $('.expandable-gallery'); // Expandable Gallery Section

	itemInfoWrapper.each(function(){
		var container = $(this),
			// create slider pagination
			sliderPagination = createSliderPagination(container);

		container.find('.expandable-gallery-item').on('click', function(event){ // Expandable Gallery Nav
			//enlarge slider images
			if( !container.hasClass('expand-gallery-active') && $(event.target).is('.expandable-gallery-item')) {
				itemInfoWrapper.removeClass('expand-gallery-active');
				container.addClass('expand-gallery-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body,html').animate({'scrollTop':container.offset().top}, 200);
				});
			}
		});

		container.find('.expandable-close').on('click', function(){
			//shrink slider images
			container.removeClass('expand-gallery-active');
		});

		//update visible slide
		container.find('.expand-next').on('click', function(){
			nextSlide(container, sliderPagination);
		});

		container.find('.expand-prev').on('click', function(){
			prevSlide(container, sliderPagination);
		});

		container.find('.expandable-gallery-item').on('swipeleft', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':last-child') && bool) {nextSlide(container, sliderPagination);}
		});

		container.find('.expandable-gallery-item').on('swiperight', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':first-child') && bool) {prevSlide(container, sliderPagination);}
		});

		sliderPagination.on('click', function(){
			var selectedDot = $(this);
			if(!selectedDot.hasClass('selected')) {
				var selectedPosition = selectedDot.index(),
					activePosition = container.find('.expandable-gallery-item .selected').index();
				if( activePosition < selectedPosition) {
					nextSlide(container, sliderPagination, selectedPosition);
				} else {
					prevSlide(container, sliderPagination, selectedPosition);
				}
			}
		});
	});

	//keyboard slider navigation
	$(document).keyup(function(event){
		if(event.which=='37' && $('.expand-gallery-active').length > 0 && !$('.expand-gallery-active .expandable-gallery-item .selected').is(':first-child')) {
			prevSlide($('.expand-gallery-active'), $('.expand-gallery-active').find('.expandable-slider-pagination li'));
		} else if( event.which=='39' && $('.expand-gallery-active').length && !$('.expand-gallery-active .expandable-gallery-item .selected').is(':last-child')) {
			nextSlide($('.expand-gallery-active'), $('.expand-gallery-active').find('.expandable-slider-pagination li'));
		} else if(event.which=='27') {
			itemInfoWrapper.removeClass('expand-gallery-active');
		}
	});

	function createSliderPagination($container){
		var wrapper = $('<ul class="expandable-slider-pagination"></ul>').insertAfter($container.find('.expandable-gallery-nav'));
		$container.find('.expandable-gallery-item li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			dot.text(index+1);
		});
		return wrapper.children('li');
	}

	function nextSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.expandable-gallery-item .selected'),
			navigationDot = $container.find('.expandable-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() + 1;
		visibleSlide.removeClass('selected');
		$container.find('.expandable-gallery-item li').eq($n).addClass('selected').prevAll().addClass('move-left');
		navigationDot.removeClass('selected')
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.expandable-gallery-item li').eq($n));
	}

	function prevSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.expandable-gallery-item .selected'),
			navigationDot = $container.find('.expandable-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() - 1;
		visibleSlide.removeClass('selected')
		$container.find('.expandable-gallery-item li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
		navigationDot.removeClass('selected');
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.expandable-gallery-item li').eq($n));
	}

	function updateNavigation($container, $active) {
		$container.find('.expand-prev').toggleClass('inactive', $active.is(':first-child'));
		$container.find('.expand-next').toggleClass('inactive', $active.is(':last-child'));
	}

	function enableSwipe($container) {
		var mq = window.getComputedStyle(document.querySelector('.expandable-gallery-item'), '::before').getPropertyValue('content');
		return ( mq=='mobile' || $container.hasClass('expand-gallery-active'));
	}
});