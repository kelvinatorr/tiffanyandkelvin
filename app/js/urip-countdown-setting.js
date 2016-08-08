$(document).ready(function(){
	/* =================
		Countdown Timer
	====================*/
	$('.countdown-timer').countdown('2015/11/21', function(event) { // DEFINE YOUR DATE HERE
	   var $this = $(this).html(event.strftime(''
	    + '<li><span class="time-number">%D</span> <span class="time-name">Days</span></li>'
	    + '<li><span class="time-number">%H</span> <span class="time-name">Hours</span></li>'
	    + '<li><span class="time-number">%M</span> <span class="time-name">Minutes</span></li>'
	    + '<li><span class="time-number">%S</span> <span class="time-name">Seconds</span></li>'));
	});
});



