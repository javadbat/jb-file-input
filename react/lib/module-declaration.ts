import type { JBFileInputWebComponent } from 'jb-file-input';

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-file-input': JBFileInputType;
        }
        interface JBFileInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBFileInputWebComponent>, JBFileInputWebComponent> {
            label?: string,
            name?: string,
            uploading?:string,
            "hide-download"?:string
        }
    }
}
