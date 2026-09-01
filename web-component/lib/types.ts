import type {EventTypeWithTarget} from 'jb-core';
import type { JBFileInputWebComponent } from './jb-file-input';
import type { JBButtonWebComponent } from 'jb-button';

export type ElementObjects = {
    componentWrapper:HTMLDivElement,
    virtualInput:HTMLInputElement,
    placeholder:{
        section:HTMLButtonElement
        wrapper:HTMLSpanElement,
        title:HTMLSpanElement,
        message:HTMLSpanElement
    }
    file:{
        section:HTMLDivElement,
        wrapper:HTMLButtonElement,
        fileName:HTMLSpanElement
    }
    uploader:{
        bg:HTMLDivElement
    },
    overlay:{
        wrapper:HTMLDivElement,
        reselect:HTMLButtonElement,
        delete:JBButtonWebComponent,
        download:JBButtonWebComponent
    },
    errorOverlay:{
        container:HTMLDivElement,
        message:HTMLSpanElement
    }
}
export type ValidationErrorType = "REQUIRED";
export type FileInputStatus = "empty" | "selected"
export type ValidationValue = {file:File | null}
export type JBFileInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBFileInputWebComponent>;
