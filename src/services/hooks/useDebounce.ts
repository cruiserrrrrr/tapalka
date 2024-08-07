import { useRef } from 'react';

export const useDebounce = (func: (...args: any) => any, delay: number) => {
  const ref = useRef<number | undefined>(undefined);

  return (...args: any[]) => {
    clearTimeout(ref.current as number);
    ref.current = setTimeout(() => func(...args), delay) as unknown as number;
  };
}