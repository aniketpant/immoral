/*! Immoral - v0.1.0 - 2013-09-27
* https://github.com/aniketpant/immoral
* Copyright (c) 2013 Aniket Pant; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.immoral = function(options) {
    var globals = {
      content: '',
      modalClass: 'modal',
      modalShadowClass: 'modal-shadow',
      modalWrapper: '<div class="modal-wrapper" />',
      modalWrapperClass: 'modal-wrapper',
      modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
      modalContentClass: 'modal-content',
      modalShadow: false,
      modalStyle: {
        'width': '50%',
        'height': '50%',
        'margin': '0 auto',
        'background': 'white',
        'text-align': 'left',
      },
      modalShadowStyle: {
        'position': 'fixed',
        'z-index': '10000000',
        'background': 'rgba(0,0,0,0.5)',
        'width': '100%',
        'height': '100%',
        'left': '0px',
        'top': '0px',
      },
      modalWrapperStyle: {
        'width': '100%',
        'margin': '0px',
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'height': '100%',
        'display': 'none',
        'z-index': 10000001,
        'background': 'transparent',
        'text-align': 'center',
      },
      modalContentStyle: {
        'width': '100%',
        'height': '100%',
      }
    };

    $.immoral.settings = $.extend(true, {}, globals, options);

    return this.each(function() {
      // Do something immoral to each selected element.
      init(this);

      // Initialize Modal Shadow
      modalShadowInit();

      // Apply styles
      applyStyles(this);

      $('body').on('click', 'a[rel="modal"]', function(e) {
        e.preventDefault();
        var element = $(this).attr('href');

        // Open
        openModal(element);
      });
      $('.' + $.immoral.settings.modalClass).on('click', 'a[rel="modal:close"]', function(e) {
        e.preventDefault();
        var element = $(this).attr('id');

        // Close
        closeModal(element);
      });
    });
  };

  // Initialize modal shadow
  function modalShadowInit() {
    // Get Options
    var options = $.immoral.settings;

    var modalShadow = options.modalShadow;

    if(!modalShadow) {
      $('body').append('<div class="' + options.modalShadowClass + '" style="display: none;"></div>');
      $.immoral(
        {
          'modalShadow': $('.' + options.modalShadowClass)
        }
      );
    }
  }

  function init(element) {
    // Get Options
    var options = $.immoral.settings;

    var modalObj = $(element);
    var modalObjName = modalObj.attr('id');

    if (modalObj.parent('.' + options.modalWrapperClass).attr('class') !== options.modalWrapperClass) {
      modalObj.wrap(options.modalWrapper);

      $('#' + modalObjName + ' .' + options.modalContentClass).append(options.content);

      // Add close Button
      $(options.modalCloseButton).attr('id', modalObjName + '_close');
      modalObj.prepend(options.modalCloseButton);
    }

    var modalWhole = modalObj.parent('.' + options.modalWrapperClass);

    // Hide the whole thing.
    modalWhole.hide().attr('id', modalObjName + '-wrapper');
  }

  // Private function for opening modal
  function openModal(element) {
    // Get Options
    var options = $.immoral.settings;

    var modalWhole = $(element).parent('.' + options.modalWrapperClass);
    var modalShadow = options.modalShadow;

    modalShadow.fadeIn();
    modalWhole.fadeIn();
  }

  // Private function for closing modal
  function closeModal(element) {
    // Get Options
    var options = $.immoral.settings;

    if (element) {
      var modalWhole = $(element).parent('.' + options.modalWrapperClass);
      modalWhole.fadeOut();
    } else {
      $('.' + options.modalClass).parent().fadeOut();
    }

    var modalShadow = options.modalShadow;
    modalShadow.fadeOut();
  }

  // Private function to apply default styles
  function applyStyles(element) {
    // Get Options
    var options = $.immoral.settings;

    // Applying modal shadow styles
    $('.' + options.modalShadowClass).css(options.modalShadowStyle);

    // Applying modal wrapper styles
    $('.' + options.modalWrapperClass).css(options.modalWrapperStyle);

    // applying modal content styles
    $('.' + options.modalContentClass).css(options.modalContentStyle);

    // applying modal styles
    $(element).css(options.modalStyle).show();
  }

  // Method for opening a modal
  $.fn.open = function() {
    openModal(this);
  };

  // Method for closing a modal
  $.fn.close = function() {
    closeModal(this);
  };

  // Static method.
  $.immoral = function(options) {
    // Override default options with passed-in options.
    $.immoral.settings = $.extend(true, {}, $.immoral.settings, options);
    // Return something immoral.
    return 'immoralized';
  };

}(jQuery));