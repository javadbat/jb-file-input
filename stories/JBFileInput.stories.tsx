import React from 'react';
import {JBFileInput, type Props} from 'jb-file-input/react';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<Props> = {
  title: "Components/form elements/JBFileInput",
  component: JBFileInput,
  args:{
    style:{height:`10rem`}
  }
};
export default meta;
type Story = StoryObj<typeof JBFileInput>;

export const Normal:Story = {
  args:{
    
  }
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

export const Sizes:Story = {
  render:()=>{
    return(
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:`1rem`}}>
        <JBFileInput style={{height:`8rem`}}/>
        <JBFileInput style={{height:`8rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`7rem`}}/>
        <JBFileInput style={{height:`7rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`5rem`}}/>
        <JBFileInput style={{height:`5rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`4rem`}}/>
        <JBFileInput style={{height:`4rem`}} uploading uploadPercent={70}/>
        <JBFileInput style={{height:`2rem`}}/>
        <JBFileInput style={{height:`2rem`}} uploading uploadPercent={70}/>
      </div>
    )
  }
}