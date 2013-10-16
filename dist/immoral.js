/*! Immoral - v0.1.1 - 2013-10-16
* https://github.com/aniketpant/immoral
* Copyright (c) 2013 Aniket Pant; Licensed MIT */
(function() {
  var $;

  $ = jQuery;

  $(function() {
    var applyStyles, closeModal, init, modalShadowInit, openModal;
    $.fn.immoral = function(options) {
      var globals;
      globals = {
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
          'text-align': 'left'
        },
        modalShadowStyle: {
          'position': 'fixed',
          'z-index': '10000000',
          'background': 'rgba(0,0,0,0.5)',
          'width': '100%',
          'height': '100%',
          'left': '0px',
          'top': '0px'
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
          'text-align': 'center'
        },
        modalContentStyle: {
          'width': '100%',
          'height': '100%'
        }
      };
      $.immoral.settings = $.extend(true, {}, globals, options);
      return this.each(function() {
        init(this);
        modalShadowInit();
        applyStyles(this);
        $('body').on('click', 'a[rel="modal"]', function(e) {
          var element;
          e.preventDefault();
          element = $(this).attr('href');
          return openModal(element);
        });
        return $('.' + $.immoral.settings.modalClass).on('click', 'a[rel="modal:close"]', function(e) {
          var element;
          e.preventDefault();
          element = $(this).attr('id');
          return closeModal(element);
        });
      });
    };
    modalShadowInit = function() {
      var modalShadow, options;
      options = $.immoral.settings;
      modalShadow = options.modalShadow;
      if (!modalShadow) {
        $('body').append('<div class="' + options.modalShadowClass + '" style="display: none"></div>');
        return $.immoral({
          'modalShadow': $('.' + options.modalShadowClass)
        });
      }
    };
    init = function(element) {
      var modalObj, modalObjName, modalWhole, options;
      options = $.immoral.settings;
      modalObj = $(element);
      modalObjName = modalObj.attr('id');
      if (modalObj.parent('.' + options.modalWrapperClass).attr('class') !== options.modalWrapperClass) {
        modalObj.wrap(options.modalWrapper);
        $('#' + modalObjName + ' .' + options.modalContentClass).append(options.content);
        $(options.modalCloseButton).attr('id', modalObjName + '_close');
        modalObj.prepend(options.modalCloseButton);
      }
      modalWhole = modalObj.parent('.' + options.modalWrapperClass);
      return modalWhole.hide().attr('id', modalObjName + '-wrapper');
    };
    openModal = function(element) {
      var modalShadow, modalWhole, options;
      options = $.immoral.settings;
      modalWhole = $(element).parent('.' + options.modalWrapperClass);
      modalShadow = options.modalShadow;
      modalShadow.fadeIn();
      return modalWhole.fadeIn();
    };
    closeModal = function(element) {
      var modalShadow, modalWhole, options;
      options = $.immoral.settings;
      if (element) {
        modalWhole = $(element).parent('.' + options.modalWrapperClass);
        modalWhole.fadeOut();
      } else {
        $('.' + options.modalClass).parent().fadeOut();
      }
      modalShadow = options.modalShadow;
      return modalShadow.fadeOut();
    };
    applyStyles = function(element) {
      var options;
      options = $.immoral.settings;
      $('.' + options.modalShadowClass).css(options.modalShadowStyle);
      $('.' + options.modalWrapperClass).css(options.modalWrapperStyle);
      $('.' + options.modalContentClass).css(options.modalContentStyle);
      return $(element).css(options.modalStyle).show();
    };
    $.fn.open = function() {
      return openModal(this);
    };
    $.fn.close = function() {
      return closeModal(this);
    };
    return $.immoral = function(options) {
      $.immoral.settings = $.extend(true, {}, $.immoral.settings, options);
      return 'immoralized';
    };
  });

}).call(this);
