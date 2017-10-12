$(function() {

	// Get the form.
	var form = $('#contactform');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});

$(window).on('load', function() {

	$('.card-link a').smoothScroll({offset: -25});

	if ($(window).scrollTop() >= 100) {
		navChanges();
	}

	$('#more').click(function() {
		$('.nav-dropdown').slideToggle(200);
		if ($(window).scrollTop() < 100) {
			navChanges();
		}

	});

	$(window).resize(function() {
		if($(window).width() > 680) {
			$('.nav-dropdown').hide();
		}
	});

	$(window).scroll( function() {
		if ($(window).scrollTop() >= 100) {
			navChanges();
		}
		else {
			navRevert();
		}
    	if ($('.nav-dropdown').is(":visible")) {
    		$('.nav-dropdown').fadeOut(200);
    	}
    });
});

function navChanges() {
		
	$('.navbar').addClass('scrolled-nav')
	$(".logo-link img").attr("src","images/me-logo-blk.svg");
	$('#more img').attr("src","images/moreblk.svg");
}

function navRevert() {
	$('.navbar').removeClass('scrolled-nav');
	$(".logo-link img").attr("src","images/me-logo-wht.svg");
	$('#more img').attr("src","images/morewht.svg");
}