/*! Immoral - v0.2.0 - 2013-10-28
* https://github.com/aniketpant/immoral
* Copyright (c) 2013 Aniket Pant; Licensed MIT */
(function() {
  var $;

  $ = jQuery;

  if (!$) {
    return false;
  }

  $(function() {
    var applyStyles, closeModal, emptyModal, eventHandler, modalContainerInit, modalInit, modalShadowInit, openModal;
    $.fn.immoral = function(options) {
      var globals;
      globals = {
        content: '',
        modalClass: 'modal',
        modalShadowClass: 'modal-shadow',
        modalContainerClass: 'modal-container',
        modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
        modalContentClass: 'modal-content',
        modalShadow: false,
        modalContainer: false,
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
        modalContainerStyle: {
          'width': '100%',
          'margin': '0px',
          'position': 'fixed',
          'top': '0px',
          'left': '0px',
          'height': '100%',
          'display': 'none',
          'z-index': '10000001',
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
        modalShadowInit();
        modalContainerInit();
        return eventHandler(this);
      });
    };
    eventHandler = function(element) {
      $(element).on('click', function(e) {
        e.preventDefault();
        return openModal(element);
      });
      $($.immoral.settings.modalContainer).on('click', 'a[rel="modal:close"]', function(e) {
        e.preventDefault();
        return closeModal(element);
      });
      return true;
    };
    modalShadowInit = function() {
      var options;
      options = $.immoral.settings;
      if (!$('.' + options.modalShadowClass).length) {
        $('body').append('<div class="' + options.modalShadowClass + '" style="display: none"></div>');
      }
      return $.immoral({
        'modalShadow': $('.' + options.modalShadowClass)
      });
    };
    modalContainerInit = function() {
      var options;
      options = $.immoral.settings;
      if (!$('.' + options.modalContainerClass).length) {
        $('body').append('<div id="immoral-modal" class="' + options.modalContainerClass + '" style="display: none"><div class="modal"><div class="' + options.modalContentClass + '"></div></div></div>');
      }
      return $.immoral({
        'modalContainer': $('#immoral-modal')
      });
    };
    modalInit = function(element) {
      var content, link, modalContainer, modalContent, options;
      options = $.immoral.settings;
      modalContainer = $(options.modalContainer);
      modalContent = $(modalContainer).find('.' + options.modalContentClass);
      link = $(element).attr('href');
      if (options.content === void 0) {
        if (link === '#') {
          content = options.content;
        } else if (/https*:\/\//.test(link)) {
          content = '<iframe src="' + link + '" seamless></iframe>';
        } else if (/#+/.test(link)) {
          content = $(link).html();
        }
      } else {
        content = options.content;
      }
      $(modalContent).html(content);
      $(modalContent).prepend(options.modalCloseButton);
      return applyStyles();
    };
    openModal = function(element) {
      var modalContainer, modalShadow, options;
      options = $.immoral.settings;
      modalShadow = $(options.modalShadow);
      modalContainer = $(options.modalContainer);
      modalInit(element);
      $(modalShadow).fadeIn();
      return $(modalContainer).fadeIn();
    };
    closeModal = function() {
      var modalContainer, modalShadow, options;
      options = $.immoral.settings;
      modalShadow = $(options.modalShadow);
      modalContainer = $(options.modalContainer);
      $(modalShadow).fadeOut();
      $(modalContainer).fadeOut();
      return emptyModal();
    };
    emptyModal = function() {
      var options;
      options = $.immoral.settings;
      return $(options.modalContainer).find('.' + options.modalContentClass).empty();
    };
    applyStyles = function() {
      var options;
      options = $.immoral.settings;
      $(options.modalShadow).css(options.modalShadowStyle);
      $(options.modalContainer).css(options.modalContainerStyle);
      $(options.modalContainer).find('.modal-content').css(options.modalContentStyle);
      return $(options.modalContainer).find('.modal').css(options.modalStyle);
    };
    $.fn.open = function() {
      return openModal(this);
    };
    $.fn.close = function() {
      return closeModal();
    };
    return $.immoral = function(options) {
      $.immoral.settings = $.extend(true, {}, $.immoral.settings, options);
      return 'immoralized';
    };
  });

}).call(this);
