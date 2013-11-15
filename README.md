# Immoral

A spunky clean flexible no-forced-design opinionated modal library.

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
   $('#modal-1').immoral({
    modalStyle: {
      'width': '980px',
      'height': '90%',
      'margin': '0 auto',
      'background': 'white',
    }
  });
});
</script>
<p>This will open a <a href="http://somesite.com" rel="modal">modal</a>.</p>
</div>
```

## Usage

Immoral works in three ways on the basis of the the data provided in the `href`:

1. Provide link to some website and it will be loaded as an iframe
2. If it points to a `<div>`, then it will load the HTML content of the `<div>` inside the modal
3. In case, the `content` option is set, it will override other content settings i.e it won't use the link given in `href` or the `id` it is pointing to

Immoral uses a single container, where the content is changed when a click event takes place.

## Note
Immoral forces only two things upon you.

1. The `<a>` needs to have a `rel="modal"` attribute attached to it for the plugin to identify the click event.
2. The modal must comply with the classes you provide as options.

**Word of caution:** If the `content` option is set, then it will override the decision making which is based on `href`.

## Documentation
immoral provides the following methods:
- `open`
- `close`

### Setting Options
Options can be set using the `$(selector).immoral(options)` method.

The following options are available at the moment.

```js
{
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
}
```

### Opening modal

Use `$(selector).immoral().open()` to open a modal.

### Closing modal

Use `$(selector).immoral().close()` to open a modal.

## Example

Below is an example of the three ways of using immoral.

```html
<p>This will open a <a id="modal-1" href="http://localhost/" rel="modal">modal</a>.</p>
<p>This will open another <a id="modal-2" href="#test-modal" rel="modal">modal</a>.</p>
<p>And this will open will be yet another <a id="modal-3" href="#" rel="modal">modal</a>.</p>
<div id="test-modal" style="display: none;">
  <p>Some testing data for a modal.</p>
</div>
<script type="text/javascript">
  $(document).ready(function() {
    $('#modal-1').immoral({
      modalStyle: {
        'width': '980px',
        'height': '90%',
        'margin': '0 auto',
        'background': 'white',
      }
    });
    $('#modal-2').immoral({
      modalStyle: {
        'width': '980px',
        'height': '90%',
        'margin': '0 auto',
        'background': 'white',
      }
    });
    $('#modal-3').immoral({
      content: '<p>Some custom html.</p>',
      modalStyle: {
        'width': '980px',
        'height': '90%',
        'margin': '0 auto',
        'background': 'white',
      }
    });
  });
</script>
```

Manually open a modal.

```js
$(selector).immoral().open();
```

Manually close a modal.

```js
$(selector).immoral().close();
```

## Release History
- v0.2.2 - Nov 15, 2013
- v0.2.1 - Oct 31, 2013
- v0.2.0 - Oct 16, 2013
- v0.1.1 - Sep 27, 2013
- v0.1.0 - Sep 23, 2013