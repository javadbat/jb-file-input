import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";
import uploadIcon from './icons/upload.svg';
import uploadedIcon from './icons/uploaded.svg';
export function renderHTML(): string {
    return /* html */ `
  <div class="jb-file-input-web-component">
    <slot name="placeholder">
        <div class="placeholder-wrapper">
            <div class="icon-wrapper">
                <slot name="placeholder-icon">${uploadIcon}</slot>
            </div>
            <div class="placeholder-title" part="placeholder-title">${dictionary.get(i18n, "chooseFile")}</div>
        </div>
    </slot>
    
    <div class="file-wrapper">
        <div class="icon-wrapper">
            <slot name="file-icon">
                ${uploadedIcon}
            </slot>
        </div>
        <div class="file-name" part="file-name"></div>
    </div>
  </div>
      `;
}

