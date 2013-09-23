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
        width: '980px',
        height: '90%',
        margin: '0 auto'
      }
    };
    $.immoral(options);
    $('#modal_demo_page').immoral();
  });
});
</script>
```

## Documentation

### Setting options

Options can be set using the `$.immoral` method.

The following options are available at the moment.
```js
content: '',
modalShadowDiv: '<div id="modal_shadow" style="display:none;"></div>',
modalWrapper: '<div class="modal-wrapper" />',
modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
modalShadow: false,
modalStyle: {
  width: '50%',
  height: '50%',
  margin: '0 auto'
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
    width: '980px',
    height: '90%',
    margin: '0 auto'
  }
};
$.immoral(options);
```

## Release History
_(Nothing yet)_