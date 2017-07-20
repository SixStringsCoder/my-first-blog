/*
 Created on June 16th by Steve Hanlon.  JS file for collection app.
*/


/*---------------------------
 MODAL WINDOW - DETAIL VIEW
-----------------------------*/

// Show the Modal window
$('.myBtn').on('click', function() {
    let this_pic = $(this).attr("data-collectible");
    $('#galleryModal_' + this_pic).fadeIn('slow');
});


// Hide the modal window
$('.close').on('click', function() {
    $('.modal').fadeOut('fast');
});


// Show EDIT-ADD-VIEW BUTTON AREA in Collectible, Modal and Embed
$('.edit_show').on('click', function() {
   $('.collectible_option_btns').slideDown('slow');
       $('.edit_show').fadeOut(1);
       $('.edit_hide').fadeIn(1000).show('slow');
});


// Hides EDIT-ADD-VIEW BUTTON AREA in Collectible, Modal and Embed
$('.edit_hide').on('click', function(){
    $('.collectible_option_btns').slideUp('slow');
        $('.edit_hide').fadeOut(1);
        $('.edit_show').fadeIn(1000).show('slow');
});


/*----------------------------
         EMBED CODE
-----------------------------*/

// Show the Embed Code input text field
$('.embed_code_btn').click(function() {
    console.log('Embed code button clicked!');
   $('.embed_code_field').toggle('slow');
});


/*----------------------------
   Add Collection Category +
-----------------------------*/

$('.add_symbol').on('click', function() {
    new_category = prompt('What\'s the name of your new category?');
    let category_name = $("<option>").text(new_category);
    $('select[name=categories]').append(category_name);
});


/*----------------------------
   DRAG AND DROP - Sortable
-----------------------------*/


/*----------------------------
   BOOTSTRAP CONTACT FORM
-----------------------------*/
$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
    });

