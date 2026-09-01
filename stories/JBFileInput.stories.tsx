import { useMemo, useRef } from 'react';
import type { JBFileInputWebComponent } from 'jb-file-input';
import { JBButton } from 'jb-button/react';
import {JBFileInput} from 'jb-file-input/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';


const meta = {
  title: "Components/form elements/JBFileInput",
  component: JBFileInput,
  args:{
    style:{height:`10rem`}
  }
} satisfies Meta<typeof JBFileInput>;
export default meta;
type Story = StoryObj<typeof meta>;

const initialFile = new File(['initial'], 'initial.txt', { type: 'text/plain' });
const liveFile = new File(['live'], 'live.txt', { type: 'text/plain' });

export const Normal:Story = {
  args:{
    
  }
};

export const Label: Story = {
  args: {
    label: 'Select a contract file',
    message: 'PDF files up to 1 MB',
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    await waitFor(() => {
      expect(fileInput?.shadowRoot?.querySelector('.placeholder-title')?.textContent).toBe('Select a contract file');
      expect(fileInput?.shadowRoot?.querySelector('.message-box')?.textContent).toBe('PDF files up to 1 MB');
    });
  },
};

export const ExternalError: Story = {
  args: {
    label: "Select a contract file",
    message: "PDF files up to 1 MB",
    error: "The selected file is not allowed",
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>("jb-file-input");
    const message = fileInput?.shadowRoot?.querySelector<HTMLElement>(".message-box");

    await waitFor(() => {
      expect(fileInput?.checkValidity()).toBe(false);
      expect(message?.textContent).toBe("The selected file is not allowed");
      expect(message?.classList.contains("error")).toBe(true);
    });

    fileInput!.error = null;
    fileInput!.reportValidity();
    expect(message?.textContent).toBe("PDF files up to 1 MB");
  },
};

export const ImperativeMethods: Story = {
  args: {
    required: true,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    const invalid = new File([''], 'empty.txt', { type: 'text/plain' });

    expect(fileInput).toBeTruthy();
    expect(typeof fileInput?.openFileSelector).toBe('function');
    expect(typeof fileInput?.resetValue).toBe('function');
    expect(fileInput?.checkValidity()).toBe(false);
    expect(fileInput?.reportValidity()).toBe(false);

    fileInput!.value = invalid;
    await waitFor(() => {
      expect(fileInput?.value?.name).toBe('empty.txt');
      expect(fileInput?.checkValidity()).toBe(true);
    });

    fileInput!.resetValue();
    expect(fileInput?.value).toBeNull();
    expect(fileInput?.status).toBe('empty');
  },
};

export const CustomValidation: Story = {
  args: {
    value: liveFile,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');

    fileInput!.validation.list = [
      {
        validator: ({ file }) => file !== null && file.size < 3,
        message: 'File must be smaller than 3 bytes',
      },
    ];

    expect(fileInput?.checkValidity()).toBe(false);
    expect(fileInput?.reportValidity()).toBe(false);
    expect(fileInput?.shadowRoot?.querySelector('.jb-file-input-web-component')?.classList.contains('--has-error')).toBe(true);
  },
};

export const MaxSizeValidation: Story = {
  args: {
    maxSize: 1,
    value: new File(["a".repeat(1025)], "too-large.txt", { type: "text/plain" }),
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>("jb-file-input");
    const component = fileInput?.shadowRoot?.querySelector<HTMLElement>(".jb-file-input-web-component");
    const errorOverlay = fileInput?.shadowRoot?.querySelector<HTMLElement>(".error-overlay");
    const errorMessage = errorOverlay?.querySelector<HTMLElement>(".error-message");

    await waitFor(() => {
      expect(fileInput?.maxSize).toBe(1);
      expect(fileInput?.checkValidity()).toBe(false);
      expect(fileInput?.validationMessage).toBe("File size must not exceed 1 KB");
      expect(component?.classList.contains("--has-error")).toBe(true);
      expect(errorMessage?.textContent).toBe("File size must not exceed 1 KB");
      expect(getComputedStyle(errorOverlay!).display).toBe("flex");
    });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(component?.classList.contains("--has-error")).toBe(true);
    expect(errorMessage?.textContent).toBe("File size must not exceed 1 KB");
    expect(getComputedStyle(errorOverlay!).display).toBe("flex");

    fileInput!.maxSize = null;
    await waitFor(() => {
      expect(fileInput?.checkValidity()).toBe(true);
      expect(getComputedStyle(errorOverlay!).display).toBe("none");
    });
  },
};

export const Events: Story = {
  args: {
    value: liveFile,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    const downloadButton = fileInput?.shadowRoot?.querySelector<HTMLElement>('.download-button');
    const deleteButton = fileInput?.shadowRoot?.querySelector<HTMLElement>('.delete-button');
    let changeCount = 0;
    let downloadCount = 0;
    let deleteCount = 0;

    fileInput?.addEventListener('change', () => changeCount++);
    fileInput?.addEventListener('download', () => downloadCount++);
    fileInput?.addEventListener('delete', () => deleteCount++);

    downloadButton?.click();
    deleteButton?.click();

    await waitFor(() => {
      expect(downloadCount).toBe(1);
      expect(deleteCount).toBe(1);
      expect(changeCount).toBe(1);
      expect(fileInput?.value).toBeNull();
    });
  },
};

export const Slots: Story = {
  render: (args) => (
    <JBFileInput {...args}>
      <span slot="placeholder">Drop a file here</span>
      <span slot="overlay-content">Ready to download</span>
    </JBFileInput>
  ),
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    expect(fileInput?.querySelector('[slot="placeholder"]')?.textContent).toBe('Drop a file here');
    expect(fileInput?.querySelector('[slot="overlay-content"]')?.textContent).toBe('Ready to download');
  },
};

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBFileInput {...args} />
        <JBButton type="button" onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial file',
    initialValue: initialFile,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(fileInput).toBeTruthy();
    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(fileInput?.initialValue?.name).toBe('initial.txt');
      expect(fileInput?.value).toBe(fileInput?.initialValue);
      expect(fileInput?.isDirty).toBe(false);
    });

    Reflect.set(fileInput!, 'value', 'not-a-file');

    expect(fileInput?.value).toBe(fileInput?.initialValue);
    expect(fileInput?.isDirty).toBe(false);

    fileInput!.value = new File(['live'], 'live.txt', { type: 'text/plain' });

    await waitFor(() => {
      expect(fileInput?.value?.name).toBe('live.txt');
      expect(fileInput?.isDirty).toBe(true);
    });

    fileInput!.initialValue = new File(['next'], 'next.txt', { type: 'text/plain' });

    expect(fileInput?.initialValue?.name).toBe('next.txt');
    expect(fileInput?.value?.name).toBe('live.txt');
    expect(fileInput?.isDirty).toBe(true);

    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(fileInput?.value).toBe(fileInput?.initialValue);
      expect(fileInput?.value?.name).toBe('next.txt');
      expect(fileInput?.isDirty).toBe(false);
    });

    const cleanInitialFile = new File(['clean'], 'clean.txt', { type: 'text/plain' });
    fileInput!.initialValue = cleanInitialFile;

    await waitFor(() => {
      expect(fileInput?.value).toBe(cleanInitialFile);
      expect(fileInput?.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    initialValue: initialFile,
    value: liveFile,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');

    await waitFor(() => {
      expect(fileInput?.initialValue?.name).toBe('initial.txt');
      expect(fileInput?.value?.name).toBe('live.txt');
      expect(fileInput?.isDirty).toBe(true);
    });
  },
};

export const RedundantResetDoesNotBlockInitialValue: Story = {
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    const initialFile = new File(['initial'], 'initial.txt', { type: 'text/plain' });

    expect(fileInput?.value).toBeNull();

    fileInput!.resetValue();
    fileInput!.initialValue = initialFile;

    await waitFor(() => {
      expect(fileInput?.value).toBe(initialFile);
      expect(fileInput?.isDirty).toBe(false);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    initialValue: initialFile,
    value: null,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');

    await waitFor(() => {
      expect(fileInput?.initialValue?.name).toBe('initial.txt');
      expect(fileInput?.value).toBeNull();
      expect(fileInput?.isDirty).toBe(true);
    });
  },
};

export const Required:Story = {
  args:{
    required:true,
    label:"Select a required file"
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>("jb-file-input");
    const placeholderSection = fileInput?.shadowRoot?.querySelector<HTMLElement>(".placeholder-section");
    const uploadSection = fileInput?.shadowRoot?.querySelector<HTMLElement>(".upload-section");
    const fileSection = fileInput?.shadowRoot?.querySelector<HTMLElement>(".file-section");

    await waitFor(() => {
      expect(getComputedStyle(placeholderSection!).display).toBe("block");
      expect(getComputedStyle(uploadSection!).display).toBe("none");
      expect(getComputedStyle(fileSection!).display).toBe("none");
    });

    expect(fileInput?.checkValidity()).toBe(false);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: liveFile,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<JBFileInputWebComponent>('jb-file-input');
    const shadowRoot = fileInput?.shadowRoot;
    const placeholderButton = shadowRoot?.querySelector<HTMLButtonElement>('.placeholder-section');
    const fileButton = shadowRoot?.querySelector<HTMLButtonElement>('.file-wrapper');
    const reselectButton = shadowRoot?.querySelector<HTMLButtonElement>('.reselect-button');
    const deleteButton = shadowRoot?.querySelector<HTMLElement>('.delete-button');
    const downloadButton = shadowRoot?.querySelector<HTMLElement>('.download-button');
    let deleteEventCount = 0;
    let downloadEventCount = 0;

    fileInput?.addEventListener('delete', () => deleteEventCount++);
    fileInput?.addEventListener('download', () => downloadEventCount++);

    await waitFor(() => {
      expect(fileInput?.disabled).toBe(true);
      expect(placeholderButton?.disabled).toBe(true);
      expect(fileButton?.disabled).toBe(true);
      expect(reselectButton?.disabled).toBe(true);
      expect(deleteButton?.hasAttribute('disabled')).toBe(true);
      expect(downloadButton?.hasAttribute('disabled')).toBe(false);
      expect(getComputedStyle(reselectButton!).display).toBe('none');
      expect(getComputedStyle(deleteButton!).display).toBe('none');
    });

    deleteButton?.click();
    downloadButton?.click();

    expect(fileInput?.value).toBe(liveFile);
    expect(deleteEventCount).toBe(0);
    expect(downloadEventCount).toBe(1);
  },
};

export const Uploading:Story = {
  args:{
    uploading:true,
    uploadPercent:70
  }
};
export const HideDownloadButton:Story = {
  args:{
    hideDownload:true
  }
};

export const Sizes:Story = {
  render:()=>{
    const file = useMemo(()=>new File([],"TestFileName.txt"),[])
    return(
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:`1rem`}}>
        <JBFileInput style={{height:`8rem`}} />
        <JBFileInput style={{height:`8rem`}} value={file}/>
        <JBFileInput style={{height:`8rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`7rem`}}/>
        <JBFileInput style={{height:`7rem`}} value={file}/>
        <JBFileInput style={{height:`7rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`5rem`}}/>
        <JBFileInput style={{height:`5rem`}} value={file}/>
        <JBFileInput style={{height:`5rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`4rem`}}/>
        <JBFileInput style={{height:`4rem`}} value={file}/>
        <JBFileInput style={{height:`4rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`3rem`}}/>
        <JBFileInput style={{height:`3rem`}} value={file}/>
        <JBFileInput style={{height:`3rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`2rem`}}/>
        <JBFileInput style={{height:`2rem`}} value={file}/>
        <JBFileInput style={{height:`2rem`}} uploading uploadPercent={70}/>
      </div>
    )
  }
}
