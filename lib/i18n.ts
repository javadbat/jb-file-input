import {JBDictionary} from 'jb-core/i18n';
export type JBFileInputDictionary = {
  requiredMessage:string,
  chooseFile:string
}

/**
 * dictionary of jb file input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-file-input'
 * dictionary.setLanguage("fr", {
 *  requiredMessage: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBFileInputDictionary>({
  "fa":{
    requiredMessage:"فایل حتما باید انتخاب شود",
    chooseFile:"انتخاب فایل"
  },
  "en":{
    requiredMessage:"you must select a file",
    chooseFile:"Choose File"
  }
});