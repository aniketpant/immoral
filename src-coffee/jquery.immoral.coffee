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
      modalContainerClass: 'immoral-modal-container',
      modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
      modalContentClass: 'immoral-modal-content',
      modalContainer: false,
      modalStyle: {
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'width': '50%',
        'height': '50%',
        'transform': 'translate(-50%, -50%)',
        'background': 'white',
        'text-align': 'left',
      },
      modalContainerStyle: {
        'width': '100%',
        'margin': '0px',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'height': '100%',
        'display': 'none',
        'z-index': '10000001',
        'background': 'rgba(0,0,0,.8)',
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

    $modalContainer = $(options.modalContainer)

    modalInit(element) # Initialize modal

    $modalContainer.fadeIn()

  # Private function for closing modal
  closeModal = (element) ->
    options = element.settings # Get options

    $modalContainer = $(options.modalContainer)

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

    $modalContainer = options.modalContainer

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