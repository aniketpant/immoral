###
 * immoral
 * https://github.com/aniketpant/immoral
 *
 * Copyright (c) 2013 Aniket Pant
 * Licensed under the MIT license.
###

;do ($ = jQuery) ->
  $.fn.immoral = (options) ->
    # Global Settings
    globals = {
      content: '',
      modalClass: 'immoral-modal',
      modalShadowClass: 'immoral-modal-shadow',
      modalContainerClass: 'immoral-modal-container',
      modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
      modalContentClass: 'immoral-modal-content',
      modalShadow: false,
      modalContainer: false,
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
        'text-align': 'center',
        'overflow-y': 'auto',
        '-webkit-overflow-scrolling': 'touch',
      },
      modalContentStyle: {
        'width': '100%',
        'height': '100%',
      }
    }

    return this.each ->
      this.settings = $.extend true, {}, globals, options # Set each element

      modalShadowInit(this) # Initialize modal shadow
      modalContainerInit(this) # Initialize modal container
      eventHandler(this) # Handle the events

  # Handles the click events
  eventHandler = (element) ->
    $(element).bind 'click', (e) ->
      e.preventDefault()
      openModal(element) # Open modal
    $(element.settings.modalContainer).delegate 'a[rel="modal:close"]', 'click', (e) ->
      e.preventDefault()
      closeModal(element) # Close modal
    $(document).keydown element, (e) ->
        if e.keyCode is 27
          closeModal(element);
    return true

  # Initialize modal shadow
  modalShadowInit = (element) ->
    options = element.settings # Get options

    if !$('.' + options.modalShadowClass).length
      $('body').append('<div class="' + options.modalShadowClass + '" style="display: none"></div>')
    $.immoral(element,
      {
        'modalShadow': $('.' + options.modalShadowClass)
      }
    )

  # Initialize modal container
  modalContainerInit = (element) ->
    options = element.settings # Get options

    if !$('.' + options.modalContainerClass).length
      $('body').append('<div class="' + options.modalContainerClass + '" style="display: none"><div class="' + options.modalClass + '"><div class="' + options.modalContentClass + '"></div></div></div>')
    $.immoral(element,
      {
        'modalContainer': $('.' + options.modalContainerClass)
      }
    )

  modalInit = (element) ->
    options = element.settings # Get options

    $modalContainer = $(options.modalContainer)
    $modalContent = $modalContainer.find('.' + options.modalContentClass)

    link = $(element).attr('href')

    if options.content
      content = options.content
    else
      if /https*:\/\//.test(link)
        content = '<iframe src="' + link + '" seamless></iframe>' # iframe
      else if /#+/.test(link)
        content = $(link).html() # html on page

    $modalContent.html(content) # Put content inside
    $modalContent.prepend(options.modalCloseButton) # Attach close button

    applyStyles(element) # Apply styles

  # Private function for opening modal
  openModal = (element) ->
    options = element.settings # Get options

    $modalShadow = $(options.modalShadow)
    $modalContainer = $(options.modalContainer)

    modalInit(element) # Initialize modal

    $modalShadow.fadeIn()
    $modalContainer.fadeIn()

  # Private function for closing modal
  closeModal = (element) ->
    options = element.settings # Get options

    $modalShadow = $(options.modalShadow)
    $modalContainer = $(options.modalContainer)

    $modalShadow.fadeOut()
    $modalContainer.fadeOut()

    emptyModal(element) # time to clear the modal

  # Empty the modal
  emptyModal = (element) ->
    options = element.settings # Get options

    $modalContainer = options.modalContainer

    $modalContainer.find('.' + options.modalContentClass).empty()

  # Private function to apply default styles
  applyStyles = (element) ->
    options = element.settings # Get options

    $modalShadow = options.modalShadow
    $modalContainer = options.modalContainer

    $modalShadow.css(options.modalShadowStyle)
    $modalContainer.css(options.modalContainerStyle)
    $modalContainer.find('.' + options.modalContentClass).css(options.modalContentStyle)
    $modalContainer.find('.' + options.modalClass).css(options.modalStyle)

  # Method for opening a modal
  $.fn.open = ->
    openModal(this)

  # Method for closing a modal
  $.fn.close = ->
    closeModal(this)

  # Static method for updating settings
  $.immoral = (element, options) ->
    element.settings = $.extend(true, {}, element.settings, options) # Override default options with passed-in options.
    return 'immoralized' # Return something immoral