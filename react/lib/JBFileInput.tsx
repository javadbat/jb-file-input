import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'jb-file-input';
// eslint-disable-next-line no-duplicate-imports
import { JBFileInputWebComponent } from 'jb-file-input';
import { useBindEvent } from '../../../../common/hooks/use-event.js';

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
const JBFileInput = forwardRef<JBFileInputWebComponent | null | undefined, JBFileInputProps>((props, ref) => {

  const element = useRef<JBFileInputWebComponent | null>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);

  useImperativeHandle(
    ref,
    () => {
      return (element ? element.current as JBFileInputWebComponent : {} as unknown as JBFileInputWebComponent);
    },
    [element],
  );

  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);

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

  const onchange = useCallback((e: JBFileInputEventType<Event>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  }, [props.onChange]);

  useBindEvent(element, 'change', onchange, true);

  return (
    <jb-file-input ref={element} class={props.className}></jb-file-input>
  );
});

JBFileInput.displayName = "JBFileInput";
type JBFileInputProps = {
    className?: string,
    onChange?: (e: JBFileInputEventType<Event>) => void,
    acceptTypes?: string,
    placeholderTitle?:string,
    required?:boolean,
}
export { JBFileInput };
