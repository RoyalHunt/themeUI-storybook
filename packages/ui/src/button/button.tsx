import * as React from 'react';
import { ButtonProps } from 'theme-ui';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button
    type="button"
    // @ts-ignore
    sx={{ backgroundColor: 'red', padding: '20px 40px' }}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
