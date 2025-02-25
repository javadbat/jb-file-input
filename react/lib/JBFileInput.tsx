import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'jb-file-input';
// eslint-disable-next-line no-duplicate-imports
import { JBFileInputWebComponent } from 'jb-file-input';
import {useEvents, EventProps} from './events-hook.js';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-file-input': JBFileInputType;
        }
        interface JBFileInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBFileInputWebComponent>, JBFileInputWebComponent> {
            class?: string,
            label?: string,
            name?: string,
        }
    }
}
export type JBFileInputEventType<T> = T & {
    target: JBFileInputWebComponent
}
export const JBFileInput = forwardRef((props:Props, ref) => {

  const element = useRef<JBFileInputWebComponent>(null);

  useImperativeHandle(
    ref,
    () => {
      return (element ? element.current as JBFileInputWebComponent : undefined);
    },
    [element],
  );

  useEffect(() => {
    if (element.current && props.acceptTypes) {
      element.current.acceptTypes = props.acceptTypes;
    }
  }, [props.acceptTypes]);

  useEffect(() => {
    if (element.current && props.placeholderTitle) {
      element.current.setAttribute('placeholder-title',props.placeholderTitle);
    }
  }, [props.placeholderTitle]);

  useEffect(() => {
    if (element.current && props.required) {
      element.current.setAttribute('required', props.required?"true":"false");
    }
  }, [props.required]);


  useEvents(element,props);
  return (
    <jb-file-input ref={element} class={props.className}></jb-file-input>
  );
});

JBFileInput.displayName = "JBFileInput";
export type Props = EventProps & {
    className?: string,
    acceptTypes?: string,
    placeholderTitle?:string,
    required?:boolean,
}
