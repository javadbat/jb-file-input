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
  const {accept,initialValue,isUploading,label,message,error,disabled,required,maxSize,hideDownload,value,onChange,onInit,onLoad,children, ...otherProps} = props;
  useJBFileInputAttribute(element,{accept,initialValue,label,message,error,disabled,required,maxSize,isUploading,value})
  useEvents(element,{onChange,onInit,onLoad});
  return (
    <jb-file-input ref={element} hide-download={hideDownload?'':undefined} {...otherProps}>{children}</jb-file-input>
  );
});

JBFileInput.displayName = "JBFileInput";
type JBFileInputProps = PropsWithChildren<EventProps & JBFileInputAttributes & {
  name?:string,
  isUploading?:boolean,
  uploadPercent?:number,
  hideDownload?:boolean
}>
export type Props = JBFileInputProps & JBElementStandardProps<JBFileInputWebComponent, keyof JBFileInputProps>
