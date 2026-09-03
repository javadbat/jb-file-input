# Changelog

## [4.0.0] - 2026-09-03

### Changed

- Breaking: renamed the `uploading` property/React prop and HTML attribute to `isUploading` and `is-uploading`; added the read-only aggregate `isLoading` property.
- Standardized private empty-value and form synchronization helpers as `#clearValue()` and `#updateFormValue()`.
- Breaking: renamed the `acceptTypes` web-component property and React prop to the native-compatible `accept`; the existing `accept` HTML attribute is unchanged.
- Breaking: replaced `resetValue()` with the standard `reset()` method. `reset()` restores `initialValue`; assign `value = null` to clear the live selection.
- Native form reset now delegates to the same public `reset()` behavior.

## [3.4.0] - 2026-09-01

### Added

- Added the nullable `maxSize` web-component property and React prop for built-in file-size validation in KB.
- Added `message` helper text and externally controlled `error` validation to the web component and React wrapper.
- Added a transient selected-file `.error-overlay`, matching `jb-image-input`, for validation failures such as oversized files.

### Changed

- Renamed the `placeholder-title` attribute and React `placeholderTitle` prop to `label`.
- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.35.0`.
- Updated component color defaults to use the shared semantic content and surface tokens.

### Fixed

- Wait for the `jb-file-input` custom element definition before applying the initial React `maxSize` prop.
- Show and retain the built-in max-size error for oversized files supplied through the web-component value property or React controlled value, without a stale asynchronous validation clearing it.
- Added empty-state display fallbacks so the placeholder, upload, and selected-file sections are not rendered together when custom element states are unavailable.

## [3.3.0] 2026-07-29

### Added

- add `implements JBFormInputStandards<File | null>` to make sure it compatible with jb-form standards.

## [3.2.0] 2026-07-28

### Added

- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.
- Added disabled-state support for file selection and mutation actions, including form-disabled callbacks and accessibility/custom state.

### Changed

- Added `initialValue` as the default and reset file; it seeds `value` only until the live value is explicitly set.
- Updated the React wrapper so an omitted `value` does not overwrite `initialValue`, while explicit `null` still clears the selected file.
- Disabled file inputs no longer apply background hover or pressed effects; selected files reveal a download-only overlay.

### Fixed

- A redundant public `resetValue()` call no longer blocks a later `initialValue` from initializing an already-empty file input.

## [3.1.0] 2026-07-18

### Added

- Added a Storybook styling guide with reusable style recipes for Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design examples.
- Documented the existing default icon parts `placeholder-icon` and `file-icon` in the custom elements manifest.
- Added display-state variables to the custom elements manifest so tooling can discover the full public styling API.

### Changed

- File selection and reselection actions now use native buttons with keyboard focus styles, and the selected-file overlay is revealed by keyboard focus as well as hover.
- Moved loading, overlay, and responsive overlay button defaults into `variables.css`.
- Added public file input CSS variables for loading color, overlay background, reselect button color, and overlay button sizing.
- Added public display-state variables for placeholder, file, upload, and download button sections.
- Standardized all custom theme recipes on `jb-file-input.<theme>-style` selectors without redundant component hook classes.
- Aligned Aurora file-input elevation with the adjacent image-input recipe.

### Fixed

- Corrected the upload spinner's internal color mapping to use `--jb-file-input-loading-color` without colliding with the component loading state.
