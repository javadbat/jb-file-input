import React, { useMemo, useRef } from 'react';
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
    placeholderTitle: 'initial file',
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
    placeholderTitle:"click and open select file then hit the cancel for test"
  }
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
