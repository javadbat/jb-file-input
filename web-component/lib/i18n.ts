import {JBDictionary} from 'jb-core/i18n';
export type JBFileInputDictionary = {
  requiredMessage:string,
  maxSizeMessage:(maxSize: number) => string,
  chooseFile:string,
  uploading: string,
  reselectFile:string,
  selectedFile:string,
  downloadFile:string,
  deleteFile:string
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
    maxSizeMessage:(maxSize) => `حجم فایل نباید بیشتر از ${maxSize} کیلوبایت باشد`,
    chooseFile:"انتخاب فایل",
    uploading:"در حال آپلود",
    reselectFile:"انتخاب مجدد فایل",
    selectedFile:"فایل انتخاب‌شده",
    downloadFile:"دانلود فایل",
    deleteFile:"حذف فایل"
  },
  "en":{
    requiredMessage:"you must select a file",
    maxSizeMessage:(maxSize) => `File size must not exceed ${maxSize} KB`,
    chooseFile:"Choose File",
    uploading:"Uploading",
    reselectFile: "Re-select File",
    selectedFile:"Selected file",
    downloadFile:"Download file",
    deleteFile:"Delete file"
  }
});
