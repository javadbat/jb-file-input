'use client';
import React, { forwardRef, useImperativeHandle, useRef, type PropsWithChildren } from 'react';
import 'jb-file-input';
// eslint-disable-next-line no-duplicate-imports
import type { JBFileInputWebComponent } from 'jb-file-input';
import {useEvents, type EventProps} from './events-hook.js';
import { useJBFileInputAttribute, type JBFileInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-file-input': JBFileInputType;
        }
        interface JBFileInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBFileInputWebComponent>, JBFileInputWebComponent> {
            label?: string,
            name?: string,
            uploading?:string
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

  const {acceptTypes,uploading,placeholderTitle,required,onChange,onInit,onLoad,children, ...otherProps} = props;
  useJBFileInputAttribute(element,{acceptTypes,placeholderTitle,required})
  useEvents(element,{onChange,onInit,onLoad});
  return (
    <jb-file-input ref={element} uploading={props.uploading?"":undefined} {...otherProps}>{children}</jb-file-input>
  );
});

JBFileInput.displayName = "JBFileInput";
type JBFileInputProps = PropsWithChildren<EventProps & JBFileInputAttributes & {
  name?:string,
  uploading?:boolean,
  uploadPercent?:number
}>
export type Props = JBFileInputProps & JBElementStandardProps<JBFileInputWebComponent, keyof JBFileInputProps>
