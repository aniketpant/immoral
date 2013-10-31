/*! Immoral - v0.2.1 - 2013-10-31
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
      return this.each(function() {
        this.settings = $.extend(true, {}, globals, options);
        modalShadowInit(this);
        modalContainerInit(this);
        return eventHandler(this);
      });
    };
    eventHandler = function(element) {
      $(element).on('click', function(e) {
        e.preventDefault();
        return openModal(element);
      });
      $(element.settings.modalContainer).on('click', 'a[rel="modal:close"]', function(e) {
        e.preventDefault();
        return closeModal(element);
      });
      $(document).keydown(element, function(e) {
        if (e.keyCode === 27) {
          return closeModal(element);
        }
      });
      return true;
    };
    modalShadowInit = function(element) {
      var options;
      options = element.settings;
      if (!$('.' + options.modalShadowClass).length) {
        $('body').append('<div class="' + options.modalShadowClass + '" style="display: none"></div>');
      }
      return $.immoral(element, {
        'modalShadow': $('.' + options.modalShadowClass)
      });
    };
    modalContainerInit = function(element) {
      var options;
      options = element.settings;
      if (!$('.' + options.modalContainerClass).length) {
        $('body').append('<div id="immoral-modal" class="' + options.modalContainerClass + '" style="display: none"><div class="modal"><div class="' + options.modalContentClass + '"></div></div></div>');
      }
      return $.immoral(element, {
        'modalContainer': $('#immoral-modal')
      });
    };
    modalInit = function(element) {
      var content, link, modalContainer, modalContent, options;
      options = element.settings;
      modalContainer = $(options.modalContainer);
      modalContent = $(modalContainer).find('.' + options.modalContentClass);
      link = $(element).attr('href');
      if (options.content) {
        content = options.content;
      } else {
        if (/https*:\/\//.test(link)) {
          content = '<iframe src="' + link + '" seamless></iframe>';
        } else if (/#+/.test(link)) {
          content = $(link).html();
        }
      }
      $(modalContent).html(content);
      $(modalContent).prepend(options.modalCloseButton);
      return applyStyles(element);
    };
    openModal = function(element) {
      var modalContainer, modalShadow, options;
      options = element.settings;
      modalShadow = $(options.modalShadow);
      modalContainer = $(options.modalContainer);
      modalInit(element);
      $(modalShadow).fadeIn();
      return $(modalContainer).fadeIn();
    };
    closeModal = function(element) {
      var modalContainer, modalShadow, options;
      options = element.settings;
      modalShadow = $(options.modalShadow);
      modalContainer = $(options.modalContainer);
      $(modalShadow).fadeOut();
      $(modalContainer).fadeOut();
      return emptyModal(element);
    };
    emptyModal = function(element) {
      var options;
      options = element.settings;
      return $(options.modalContainer).find('.' + options.modalContentClass).empty();
    };
    applyStyles = function(element) {
      var options;
      options = element.settings;
      $(options.modalShadow).css(options.modalShadowStyle);
      $(options.modalContainer).css(options.modalContainerStyle);
      $(options.modalContainer).find('.modal-content').css(options.modalContentStyle);
      return $(options.modalContainer).find('.modal').css(options.modalStyle);
    };
    $.fn.open = function() {
      return openModal(this);
    };
    $.fn.close = function() {
      return closeModal(this);
    };
    return $.immoral = function(element, options) {
      element.settings = $.extend(true, {}, element.settings, options);
      return 'immoralized';
    };
  });

}).call(this);
