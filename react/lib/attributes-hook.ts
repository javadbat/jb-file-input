import type { JBFileInputWebComponent, ValidationValue } from "jb-file-input";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect, useRef } from "react";

export type JBFileInputAttributes = {
    acceptTypes?: string,
    placeholderTitle?:string,
    required?:boolean,
}
export function useJBFileInputAttribute(element: RefObject<JBFileInputWebComponent>, props: JBFileInputAttributes) {
  useEffect(() => {
    if (element.current && props.acceptTypes) {
      element.current.acceptTypes = props.acceptTypes;
    }
  }, [props.acceptTypes]);

  useEffect(() => {
    if (element.current && props.placeholderTitle) {
      element.current.setAttribute('placeholder-title', props.placeholderTitle);
    }
  }, [props.placeholderTitle]);

  useEffect(() => {
    if (element.current && props.required) {
      element.current.setAttribute('required', props.required ? "true" : "false");
    }
  }, [props.required]);

}

