import path from 'path';

import { UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const args = process.argv.slice(2);
const analyze = args.includes('--analyze');

export function getBaseViteConfig(dirname: string, override?: UserConfigExport): UserConfigExport {
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
        ...(analyze && { plugins: [visualizer({ template: 'treemap' })] }),
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    ...override,
  };
}
