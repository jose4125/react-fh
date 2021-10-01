import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

const Button = ({
  children,
  type,
  className,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
