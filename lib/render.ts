import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";
import uploadIcon from './icons/upload.svg';
import uploadedIcon from './icons/uploaded.svg';
import 'jb-loading';

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-file-input-web-component">
    <section class="placeholder-section">
      <slot name="placeholder">
        <div class="placeholder-wrapper section-wrapper">
          <div class="icon-wrapper"><slot name="placeholder-icon">${uploadIcon}</slot></div>
          <div class="placeholder-title title" part="placeholder-title">${dictionary.get(i18n, "chooseFile")}</div>
        </div>
      </slot>
    </section>
    <section class="upload-section">
      <slot name="upload">
        <div class="upload-wrapper">
          <div class="upload-bg"></div>
          <div class="loading-content section-wrapper">
            <div class="icon-wrapper"><slot name="uploader-icon"><jb-loading class="loading-icon"/></slot></div>
            <div class="uploading-title title" part="uploading-title">Uploading</div>
          </div>
        </div>
      </slot>
    </section>
    <section class="file-section">
      <div class="file-wrapper section-wrapper">
        <div class="icon-wrapper">
          <slot name="file-icon">${uploadedIcon}</slot>
        </div>
        <div class="file-name title" part="file-name"></div>
      </div>
    </section>
  </div>
      `;
}

