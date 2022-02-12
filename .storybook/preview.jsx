import React, { useEffect, useState } from 'react';
import { withLinks } from '@storybook/addon-links';

export const parameters = {
  options: {
    storySort: (a, b) =>
      a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
  },
};



export const decorators = [ withLinks];
