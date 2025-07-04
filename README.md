# jb file input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-file-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-file-input/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dw/jb-file-input)](https://www.npmjs.com/package/jb-file-input)

multi file upload web component
this component just let user select file and wait for you to get the value and handle it yourself and it's not handling any kind of upload or something
sample: <https://codepen.io/javadbat/pen/xxgmWNB>

## using with JS frameworks

to use this component in **react** see [`jb-file-input/react`](https://github.com/javadbat/jb-file-input/tree/main/react);

## usage

just import package with import or from js CDN and write web component tag in your html

```html
<script>
  import 'jb-file-input'
</script>

<jb-file-input></jb-file-input>
```


## placeholder title

you can change file input place holder text by set `placeholder-title="select your special file"` attribute in dom

## reset value

you can reset input file value by `dom.value = null` or `dom.resetValue()`


## Other Related Docs:

- see [`jb-file-input/react`](https://github.com/javadbat/jb-file-input/tree/main/react); if you want to use this component in react

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.