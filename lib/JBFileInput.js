import HTML from './JBFileInput.html';
import CSS from './JBFileInput.scss';

class JBFileInputWebComponent extends HTMLElement {
    get value(){
        return this._value;
    }
    set value(value){
        if(value == null){
            this.resetValue();
        }else{
            this._value = value;
        }
        
    }
    get status(){
        //it is read only variable
        return this._status;
    }
    constructor() {
        super();
        this.initWebComponent();
        this.initProp();
        this.registerEventListener();
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._html = `<style>${CSS}</style>` + '\n' + HTML
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this._webComponentElement = this._shadowRoot.querySelector('.jb-file-input-web-component');
        this._placeholderWrapperElement = this._shadowRoot.querySelector('.placeholder-wrapper');
    }
    initProp() {
        this.acceptTypes = "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*";
        this.setStatus("empty");
        this.createVirtualInputFile();
        this._value = null;
        this.required = false;
    }
    registerEventListener() {
        this._placeholderWrapperElement.addEventListener('click', this.openFileSelector.bind(this));
        //TODO: bind selected file to open input on clicked
        //this._shadowRoot.querySelector('.image-wrapper img').addEventListener('click', this.openImageSelector.bind(this));
    }
    createVirtualInputFile() {
        this._virtualInputFile = document.createElement('input');
        this._virtualInputFile.type = "file";
        this._virtualInputFile.accept = this.acceptTypes;
        this._virtualInputFile.addEventListener('change', (e) => this.onFileSelected(e));
    }
    openFileSelector() {
        this._virtualInputFile.click();
    }
    static get observedAttributes() {
        return ['required', 'placeholder-title', 'accept'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'required':
                if(value == "" || value == true){
                    this.required = true;
                }else{
                    this.required = false;
                }
                break;
            case 'placeholder-title':
                this.shadowRoot.querySelector('.placeholder-title').innerHTML = value;
                break;
            case 'accept':
                this.acceptTypes = value;
                this._virtualInputFile.accept = value;
                break;
        }
    }
    onFileSelected(e) {
        if (e.target.files.length > 0) {
            //if user select file and not click on cancel
            //when user select a image from his computer but dont want to edit
            let file = e.target.files[0];
            this._value = file;
            this._shadowRoot.querySelector('.file-wrapper .file-name').innerHTML = file.name;
            this.setStatus('selected');
            this.selectedFileType = e.target.files[0].type;
            this._triggerOnChangeEvent();
        }
    }
    setStatus(status){
        this._webComponentElement.setAttribute('status',status)
        this._status = status;
    }
    triggerInputValidation(showError = true) {
        // this method is public and used outside of component to check if field validity param are met
        
        let errorType = '';
        let requiredValid;
        if(this.required){

            requiredValid = this.value != null;
            if(!requiredValid){
                errorType = 'REQUIRED';
            }
        }
        let isAllValid = requiredValid; //& other validation if they added
        if(isAllValid){
            this.clearValidationError();
        }else if(showError){
            this.showValidationError(errorType);
        }
        return {
            isAllValid
        };
    }
    showValidationError(errorType){
        if(errorType == 'REQUIRED'){
            this._webComponentElement.classList.add('--has-error')
        }
    }
    clearValidationError(errorType){
        this._webComponentElement.classList.remove('--has-error')
    }
    resetValue(){
        //this function is public and called outside of web component and call inside if user set value = null
        this._value = null;
        this.setStatus('empty');
        this._virtualInputFile.value = null;
    }
    _triggerOnChangeEvent(){
        const event = new Event("change");
        this.dispatchEvent(event);
    }
}

window.customElements.define('jb-file-input',  JBFileInputWebComponent);