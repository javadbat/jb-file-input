'use client';
import React, { forwardRef, useImperativeHandle, useRef, type PropsWithChildren } from 'react';
import 'jb-file-input';
// eslint-disable-next-line no-duplicate-imports
import type { JBFileInputWebComponent } from 'jb-file-input';
import {useEvents, type EventProps} from './events-hook.js';
import { useJBFileInputAttribute, type JBFileInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

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
  // uploadPercent is passed by ...otherProps
  const {acceptTypes,initialValue,uploading,placeholderTitle,disabled,required, hideDownload,value,onChange,onInit,onLoad,children, ...otherProps} = props;
  useJBFileInputAttribute(element,{acceptTypes,initialValue,placeholderTitle,disabled,required,value})
  useEvents(element,{onChange,onInit,onLoad});
  return (
    <jb-file-input ref={element} uploading={props.uploading?"":undefined} hide-download={hideDownload?'':undefined} {...otherProps}>{children}</jb-file-input>
  );
});

JBFileInput.displayName = "JBFileInput";
type JBFileInputProps = PropsWithChildren<EventProps & JBFileInputAttributes & {
  name?:string,
  uploading?:boolean,
  uploadPercent?:number,
  hideDownload?:boolean
}>
export type Props = JBFileInputProps & JBElementStandardProps<JBFileInputWebComponent, keyof JBFileInputProps>
