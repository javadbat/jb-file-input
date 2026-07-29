# Changelog

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
