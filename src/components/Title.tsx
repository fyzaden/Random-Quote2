import React from 'react';

export enum align {
  left = 'text-left',
  center = 'text-center',
  right = 'text-right',
}

export function Title({
  label,
  align = 'text-center',
  className = '',
}: {
  label: string;
  align?: align | string;
  className?: string;
}) {
  return (
    <h1
      className={`
        h1-serif
        text-3xl 
        md:text-4xl
        font-bold 
        leading-snug 
        text-[var(--text)]
        tracking-wide
        ${align}
        ${className}
      `}
    >
      {label}
    </h1>
  );
}
