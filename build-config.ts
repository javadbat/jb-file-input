import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-file-input",
    path: "./lib/jb-file-input.ts",
    outputPath: "./dist/jb-file-input.js",
    umdName: "JBFileInput",
    external:["jb-validation","jb-core"],
    globals: {
      "jb-validation": "JBValidation",
      "jb-core": "JBCore",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-file-input-react",
    path: "./react/lib/JBFileInput.tsx",
    outputPath: "./react/dist/JBFileInput.js",
    external: ["jb-file-input", "prop-types", "react", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "jb-file-input": "JBFileInput",
      "prop-types": "PropTypes",
      "jb-core/react":"JBCoreReact",
    },
    umdName: "JBFileInputReact",
    dir: "./react"
  },
];