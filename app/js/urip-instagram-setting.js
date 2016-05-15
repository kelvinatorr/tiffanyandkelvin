$(document).ready(function(){
	/* =================
	   Instagram Gallery
	====================*/
	var clientId = 'ee34ab633cf948c18ab6402e65b82a9f'; // YOUR INSTAGRAM CLIENT ID

	function createPhotoElement(photo) {
	  var innerHtml = $('<img>')
	    .addClass('instagram-image')
	    .attr('src', photo.images.thumbnail.url);

	  innerHtml = $('<a>')
	    .attr('target', '_blank')
	    .attr('href', photo.link)
	    .append(innerHtml);

	  return $('<li>')
	    .addClass('instagram-placeholder')
	    .attr('id', photo.id)
	    .append(innerHtml);
	}

	function didLoadInstagram(event, response) {
	  var that = this;

	  $.each(response.data, function(i, photo) {
	    $(that).append(createPhotoElement(photo));
	  });
	}

	$('.instagram.tag').on('didLoadInstagram', didLoadInstagram);
	$('.instagram.tag').instagram({
		hash: 'tnwconference', // REPLACE WITH YOUR CHOSEN HASHTAG
		count: 12,
		clientId: clientId
	});

});



