# jb-file-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-file-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-file-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-file-input-react)](https://www.npmjs.com/package/jb-file-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-file-input)

file upload web-component

this component is a simple react component that use [jb-file-input](https://github.com/javadbat/jb-file-input) inside and its just a simple wrapper for it so i suggest you to read jb-file-input document too, it has more complete & updated document.

## Demo
in codeSandBox: [codeSandbox preview](https://3f63dj.csb.app/samples/jb-file-input) for just see the demo and [codeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBFileInput.tsx) if you want to see and play with code

Storybook: [JBFileInput docs](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-jbfileinput)

## Usage
just import the component and write jsx like this:

```jsx
import {JBFileInput} from 'jb-file-input/react';

<JBFileInput ></JBFileInput>
```

## When to use

Use `JBFileInput` when the user needs to choose one local file and your application will handle upload, download, storage, or preview behavior outside the component.

## Props

| prop | type | description |
| --- | --- | --- |
| `name` | `string` | Form field name. |
| `value` | `File` | Selected file value. |
| `acceptTypes` | `string` | Native accept string used by the internal file input. |
| `placeholderTitle` | `string` | Text shown in the default placeholder area. |
| `required` | `boolean` | Enables required validation. |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validation rules from `jb-validation`. |
| `uploading` | `boolean` | Shows the upload progress section. Upload is still handled by your app. |
| `uploadPercent` | `number` | Visual upload progress percentage. |
| `hideDownload` | `boolean` | Hides the default download button. |

## Events

| prop | event |
| --- | --- |
| `onChange` | `change` |

The web component also dispatches `download` and `delete` events. Use a ref and `addEventListener` if you need those from React.

## Value

`event.target.value` and `ref.current.value` are the selected `File` or `null`. Set the underlying value to `null` or call `ref.current.resetValue()` when you need to clear the selection imperatively.

```jsx
const fileInputRef = useRef(null);

<JBFileInput
  ref={fileInputRef}
  onChange={(event) => console.log(event.target.value)}
/>;

fileInputRef.current?.resetValue();
```

## Validation

Use `required` when the user must select a file. Use `validationList` for custom file checks such as size or MIME type.

```jsx
const validationList = [
  {
    validator: ({ file }) => !file || file.size < 1024 * 1024,
    message: 'File must be smaller than 1MB',
  },
];

<JBFileInput required validationList={validationList} />;
```

## Loading State

`JBFileInput` does not upload files by itself. Use `uploading` and `uploadPercent` to display progress from an upload flow owned by your app.

```jsx
<JBFileInput uploading uploadPercent={45} />
```

## Download Button

The default download button has no built-in download logic. Listen for the underlying `download` event with a ref when you use the default overlay button.

```jsx
useEffect(() => {
  const input = fileInputRef.current;
  if (!input) return;

  const onDownload = () => downloadFile(input.value);
  input.addEventListener('download', onDownload);
  return () => input.removeEventListener('download', onDownload);
}, []);
```

Use `hideDownload` to hide the default button.

```jsx
<JBFileInput hideDownload />
```

## Slots

Pass custom slot content as JSX children. Supported slot names include `placeholder`, `placeholder-icon`, `upload`, `uploader-icon`, `file-icon`, `overlay`, and `overlay-content`.

```jsx
<JBFileInput>
  <div slot="placeholder">Drop or select a file</div>
</JBFileInput>
```

## CSS parts and states

The React wrapper uses the same parts, states, attributes, and CSS variables as the web component, including `::part(file-name)`, `:state(empty)`, `:state(fill)`, `[uploading]`, and `[hide-download]`.

```css
.contract-file::part(file-name) {
  font-weight: 600;
}

.contract-file[uploading] {
  --jb-file-input-loading-bg: linear-gradient(90deg, #2563eb, #14b8a6);
}
```

## Shared Documentation

For web-component behavior, events, slots, and CSS variables, see [`jb-file-input`](https://github.com/javadbat/jb-file-input).

## Related Docs
- see [jb-file-input](https://github.com/javadbat/jb-file-input) if you want to use this component as a web-component

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.

## AI agent notes

- Import `JBFileInput` from `jb-file-input/react`; the wrapper imports and registers the underlying `jb-file-input` web component.
- The component only selects a file; upload and download logic must be implemented by the app.
- Use `uploading` and `uploadPercent` to reflect external upload progress.
- Use `placeholderTitle`, `acceptTypes`, and `hideDownload` in React; the wrapper maps them to the underlying web-component API.
- Use a ref for imperative methods such as `openFileSelector()`, `resetValue()`, `checkValidity()`, and `reportValidity()`.
