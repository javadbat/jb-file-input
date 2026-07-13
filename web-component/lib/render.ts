import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";
import uploadIcon from './icons/upload.svg';
import uploadedIcon from './icons/uploaded.svg';
import 'jb-loading';
import 'jb-button';

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-file-input-web-component">
    <section class="placeholder-section" role="button" aria-label="${dictionary.get(i18n, "chooseFile")}">
      <slot name="placeholder">
        <div class="placeholder-wrapper section-wrapper">
          <div class="icon-wrapper" aria-hidden="true"><slot name="placeholder-icon">${uploadIcon}</slot></div>
          <div class="placeholder-title title" part="placeholder-title">${dictionary.get(i18n, "chooseFile")}</div>
        </div>
      </slot>
    </section>
    <section class="upload-section" role="status" aria-live="polite" aria-label="${dictionary.get(i18n, "uploading")}">
      <slot name="upload">
        <div class="upload-wrapper">
          <div class="upload-bg"></div>
          <div class="loading-content section-wrapper">
            <div class="icon-wrapper"><slot name="uploader-icon"><jb-loading class="loading-icon" part="loading upload-loading"/></slot></div>
            <div class="uploading-title title" part="uploading-title">${dictionary.get(i18n, "uploading")}</div>
          </div>
        </div>
      </slot>
    </section>
    <section class="file-section" role="group" aria-label="${dictionary.get(i18n, "selectedFile")}">
      ${renderOverlay()}
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

function renderOverlay() {
  return /* html */`
    <slot name= "overlay">
      <div class="file-overlay">
        <slot name="overlay-content">
          <div class="reselect-button" role="button">${dictionary.get(i18n, "reselectFile")}</div>
          <jb-button class="download-button" color="light" variant="ghost" aria-label="${dictionary.get(i18n, "downloadFile")}">
            <svg id="DownloadIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path id="S1" d="M15.0382 12.5084L12.1222 15.4364L9.20621 12.5084"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path id="S3" d="M12.1222 15.4361L12.1222 3.39508" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path id="S2" d="M16.7549 8.12799H17.6879C19.7229 8.12799 21.3719 9.77699 21.3719 11.813V16.697C21.3719 18.727 19.7269 20.372 17.6969 20.372L6.55695 20.372C4.52195 20.372 2.87195 18.722 2.87195 16.687V11.802C2.87195 9.77299 4.51795 8.12799 6.54695 8.12799L7.48895 8.12799" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </jb-button>
          <jb-button class="delete-button" color="danger" variant="ghost" size="md" aria-label="${dictionary.get(i18n, "deleteFile")}">
            <svg id="DeleteIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path id="BinBody" d="M19.325 9.4682C19.325 9.4682 18.782 16.2032 18.467 19.0402C18.317 20.3952 17.48 21.1892 16.109 21.2142C13.5 21.2612 10.888 21.2642 8.28003 21.2092C6.96103 21.1822 6.13803 20.3782 5.99103 19.0472C5.67403 16.1852 5.13403 9.4682 5.13403 9.4682" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="BinLine" d="M20.7082 6.23969H3.75024" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="BinHead" d="M17.4406 6.23967C16.6556 6.23967 15.9796 5.68467 15.8256 4.91567L15.5826 3.69967C15.4326 3.13867 14.9246 2.75067 14.3456 2.75067H10.1126C9.53358 2.75067 9.02558 3.13867 8.87558 3.69967L8.63258 4.91567C8.47858 5.68467 7.80258 6.23967 7.01758 6.23967" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </jb-button>
        </slot>
      </div>
    </slot>
    `
}
