import type {EventTypeWithTarget} from 'jb-core';
import type { JBFileInputWebComponent } from './jb-file-input';

export type ElementObjects = {
    componentWrapper:HTMLDivElement,
    virtualInput:HTMLInputElement,
    placeholder:{
        section:HTMLDivElement
        wrapper:HTMLDivElement,
        title:HTMLDivElement
    }
    file:{
        section:HTMLDivElement,
        wrapper:HTMLDivElement,
        fileName:HTMLDivElement
    }
    uploader:{
        bg:HTMLDivElement
    }
}
export type ValidationErrorType = "REQUIRED";
export type FileInputStatus = "empty" | "selected"
export type ValidationValue = {file:File}
export type JBFileInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBFileInputWebComponent>;