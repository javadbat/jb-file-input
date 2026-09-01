import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";
import uploadIcon from './icons/upload.svg';
import uploadedIcon from './icons/uploaded.svg';
import 'jb-loading';
import 'jb-button';

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-file-input-web-component">
    <button class="placeholder-section" type="button" aria-label="${dictionary.get(i18n, "chooseFile")}">
      <slot name="placeholder">
        <span class="placeholder-wrapper section-wrapper">
          <span class="icon-wrapper" aria-hidden="true"><slot name="placeholder-icon">${uploadIcon}</slot></span>
          <span class="placeholder-title title" part="placeholder-title">${dictionary.get(i18n, "chooseFile")}</span>
          <span class="message-box" part="message" role="status" aria-live="polite" aria-atomic="true"></span>
        </span>
      </slot>
    </button>
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
      <button class="file-wrapper section-wrapper" type="button" aria-label="${dictionary.get(i18n, "reselectFile")}">
        <span class="icon-wrapper">
          <slot name="file-icon">${uploadedIcon}</slot>
        </span>
        <span class="file-name title" part="file-name"></span>
      </button>
      ${renderErrorOverlay()}
    </section>
  </div>
      `;
}

function renderErrorOverlay() {
  return /* html */ `
    <div class="error-overlay" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="error-content">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 14.75C11.59 14.75 11.25 14.41 11.25 14V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75Z" />
          <path d="M12 18C11.94 18 11.87 17.99 11.8 17.98C11.74 17.97 11.68 17.95 11.62 17.92C11.56 17.9 11.5 17.87 11.44 17.83C11.39 17.79 11.34 17.75 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.74 11.11 16.48 11.29 16.29C11.34 16.25 11.39 16.21 11.44 16.17C11.5 16.13 11.56 16.1 11.62 16.08C11.68 16.05 11.74 16.03 11.8 16.02C11.93 15.99 12.07 15.99 12.19 16.02C12.26 16.03 12.32 16.05 12.38 16.08C12.44 16.1 12.5 16.13 12.56 16.17C12.61 16.21 12.66 16.25 12.71 16.29C12.89 16.48 13 16.74 13 17C13 17.26 12.89 17.52 12.71 17.71C12.66 17.75 12.61 17.79 12.56 17.83C12.5 17.87 12.44 17.9 12.38 17.92C12.32 17.95 12.26 17.97 12.19 17.98C12.13 17.99 12.06 18 12 18Z" />
          <path d="M18.06 22.16H5.94001C3.99001 22.16 2.50001 21.45 1.74001 20.17C0.990006 18.89 1.09001 17.24 2.04001 15.53L8.10001 4.63C9.10001 2.83 10.48 1.84 12 1.84C13.52 1.84 14.9 2.83 15.9 4.63L21.96 15.54C22.91 17.25 23.02 18.89 22.26 20.18C21.5 21.45 20.01 22.16 18.06 22.16ZM12 3.34C11.06 3.34 10.14 4.06 9.41001 5.36L3.36001 16.27C2.68001 17.49 2.57001 18.61 3.04001 19.42C3.51001 20.23 4.55001 20.67 5.95001 20.67H18.07C19.47 20.67 20.5 20.23 20.98 19.42C21.46 18.61 21.34 17.5 20.66 16.27L14.59 5.36C13.86 4.06 12.94 3.34 12 3.34Z" />
        </svg>
        <span class="error-message"></span>
      </div>
    </div>
  `;
}

function renderOverlay() {
  return /* html */`
    <slot name= "overlay">
      <div class="file-overlay">
        <slot name="overlay-content">
          <button class="reselect-button" type="button">${dictionary.get(i18n, "reselectFile")}</button>
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
