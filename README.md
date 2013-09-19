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
  $('a[rel=modal]').click(function(e) {
    e.preventDefault();
    $('#modal_demo_page .modal--content').append('<iframe src="//localhost/" seamless></iframe>');
    var options = {
      modalStyle: {
        width: '980px',
        height: '90%',
        margin: '0 auto'
      }
    }
    $.immoral(options);
    $(this).immoral();
  });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_