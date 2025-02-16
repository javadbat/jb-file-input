import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type {JBFileInputWebComponent, JBFileInputEventType} from 'jb-file-input';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBFileInputEventType<CustomEvent>) => void,
    /**
   * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onInit?: (e: JBFileInputEventType<CustomEvent>) => void,
  /**
   * base on standard js `change` event so it only called on blur. use onInput to get every keyStroke 
   */
  onChange?: (e: JBFileInputEventType<Event>) => void,

}
export function useEvents(element:RefObject<JBFileInputWebComponent>,props:EventProps){
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, 'change', props.onChange, true);
}