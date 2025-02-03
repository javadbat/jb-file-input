import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-file-input",
    path: "./lib/jb-file-input.ts",
    outputPath: "./dist/jb-file-input.js",
    umdName: "JBFileInput",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-file-input-react",
    path: "./react/lib/JBFileInput.tsx",
    outputPath: "./react/dist/JBFileInput.js",
    external: ["jb-file-input", "prop-types", "react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
    },
    umdName: "JBFileInputReact",
    dir: "./react"
  },
];