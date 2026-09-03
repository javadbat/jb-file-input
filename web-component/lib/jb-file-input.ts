import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import { ValidationHelper, type ShowValidationErrorParameters, type ValidationItem, type ValidationResult, type WithValidation } from "jb-validation";
import CSS from "./jb-file-input.css";
import VariablesCSS from "./variables.css";
import type { ElementObjects, FileInputStatus, ValidationValue } from "./types";
import type { JBButtonWebComponent } from "jb-button";
import { registerDefaultVariables } from "jb-core/theme";
import { renderHTML } from "./render";
import { dictionary } from "./i18n";
import { i18n } from "jb-core/i18n";
import type { JBFormInputStandards } from "jb-form";
export * from "./types.js";
export class JBFileInputWebComponent extends JBBaseComponent implements WithValidation<ValidationValue>, JBFormInputStandards<File | null> {
  static formAssociated = true;
  #value: File | null = null;
  #isDirty = false;
  #elements!: ElementObjects;
  #disabled = false;
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    if (this.#elements) {
      this.#elements.virtualInput.disabled = value;
      this.#elements.placeholder.section.disabled = value;
      this.#elements.file.wrapper.disabled = value;
      this.#elements.overlay.reselect.disabled = value;
      this.#elements.overlay.delete.toggleAttribute("disabled", value);
    }
    if (value) {
      this.#internals?.states?.add("disabled");
      if (this.#internals) this.#internals.ariaDisabled = "true";
    } else {
      this.#internals?.states?.delete("disabled");
      if (this.#internals) this.#internals.ariaDisabled = "false";
    }
  }
  #required = false;
  set required(value: boolean) {
    this.#required = value;
    this.#validation.checkValiditySync({ showError: false });
  }
  get required() {
    return this.#required;
  }
  get label() {
    return this.getAttribute("label") ?? dictionary.get(i18n, "chooseFile");
  }
  set label(value: string | null | undefined) {
    value == null ? this.removeAttribute("label") : this.setAttribute("label", value);
  }
  get message(): string {
    return this.getAttribute("message") ?? "";
  }
  set message(value: string | null | undefined) {
    value == null ? this.removeAttribute("message") : this.setAttribute("message", value);
  }
  get error() {
    return this.getAttribute("error");
  }
  set error(value: string | null | undefined) {
    value == null || value.trim().length === 0 ? this.removeAttribute("error") : this.setAttribute("error", value);
  }
  #maxSize: number | null = null;
  /**
   * Maximum allowed file size in KB. Set to null to disable size validation.
   */
  get maxSize() {
    return this.#maxSize;
  }
  set maxSize(value: number | null) {
    this.#maxSize = value;
    this.#validation.checkValiditySync({ showError: this.#value !== null });
  }
  #internals?: ElementInternals;
  #fileInputStatus: FileInputStatus = "empty";
  #accept = "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*";
  get name(): string {
    return this.getAttribute("name") || "";
  }
  set name(value: string | null | undefined) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }
  get form() {
    return this.#internals!.form;
  }
  get accept() {
    return this.#accept;
  }
  set accept(value: string) {
    this.#setAccept(value);
    if (this.getAttribute("accept") !== value) this.setAttribute("accept", value);
  }
  #setAccept(value: string) {
    this.#accept = value;
    if (this.#elements) this.#elements.virtualInput.accept = value;
  }
  get value() {
    return this.#value;
  }
  set value(value: File | null) {
    if (value == null) {
      // An explicit live null must continue to take precedence over initialValue.
      this.#isDirty = true;
      this.#clearValue();
    } else if (value instanceof File) {
      this.#isDirty = true;
      this.#setValue(value);
      this.#validation.checkValiditySync({ showError: this.#maxSize !== null });
    }
  }
  #setValue(value: File) {
    this.#value = value;
    this.#elements.file.fileName.textContent = value.name;
    this.#internals?.states?.add("fill");
    this.#internals?.states?.delete("empty");
    this.#updateFormValue();
    this.setStatus("selected");
  }
  #clearValue() {
    this.#value = null;
    this.#elements.file.fileName.textContent = "";
    this.#internals?.states?.add("empty");
    this.#internals?.states?.delete("fill");
    this.#updateFormValue();
    this.setStatus("empty");
    this.#elements.virtualInput.value = "";
  }
  #updateFormValue() {
    this.#internals?.setFormValue(this.#value);
  }
  #initialValue: File | null = null;
  /**
   * Default and reset value. It initializes `value` until the live value is explicitly set.
   */
  get initialValue(): File | null {
    return this.#initialValue;
  }
  set initialValue(value: File | null) {
    this.#initialValue = value instanceof File ? value : null;
    if (!this.#isDirty) {
      if (this.#initialValue) {
        this.#setValue(this.#initialValue);
      } else {
        this.#clearValue();
      }
    }
  }
  get isDirty(): boolean {
    return this.value !== this.initialValue;
  }
  reset() {
    this.#isDirty = false;
    if (this.initialValue) {
      this.#setValue(this.initialValue);
    } else {
      this.#clearValue();
    }
    this.#validation.reset();
    this.#internals?.setValidity({}, "");
  }
  formResetCallback() {
    this.reset();
  }
  get status() {
    //it is read only variable
    return this.#fileInputStatus;
  }
  get selectedFileType(): string | null {
    if (this.#value) {
      this.#value.type;
    }
    return null;
  }
  #uploadPercent: number | null = null;
  #isUploading = false;
  get isUploading(): boolean {
    return this.#isUploading;
  }
  set isUploading(value: boolean) {
    this.#isUploading = Boolean(value);
    this.toggleAttribute("is-uploading", this.#isUploading);
    this.setAttribute("aria-busy", this.#isUploading ? "true" : "false");
  }
  get isLoading(): boolean {
    return this.#isUploading;
  }
  get uploadPercent() {
    return this.#uploadPercent;
  }
  set uploadPercent(value: number | null) {
    this.#uploadPercent = value;
    this.#updateUploadPercent();
  }
  #updateUploadPercent() {
    if (this.#elements) {
      this.#elements.uploader.bg.style.setProperty("--upload-percent", `${this.#uploadPercent ?? 0}%`);
    }
  }
  #validation = new ValidationHelper<ValidationValue>({
    clearValidationError: this.clearValidationError.bind(this),
    getValue: () => ({ file: this.#value }),
    getValidations: this.#getInsideValidation.bind(this),
    getValueString: val => val.file?.name ?? "",
    setValidationResult: this.#setValidationResult.bind(this),
    showValidationError: this.showValidationError.bind(this),
  });
  get validation() {
    return this.#validation;
  }
  #isAutoValidationDisabled = false;
  get isAutoValidationDisabled() {
    return this.#isAutoValidationDisabled;
  }
  set isAutoValidationDisabled(value: boolean) {
    this.#isAutoValidationDisabled = value;
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.initWebComponent();
      if (this.#internals) this.#internals.ariaLabel = dictionary.get(i18n, "chooseFile");
      this.initProp();
      this.registerEventListener();
      if (typeof this.attachInternals == "function") {
        //some browser dont support attachInternals
        this.#internals = this.attachInternals();
        this.#internals.role = "group";
      }
    }
  }

  initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
      slotAssignment: "named",
      serializable: true,
    });
    registerDefaultVariables();
    const html = `<style>${CSS} ${VariablesCSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#elements = {
      componentWrapper: shadowRoot.querySelector(".jb-file-input-web-component") as HTMLDivElement,
      placeholder: {
        section: shadowRoot.querySelector(".placeholder-section") as HTMLButtonElement,
        wrapper: shadowRoot.querySelector(".placeholder-wrapper") as HTMLSpanElement,
        title: shadowRoot.querySelector(".placeholder-title") as HTMLSpanElement,
        message: shadowRoot.querySelector(".message-box") as HTMLSpanElement,
      },
      file: {
        section: shadowRoot.querySelector(".file-section") as HTMLDivElement,
        wrapper: shadowRoot.querySelector(".file-wrapper") as HTMLButtonElement,
        fileName: shadowRoot.querySelector(".file-wrapper .file-name") as HTMLSpanElement,
      },
      virtualInput: this.#createVirtualInputFile(),
      uploader: {
        bg: shadowRoot.querySelector(".upload-bg") as HTMLDivElement,
      },
      overlay: {
        delete: shadowRoot.querySelector(".delete-button") as JBButtonWebComponent,
        download: shadowRoot.querySelector(".download-button") as JBButtonWebComponent,
        wrapper: shadowRoot.querySelector(".file-overlay") as HTMLDivElement,
        reselect: shadowRoot.querySelector(".reselect-button") as HTMLButtonElement,
      },
      errorOverlay: {
        container: shadowRoot.querySelector(".error-overlay") as HTMLDivElement,
        message: shadowRoot.querySelector(".error-overlay .error-message") as HTMLSpanElement,
      },
    };
    this.#updateUploadPercent();
  }
  initProp() {
    this.#clearValue();
    this.#required = false;
  }
  registerEventListener() {
    this.#elements.placeholder.section.addEventListener("click", this.openFileSelector.bind(this));
    this.#elements.file.wrapper.addEventListener("click", this.openFileSelector.bind(this));
    this.#elements.overlay.wrapper.addEventListener("click", this.openFileSelector.bind(this));
    this.#elements.overlay.delete.addEventListener("click", this.#onDeleteClick.bind(this));
    this.#elements.overlay.download.addEventListener("click", this.#onDownloadClick.bind(this));
  }
  #createVirtualInputFile() {
    const virtualInputFile = document.createElement("input") as HTMLInputElement;
    virtualInputFile.type = "file";
    virtualInputFile.accept = this.accept;
    virtualInputFile.disabled = this.disabled;
    virtualInputFile.addEventListener("change", e => this.#onFileSelected(e));
    return virtualInputFile;
  }
  openFileSelector(event?: Event) {
    if (this.disabled) {
      event?.preventDefault();
      event?.stopPropagation();
      return;
    }
    const path = event?.composedPath();
    if (path?.includes(this.#elements.overlay.delete) || path?.includes(this.#elements.overlay.download)) {
      return;
    }
    this.#elements.virtualInput.click();
  }
  static get observedAttributes() {
    return ["required", "label", "message", "error", "accept", "disabled", "is-uploading"];
  }
  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string | null) {
    switch (name) {
      case "required":
        this.#required = parseBooleanAttribute(value);
        if (this.#internals) {
          this.#internals.ariaRequired = String(this.#required);
        }
        break;
      case "label": {
        const label = value ?? dictionary.get(i18n, "chooseFile");
        this.#elements.placeholder.title.textContent = label;
        if (this.#internals) this.#internals.ariaLabel = label;
        break;
      }
      case "message":
        if (!this.#elements.placeholder.message.classList.contains("error")) {
          this.#elements.placeholder.message.textContent = value ?? "";
        }
        if (this.#internals && !this.error) this.#internals.ariaDescription = value ?? "";
        break;
      case "error":
        this.reportValidity();
        break;
      case "accept":
        this.#setAccept(value ?? "");
        break;
      case "disabled":
        this.disabled = parseBooleanAttribute(value);
        break;
      case "is-uploading":
        this.isUploading = parseBooleanAttribute(value);
        break;
    }
  }
  #onFileSelected(e: Event) {
    if (this.disabled) {
      this.#elements.virtualInput.value = "";
      return;
    }
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      //if user select file and not click on cancel
      //when user select a image from his computer but dont want to edit
      const file = target.files[0];
      this.value = file;
      this.#triggerOnChangeEvent();
    } else {
      //user click on cancel button of file select dialog
    }
    this.#validation.checkValiditySync({ showError: true });
  }
  setStatus(status: FileInputStatus) {
    // this.#elements.componentWrapper.setAttribute("status", status);
    this.#fileInputStatus = status;
  }
  showValidationError(error: ShowValidationErrorParameters) {
    this.#elements.componentWrapper.classList.add("--has-error");
    if (this.#value) {
      this.#showOverlayError(error.message);
    } else {
      this.#elements.placeholder.message.textContent = error.message;
      this.#elements.placeholder.message.classList.add("error");
    }
    this.#internals?.states?.add("invalid");
    if (this.#internals) {
      this.#internals.ariaInvalid = "true";
      this.#internals.ariaDescription = error.message;
    }
  }
  clearValidationError() {
    this.#elements.componentWrapper.classList.remove("--has-error");
    this.#elements.placeholder.message.textContent = this.message;
    this.#elements.placeholder.message.classList.remove("error");
    this.#hideOverlayError();
    this.#internals?.states?.delete("invalid");
    if (this.#internals) this.#internals.ariaInvalid = "false";
    if (this.#internals) this.#internals.ariaDescription = this.message;
  }
  #errorOverlayTimeout?: ReturnType<typeof setTimeout>;
  #showOverlayError(message: string) {
    if (this.#errorOverlayTimeout) clearTimeout(this.#errorOverlayTimeout);
    this.#elements.errorOverlay.message.textContent = message;
    this.#elements.errorOverlay.container.style.display = "flex";
    this.#errorOverlayTimeout = setTimeout(() => this.#hideOverlayError(), 2000);
  }
  #hideOverlayError() {
    if (this.#errorOverlayTimeout) clearTimeout(this.#errorOverlayTimeout);
    this.#errorOverlayTimeout = undefined;
    this.#elements.errorOverlay.message.textContent = "";
    this.#elements.errorOverlay.container.style.display = "none";
  }
  #triggerOnChangeEvent() {
    const event = new Event("change");
    this.dispatchEvent(event);
  }
  #getInsideValidation() {
    const ValidationList: ValidationItem<ValidationValue>[] = [];
    if (this.#required) {
      const message = dictionary.get(i18n, "requiredMessage");
      ValidationList.push({
        validator: ({ file }) => {
          return file !== null;
        },
        message: message,
        stateType: "valueMissing",
      });
    }
    const maxSize = this.#maxSize;
    if (maxSize !== null) {
      ValidationList.push({
        validator: ({ file }) => {
          const res = file === null || file.size <= maxSize * 1024;
          return res;
        },
        message: dictionary.get(i18n, "maxSizeMessage")(maxSize),
        stateType: "customError",
      });
    }
    const error = this.error;
    if (error && error.trim().length > 0) {
      ValidationList.push({
        validator: undefined,
        message: error,
        stateType: "customError",
      });
    }
    return ValidationList;
  }
  /**
   * @public
   * @description this method used to check for validity but doesn't show error to user and just return the result
   * this method used by #internal of component
   */
  checkValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: false });
    if (!validationResult.isAllValid) {
      const event = new CustomEvent("invalid");
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
  /**
   * @public
   * @description this method used to check for validity and show error to user
   */
  reportValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: true });
    if (!validationResult.isAllValid) {
      const event = new CustomEvent("invalid");
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
  /**
   * @description this method called on every checkValidity calls and update validation result of #internal
   */
  #setValidationResult(result: ValidationResult<ValidationValue>) {
    if (result.isAllValid) {
      this.#internals?.setValidity({}, "");
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach(res => {
        if (!res.isValid) {
          if (res.validation.stateType) {
            states[res.validation.stateType] = true;
          }
          if (message == "") {
            message = res.message ?? "";
          }
        }
      });
      this.#internals?.setValidity(states, message);
    }
  }
  get validationMessage() {
    return this.#internals?.validationMessage ?? null;
  }
  get validity() {
    return this.#internals?.validity;
  }
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }
  #onDownloadClick(e: MouseEvent) {
    e.stopPropagation();
    const event = new CustomEvent("download", { cancelable: false });
    this.dispatchEvent(event);
  }
  #onDeleteClick(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.value = null;
    this.validation.checkValiditySync({ showError: true });
    this.#triggerOnChangeEvent();
    this.#dispatchDeleteEvent();
  }
  #dispatchDeleteEvent() {
    const e = new CustomEvent("delete", { cancelable: false });
    this.dispatchEvent(e);
  }
}
defineWebComponent("jb-file-input", JBFileInputWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-file-input": JBFileInputWebComponent;
  }
}
