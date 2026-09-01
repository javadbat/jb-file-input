import type { JBFileInputWebComponent, ValidationValue } from "jb-file-input";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBFileInputAttributes = {
  value?: File | null,
  initialValue?: File | null,
  acceptTypes?: string,
  label?: string,
  message?: string,
  error?: string,
  disabled?: boolean,
  required?: boolean,
  maxSize?: number | null,
  validationList?: ValidationItem<ValidationValue>[],
}
export function useJBFileInputAttribute(element: RefObject<JBFileInputWebComponent | null>, props: JBFileInputAttributes) {
  useEffect(() => {
    if (element.current && props.initialValue !== undefined) {
      element.current.initialValue = props.initialValue;
    }
  }, [props.initialValue, element]);

  useEffect(() => {
    if (element.current && props.value !== undefined) {
      element.current.value = props.value;
    }
  }, [props.value, element]);

  useEffect(() => {
    if (element.current && props.acceptTypes) {
      element.current.acceptTypes = props.acceptTypes;
    }
  }, [props.acceptTypes, element]);

  useEffect(() => {
    if (element.current) {
      element.current.label = props.label;
    }
  }, [props.label, element]);

  useEffect(() => {
    if (element.current) {
      element.current.message = props.message;
    }
  }, [props.message, element]);

  useEffect(() => {
    if (element.current) {
      element.current.error = props.error;
    }
  }, [props.error, element]);

  useEffect(() => {
    if (props.disabled) {
      element.current?.setAttribute('disabled', '');
    } else {
      element.current?.removeAttribute('disabled');
    }
  }, [props.disabled, element]);

  useEffect(() => {
    if (element.current && props.required) {
      element.current.setAttribute('required', props.required ? "true" : "false");
    }
  }, [props.required, element]);

  useEffect(() => {
    let isActive = true;
    void customElements.whenDefined("jb-file-input").then(() => {
      if (isActive && element.current && props.maxSize !== undefined) {
        element.current.maxSize = props.maxSize;
      }
    });
    return () => {
      isActive = false;
    };
  }, [props.maxSize, element]);

  useEffect(() => {
    if (element.current && Array.isArray(props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList, element]);

}
