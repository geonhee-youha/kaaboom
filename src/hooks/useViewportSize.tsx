import { useEffect, useState } from 'react';
import { isIOS } from 'react-device-detect';
import { useWindowDimensions } from './useWindowDimensions';

export const useViewportSize = () => {
  const { windowHeight } = useWindowDimensions();
  const [viewportHeight, setViewportHeight] = useState(windowHeight);
  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    if (!isIOS) {
      return;
    }
    const onResize = () => {
      if (window.visualViewport) {
        setViewportHeight(Math.min(window.visualViewport.height, windowHeight));
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
  }, []);
  return { viewportHeight, offsetTop };
};
