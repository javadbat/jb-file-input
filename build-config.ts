import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-file-input",
    path: "./lib/jb-file-input.ts",
    outputPath: "./dist/jb-file-input.js",
    umdName: "JBFileInput",
    external:["jb-validation","jb-core", "jb-core/i18n", "jb-core/theme"],
    globals: {
      "jb-validation": "JBValidation",
      "jb-core": "JBCore",
      "jb-core/i18n": "JBCoreI18N",
      "jb-core/theme": "JBCoreTheme"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-file-input-react",
    path: "./react/lib/JBFileInput.tsx",
    outputPath: "./react/dist/JBFileInput.js",
    external: ["jb-file-input", "react", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "jb-file-input": "JBFileInput",
      "jb-core/react":"JBCoreReact",
    },
    umdName: "JBFileInputReact",
    dir: "./react"
  },
];