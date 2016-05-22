$(document).ready(function(){
	/* ====================================
	   jQuery Youtube Player for Background
	=======================================*/
	$(function(){
		$(".call-video").YTPlayer();
	});

	var filters = {
	  opacity: 60,
	  grayscale: 50
	}
	jQuery('#ytplayer').YTPApplyFilters(filters);

});



