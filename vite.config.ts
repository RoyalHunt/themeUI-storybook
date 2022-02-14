import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import typescript from "@rollup/plugin-typescript";

function getBaseViteConfig(): UserConfigExport {
  const isExternal = (id: string) =>
    !id.startsWith(".") && !path.isAbsolute(id);

  return {
    esbuild: {
      jsxFactory: "jsx",
      jsxInject: `import { jsx } from 'theme-ui'`,
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.tsx"),
        formats: ["es"],
      },
      rollupOptions: {
        external: isExternal,
      },
    },
    plugins: [
      react({
        jsxImportSource: "theme-ui",
      }),
      typescript({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
    ],
  };
}

export default defineConfig(getBaseViteConfig());
