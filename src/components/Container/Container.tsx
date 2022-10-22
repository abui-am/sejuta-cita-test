import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

function Container({
  children,
  className,
  ...props
}: PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <div className={clsx('flex justify-center', className)} {...props}>
      <div className="w-full max-w-[1440px] mx-6 sm:mx-10">{children}</div>
    </div>
  );
}

export default Container;
