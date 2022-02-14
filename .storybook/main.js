const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = {
  core: {
    builder: 'storybook-builder-vite',
  },
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
    /*unlock theming for emotion11-based libraries */
    emotionAlias: false,
    /*Storybook no longer provides its own default configuration and is primarily configured via babelrc file, with small, incremental updates from Storybook addons. */
    babelModeV7: true,
  },
  staticDirs: [],
  stories: ['../packages/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true },
    },
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-toolbars',
  ],
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config, opt, test) {
    config.plugins = config.plugins.filter(
      plugin => !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react'))
    );

    config.plugins.push(
      react({
        jsxImportSource: 'theme-ui',
      })
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/react': path.resolve(path.join(__dirname, '../node_modules/@emotion/react')),
      '@emotion/styled': path.resolve(path.join(__dirname, '../node_modules/@emotion/styled')),
      '@emotion/core': path.resolve(path.join(__dirname, '../node_modules/@emotion/react')),
      'emotion-theming': path.resolve(path.join(__dirname, '../node_modules/@emotion/react')),
    };

    config.optimizeDeps.include = [...config.optimizeDeps.include, 'hoist-non-react-statics'];

    return config;
  },
};
