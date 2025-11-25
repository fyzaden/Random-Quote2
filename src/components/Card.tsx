import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};
export default function Card({ children }: CardProps) {
  return (
    <div className='bg-slate-200 p-12 rounded-lg flex flex-col w-[90%] max-w-2xl mx-auto relative'>
      {children}
    </div>
  );
}
