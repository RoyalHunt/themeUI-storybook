import path from 'path';
import react from '@vitejs/plugin-react';
import { UserConfig, UserConfigExport } from 'vite';
import typescript from '@rollup/plugin-typescript';

export function getBaseViteConfig(dirname: string, override: UserConfig): UserConfigExport {
  const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

  return {
    esbuild: {
      jsxFactory: 'jsx',
      jsxInject: `import { jsx } from 'theme-ui'`,
    },
    build: {
      lib: {
        entry: path.resolve(dirname, 'src/index.tsx'),
        formats: ['es'],
      },
      rollupOptions: {
        external: isExternal,
      },
    },
    plugins: [
      // typescript({
      //   tsconfig: path.resolve(dirname, 'tsconfig.json'),
      // }),
      react({
        jsxImportSource: 'theme-ui',
      }),
    ],
    ...override,
  };
}
