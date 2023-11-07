import { useEffect, useState } from 'react';
import { isIOS } from 'react-device-detect';
import { useWindowDimensions } from './useWindowDimensions';

export const useViewportSize = () => {
  const { windowHeight } = useWindowDimensions();
  const [viewportHeight, setViewportHeight] = useState(windowHeight);
  const [offsetTop, setOffsetTop] = useState(0);
  const [pb, setPb] = useState<string>('var(--saib)');
  const [navPb, setNavPb] = useState<string>('var(--saib)');
  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (!isIOS) {
        return;
      }
      const onResize = () => {
        if (window.visualViewport) {
          setViewportHeight(Math.min(window.visualViewport.height, windowHeight));
          if (window.visualViewport.height !== windowHeight) {
            // setPb(`${Math.max(window.visualViewport.height, windowHeight) - Math.min(window.visualViewport.height, windowHeight)}px`);
            setNavPb('0px');
            setPb('0px');
          } else {
            setPb('var(--saib)');
            setNavPb('var(--saib)');
          }
        }
      };
      const onScroll = () => {
        if (window.visualViewport) {
          setOffsetTop(Math.max(window.visualViewport.offsetTop, 0));
        }
      };
      window.visualViewport?.addEventListener('resize', onResize);
      window.visualViewport?.addEventListener('scroll', onScroll);
      return () => {
        window.visualViewport?.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('scroll', onScroll);
      };
    }, [window]);
  }
  return { viewportHeight, offsetTop, pb, navPb };
};
