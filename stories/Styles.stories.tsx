import React, { useMemo } from 'react';
import { JBFileInput } from 'jb-file-input/react';
import type { Meta, StoryObj } from '@storybook/react';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/JBFileInput/Style",
  component: JBFileInput,
} satisfies Meta<typeof JBFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style carbon-file-input" },
  { name: "Aurora", className: "aurora-style aurora-file-input" },
  { name: "Forest", className: "forest-style forest-file-input" },
  { name: "Sunset", className: "sunset-style sunset-file-input" },
  { name: "Porcelain", className: "porcelain-style porcelain-file-input" },
  { name: "Candy", className: "candy-style candy-file-input" },
  { name: "Terminal", className: "terminal-style terminal-file-input" },
  { name: "Material", className: "material-style material-file-input" },
  { name: "Fluent", className: "fluent-style fluent-file-input" },
  { name: "Bootstrap", className: "bootstrap-style bootstrap-file-input" },
  { name: "Cupertino", className: "cupertino-style cupertino-file-input" },
  { name: "Ant Design", className: "ant-design-style ant-file-input" },
];

function FileInputStyleSample({ className }: { className: string }) {
  const file = useMemo(() => new File([], "quarterly-report.pdf"), []);

  return (
    <div style={{
      display: "grid",
      gap: "0.75rem",
      width: "100%",
    }}>
      <JBFileInput className={className} style={{ height: "8rem" }} />
      <JBFileInput className={className} style={{ height: "8rem" }} value={file} />
      <JBFileInput className={className} style={{ height: "8rem" }} uploading uploadPercent={68} />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 76rem)",
    }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
          className={sample.className.split(" ")[0]}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}>
            {sample.name}
          </div>
          <FileInputStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Carbon: Story = {
  name: "Carbon",
  render: () => <FileInputStyleSample className="carbon-style carbon-file-input" />,
};

export const Aurora: Story = {
  name: "Aurora",
  render: () => <FileInputStyleSample className="aurora-style aurora-file-input" />,
};

export const Forest: Story = {
  name: "Forest",
  render: () => <FileInputStyleSample className="forest-style forest-file-input" />,
};

export const Sunset: Story = {
  name: "Sunset",
  render: () => <FileInputStyleSample className="sunset-style sunset-file-input" />,
};

export const Porcelain: Story = {
  name: "Porcelain",
  render: () => <FileInputStyleSample className="porcelain-style porcelain-file-input" />,
};

export const Candy: Story = {
  name: "Candy",
  render: () => <FileInputStyleSample className="candy-style candy-file-input" />,
};

export const Terminal: Story = {
  name: "Terminal",
  render: () => <FileInputStyleSample className="terminal-style terminal-file-input" />,
};

export const Material: Story = {
  name: "Material",
  render: () => <FileInputStyleSample className="material-style material-file-input" />,
};

export const Fluent: Story = {
  name: "Fluent",
  render: () => <FileInputStyleSample className="fluent-style fluent-file-input" />,
};

export const Bootstrap: Story = {
  name: "Bootstrap",
  render: () => <FileInputStyleSample className="bootstrap-style bootstrap-file-input" />,
};

export const Cupertino: Story = {
  name: "Cupertino",
  render: () => <FileInputStyleSample className="cupertino-style cupertino-file-input" />,
};

export const AntDesign: Story = {
  name: "Ant Design",
  render: () => <FileInputStyleSample className="ant-design-style ant-file-input" />,
};
