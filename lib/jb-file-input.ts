import { ValidationHelper } from "jb-validation";
import { ValidationItem, WithValidation } from "jb-validation/types";
import HTML from "./jb-file-input.html";
import CSS from "./jb-file-input.scss";
import { ElementObjects, FileInputStatus, ValidationErrorType, ValidationValue } from "./types";

export class JBFileInputWebComponent extends HTMLElement implements WithValidation<ValidationValue> {
  #value: File | null = null;
  #elements!: ElementObjects;
  #required = false;
  #status: FileInputStatus = "empty";
  #acceptTypes =
    "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*";
  get acceptTypes() {
    return this.#acceptTypes;
  }
  set acceptTypes(value: string) {
    if (value) {
      this.#acceptTypes = value;
      this.#elements.virtualInput.accept = value;
    }
  }
  get value() {
    return this.#value;
  }
  set value(value) {
    if (value == null) {
      this.resetValue();
    } else {
      this.#value = value;
    }
  }
  get status() {
    //it is read only variable
    return this.#value;
  }
  get selectedFileType(): string | null{
    if (this.#value) {
      this.#value.type;
    } else {
      return null;
    }
    return null;
  }
  #validation = new ValidationHelper<ValidationValue>(this.showValidationError.bind(this),this.clearValidationError.bind(this),()=>({file:this.#value}),(val)=>(val.file.name),this.#getInsideValidation.bind(this))
  get validation (){
    return this.#validation;
  }
  #isAutoValidationDisabled = false;
  get isAutoValidationDisabled(){
    return this.#isAutoValidationDisabled;
  }
  set isAutoValidationDisabled(value:boolean){
    this.#isAutoValidationDisabled = value;
  }
  constructor() {
    super();
    this.initWebComponent();
    this.initProp();
    this.registerEventListener();
  }
  initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
      slotAssignment: "named",
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#elements = {
      componentWrapper: shadowRoot.querySelector(
        ".jb-file-input-web-component"
      ) as HTMLDivElement,
      placeholderWrapper: shadowRoot.querySelector(
        ".placeholder-wrapper"
      ) as HTMLDivElement,
      virtualInput: this.#createVirtualInputFile(),
      placeholderTitle: shadowRoot.querySelector(
        ".placeholder-title"
      ) as HTMLDivElement,
      fileNameWrapper: shadowRoot.querySelector(
        ".file-wrapper .file-name"
      ) as HTMLDivElement,
    };
  }
  initProp() {
    this.setStatus("empty");
    this.#value = null;
    this.#required = false;
  }
  registerEventListener() {
    this.#elements.placeholderWrapper.addEventListener(
      "click",
      this.openFileSelector.bind(this)
    );
    //TODO: bind selected file to open input on clicked
    //this._shadowRoot.querySelector('.image-wrapper img').addEventListener('click', this.openImageSelector.bind(this));
  }
  #createVirtualInputFile() {
    const virtualInputFile = document.createElement(
      "input"
    ) as HTMLInputElement;
    virtualInputFile.type = "file";
    virtualInputFile.accept = this.acceptTypes;
    virtualInputFile.addEventListener("change", (e) => this.#onFileSelected(e));
    return virtualInputFile;
  }
  openFileSelector() {
    this.#elements.virtualInput.click();
  }
  static get observedAttributes() {
    return ["required", "placeholder-title", "accept"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string) {
    switch (name) {
      case "required":
        if (value == "" || value == "true") {
          this.#required = true;
        } else {
          this.#required = false;
        }
        break;
      case "placeholder-title":
        this.#elements.placeholderTitle.innerHTML = value;
        break;
      case "accept":
        this.acceptTypes = value;

        break;
    }
  }
  #onFileSelected(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      //if user select file and not click on cancel
      //when user select a image from his computer but dont want to edit
      const file = target.files[0];
      this.#value = file;
      this.#elements.fileNameWrapper.innerHTML = file.name;
      this.setStatus("selected");
      this._triggerOnChangeEvent();
    }
  }
  setStatus(status: FileInputStatus) {
    this.#elements.componentWrapper.setAttribute("status", status);
    this.#status = status;
  }
  triggerInputValidation(showError = true) {
    // this method is public and used outside of component to check if field validity param are met

    let errorType: ValidationErrorType | null = null;
    let requiredValid = true;
    if (this.#required) {
      requiredValid = this.value != null;
      if (!requiredValid) {
        errorType = "REQUIRED";
      }
    }
    const isAllValid = requiredValid; //& other validation if they added
    if (isAllValid) {
      this.clearValidationError();
    } else if (showError && errorType) {
      this.showValidationError(errorType);
    }
    return {
      isAllValid,
    };
  }
  showValidationError(message:string) {
    this.#elements.componentWrapper.classList.add("--has-error");
  }
  clearValidationError() {
    this.#elements.componentWrapper.classList.remove("--has-error");
  }
  resetValue() {
    //this function is public and called outside of web component and call inside if user set value = null
    this.#value = null;
    this.setStatus("empty");
    this.#elements.virtualInput.value = "";
  }
  _triggerOnChangeEvent() {
    const event = new Event("change");
    this.dispatchEvent(event);
  }
  #getInsideValidation(){
    const ValidationList:ValidationItem<ValidationValue>[] = [];
    if(this.#required){
      const message = `فایل حتما باید انتخاب شود`;
      ValidationList.push({
        validator:({file})=>{
          return file !== null;
        },
        message:message,
      });
    }
    //TODO: add validation for file size
    return ValidationList;
  }
}

window.customElements.define("jb-file-input", JBFileInputWebComponent);
