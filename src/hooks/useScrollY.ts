import { SlideProps } from './useNavigation';
import { useEffect, useState } from 'react';
export function useScrollY(item: SlideProps) {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    let targetEl: any = document.querySelector(`.Container.${item.key}`);
    const listener = (e: any) => {
      var scrollY = targetEl.scrollTop;
      setScrollY(scrollY);
    };
    targetEl && targetEl.addEventListener('scroll', listener);
    () => {
      targetEl && targetEl.removeEventListener('scroll', listener);
    };
  }, [item]);
  return {
    scrollY,
  };
}
