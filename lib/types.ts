import type {EventTypeWithTarget} from 'jb-core';
import type { JBFileInputWebComponent } from './jb-file-input';

export type ElementObjects = {
    componentWrapper:HTMLDivElement,
    placeholderWrapper:HTMLDivElement,
    virtualInput:HTMLInputElement,
    placeholderTitle:HTMLDivElement,
    fileNameWrapper:HTMLDivElement,
}
export type ValidationErrorType = "REQUIRED";
export type FileInputStatus = "empty" | "selected"
export type ValidationValue = {file:File}

export type JBFileInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBFileInputWebComponent>;