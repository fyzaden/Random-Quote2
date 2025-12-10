import React from 'react';

export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        card-paper
        w-full
        p-8 
        rounded-2xl 
        shadow-lg 
        border 
        border-[var(--border)]
        bg-[var(--card-bg)]
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
