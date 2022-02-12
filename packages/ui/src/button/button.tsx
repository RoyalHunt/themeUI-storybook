import * as React from 'react';
import { Button as InternalButton, ButtonProps } from 'theme-ui';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button {...rest} sx={{ backgroundColor: 'red', padding: '20px 40px' }}>
    {children}
  </button>
);

export default Button;
