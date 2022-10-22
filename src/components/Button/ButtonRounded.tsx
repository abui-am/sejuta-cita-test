import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

function ButtonRounded({
  children,
  color = 'default',
  className,
  ...props
}: PropsWithChildren<
  { color?: 'primary' | 'default' } & JSX.IntrinsicElements['button']
>) {
  return (
    <button
      type="button"
      className={clsx(
        'w-8 h-8 sm:w-5 sm:h-5 rounded-lg flex items-center justify-center text-sm sm:text-xs disabled:cursor-default',
        className,

        color === 'primary' && 'bg-primary text-white',
        color === 'default' &&
          'hover:bg-primary hover:text-white disabled:bg-transparent border',
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonRounded;
