# Changelog

## Unreleased

### Added

- Added a Storybook styling guide with reusable style recipes for Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design examples.
- Documented the existing default icon parts `placeholder-icon` and `file-icon` in the custom elements manifest.
- Added display-state variables to the custom elements manifest so tooling can discover the full public styling API.

### Changed

- Moved loading, overlay, and responsive overlay button defaults into `variables.css`.
- Added public file input CSS variables for loading color, overlay background, reselect button color, and overlay button sizing.
- Added public display-state variables for placeholder, file, upload, and download button sections.
- Standardized all custom theme recipes on `jb-file-input.<theme>-style` selectors without redundant component hook classes.
- Aligned Aurora file-input elevation with the adjacent image-input recipe.
