# Immoral

A spunky clean flexible no-forced-design modal library.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/aniketpant/immoral/master/dist/immoral.min.js
[max]: https://raw.github.com/aniketpant/immoral/master/dist/immoral.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/immoral.min.js"></script>
<script>
$(document).ready(function() {
  $(document).ready(function() {
    var options = {
      content: '<iframe src="//localhost/" seamless></iframe>',
      modalStyle: {
        'width': '980px',
        'height': '90%',
        'margin': '0 auto'
      }
    };
    $.immoral(options);
    $('#modal_demo_page').immoral();
  });
});
</script>

<p>This will open a <a href="#modal_demo_page" rel="modal">modal</a>.</p>
<div id="modal_demo_page" class="modal" style="display: none;">
  <div class="modal-content">
  </div>
</div><!-- #modal_demo_page -->
```

## Usage
If you see the example given before, you need to create a `<a>` where the `href` points to the id of your modal.

Immoral forces only two things upon you.

1. The `<a>` needs to have a `rel="modal"` attribute attached to it for the plugin to identify the click event.
2. The modal must comply with the classes you provide in the plugin options.

General structure of a modal should be this.

```html
<div id="your_modal_id" class="modal">
  <div class="modal-content">
  </div>
</div>
```

`.modal-content` is important because immoral wraps the entire `.modal` with a wrapper.

## Documentation
immoral provides three methods:
- `option`
- `open`
- `close`

### Options
Options can be set using the `$.immoral(options)` method.

The following options are available at the moment.

```js
{
  content: '',
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
}
```

### Opening modal

Use `$(selector).immoral().open()` to open a modal.

### Closing modal

Use `$(selector).immoral().close()` to open a modal.

## Examples

To set your own options for immoral, you can use the following code.

```js
var options = {
  content: '<iframe src="//localhost/" seamless></iframe>',
  modalStyle: {
    'width': '980px',
    'height': '90%',
    'margin': '0 auto'
  }
};
$.immoral(options);
```

Manually open a modal.

```js
$('your-modal-selector').immoral().open();
```

Manually close a modal.

```js
$('your-modal-selector').immoral().close();
```

## Release History
_(Nothing yet)_