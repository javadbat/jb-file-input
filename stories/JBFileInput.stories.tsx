import {JBFileInput, Props} from 'jb-file-input/react';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<Props> = {
  title: "Components/form elements/JBFileInput",
  component: JBFileInput,
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