import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
});

addons.setConfig({
  showNav: true,
  showPanel: true,
  theme,
  sidebar: {
    showRoots: true,
  },
});
