/*=========================================================================
        Preloader
=========================================================================*/
jQuery(window).load(function() {
    "use strict";
    jQuery(".preloader").delay(800).fadeOut('slow');
    jQuery("#preloader").delay(800).fadeOut('slow');

});

/*=========================================================================
            animation
=========================================================================*/
new WOW().init();

jQuery(document).ready(function() {
    "use strict";

	var top__offset = prefix.topoffset;//default 10'
	var topoffsetfinal = parseInt(top__offset);
	if( !!topoffsetfinal ){var offset_number = topoffsetfinal;}else{ var offset_number = 40;}

	var top_offset = jQuery('.navbar').height() + offset_number;  // get height of fixed navbar

	jQuery('.nav.navbar-nav li').removeClass('active');

	jQuery('.nav.navbar-nav').onePageNav({
		currentClass: 'active',
		scrollOffset: top_offset,
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: ':not(.dropdown-toggle)',
		easing: 'swing',
		begin: function() {
			jQuery(".collapse.in").removeClass("in");
		},
		end: function() {

		}
	});

});


/*=========================================================================
        Sticky Header Animation
=========================================================================*/
var animatedHeader = (function() {
  "use strict";

  var docElem = document.documentElement,
    header = document.querySelector( ".navbar-default" ),
    didScroll = false,
    changeHeaderOn = 100;

  function init() {
    window.addEventListener( 'scroll', function( event ) {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( scrollPage, 250 );
      }
    }, false );
  }

  function scrollPage() {
    var sy = scrollY();
    if ( sy >= changeHeaderOn ) {
      classie.add( header, 'shrink' );
    }
    else {
      classie.remove( header, 'shrink' );
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

})();



//------------------------------------------------------------------------
//          SUBSCRIBE FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------
jQuery('#subscribe_form').validate({
    onfocusout: false,
    onkeyup: false,
    rules: {
        email: {
            required: true,
            email: true
        }
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.closest("form"));
    },
    messages: {
        email: {
            required: "We need your email address to contact you",
            email: "Please, enter a valid email"
        }
    },

    highlight: function(element) {
        jQuery(element)
    },

    success: function(element) {
        element
        .text('').addClass('valid')
    }
});

//------------------------------------------------------------------------------------
//            SUBSCRIBE FORM MAILCHIMP INTEGRATIONS SCRIPT
//------------------------------------------------------------------------------------
jQuery('#subscribe_form').submit(function() {
    jQuery('.error').hide();
    jQuery('.error').fadeIn();
    // submit the form
    if(jQuery(this).valid()){
        jQuery('#subscribe_submit').button('loading');
        var action = jQuery(this).attr('action');
        jQuery.ajax({
            url: action,
            type: 'POST',
            data: {
                newsletter_email: jQuery('#subscribe_name').val(),
                newsletter_email: jQuery('#subscribe_email').val()
            },
            success: function(data) {
                jQuery('#subscribe_submit').button('reset');

      //Use modal popups to display messages
      jQuery('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>' + data);
      jQuery('#modalMessage').modal('show');

            },
            error: function() {
                jQuery('#subscribe_submit').button('reset');

      //Use modal popups to display messages
      jQuery('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Oops!<br>Something went wrong!');
      jQuery('#modalMessage').modal('show');

            }
        });
    }
    return false;
});

//------------------------------------------------------------------------------------
//            CONTACT FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------------------
jQuery('#contact_form').validate({
    onfocusout: false,
    onkeyup: false,
    rules: {
        name: "required",
        message: "required",
        email: {
            required: true,
            email: true
        }
    },
    errorPlacement: function(error, element) {
        error.insertAfter(element);
    },
    messages: {
        name: "What's your name?",
        message: "Type your message",
        email: {
            required: "What's your email?",
            email: "Please, enter a valid email"
        }
    },

    highlight: function(element) {
        jQuery(element)
        .text('').addClass('error')
    },

    success: function(element) {
        element
        .text('').addClass('valid')
    }
});

//------------------------------------------------------------------------------------
//                CONTACT FORM SCRIPT
//------------------------------------------------------------------------------------

jQuery('#contact_form').submit(function() {
    // submit the form
    if(jQuery(this).valid()){
        jQuery('#contact_submit').button('loading');
        var action = jQuery(this).attr('action');
        jQuery.ajax({
            url: action,
            type: 'POST',
            data: {
                contactname: jQuery('#contact_name').val(),
                contactemail: jQuery('#contact_email').val(),
                contactsubject: jQuery('#contact_subject').val(),
                contactmessage: jQuery('#contact_message').val()
            },
            success: function() {
                jQuery('#contact_submit').button('reset');
      jQuery('#modalContact').modal('hide');

      //Use modal popups to display messages
      jQuery('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Well done!<br>Your message has been successfully sent!');
      jQuery('#modalMessage').modal('show');
            },
            error: function() {
                jQuery('#contact_submit').button('reset');
      jQuery('#modalContact').modal('hide');

      //Use modal popups to display messages
      jQuery('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Oops!<br>Something went wrong!');
      jQuery('#modalMessage').modal('show');
            }
        });
    } else {
        jQuery('#contact_submit').button('reset')
    }
    return false;
});
