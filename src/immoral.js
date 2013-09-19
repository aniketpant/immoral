/*
 * immoral
 * https://github.com/aniketpant/immoral
 *
 * Copyright (c) 2013 Aniket Pant
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.immoral = function() {
    return this.each(function() {
      // Do something immoral to each selected element.
      init($(this).attr('href'));

      $('.modal').on('click', 'a[rel="modal:close"]', function(e) {
        e.preventDefault();
        var parentModal = '#' + $(this).closest('.modal').attr('id');
        modalClose(parentModal);
      });
    });
  };

  // Static method.
  $.immoral = function(options) {
    // Override default options with passed-in options.
    $.immoral.options = $.extend({}, $.immoral.options, options);
    // Return something immoral.
    return 'immoralized';
  };

  function modalShadowInit() {
    var modalShadow = $.immoral.options.modalShadow;
    if(!modalShadow) {
      $('body').append($.immoral.options.modalShadowDiv);
      $.immoral.options.modalShadow = $('#modal_shadow');
    }
  }

  function init(element) {
    var modalObj = $(element);
    var modalObjName = modalObj.attr('id');
    modalObj.wrap($.immoral.options.modalWrapper);
    var modalWhole = modalObj.parent('.modal-wrapper');

    // Hide the whole thing.
    modalWhole.hide().attr('id', modalObjName + '-wrapper');

    // apply styles
    modalObj.css($.immoral.options.modalStyle).show();

    // Add close Button
    $($.immoral.options.modalCloseButton).attr('id', modalObjName + '_close');
    modalObj.prepend($.immoral.options.modalCloseButton);

    // Initialize Modal Shadow
    modalShadowInit();
    modalOn(element);
  }

  function modalOn(element) {
    var modalWhole = $(element).parent();
    var modalShadow = $.immoral.options.modalShadow;
    modalShadow.fadeIn();
    modalWhole.fadeIn();
  }

  function modalClose(element) {
    if(element) {
      var modalWhole = $(element).parent('.modal-wrapper');
      modalWhole.fadeOut();
    } else {
      $('.modal').parent().fadeOut();
    }
    var modalShadow = $.immoral.options.modalShadow;
    modalShadow.fadeOut();
  }

  // Static method default options.
  $.immoral.options = {
    modalShadowDiv: '<div id="modal_shadow" style="display:none;"></div>',
    modalWrapper: '<div class="modal-wrapper" />',
    modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
    modalShadow: false,
    modalStyle: {
      width: '50%',
      height: '50%',
      margin: '0 auto'
    }
  };

  // Custom element.
  $.expr[':'].immoral = function(elem) {
    // Is this element immoral?
    return $(elem).text().indexOf('immoral') !== -1;
  };

}(jQuery));
