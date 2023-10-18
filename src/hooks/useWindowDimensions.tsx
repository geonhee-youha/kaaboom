import { useState, useEffect } from 'react';
import { isIOS } from 'react-device-detect';
import { throttle } from 'lodash';

function getWindowDimensions() {
  if (isIOS) {
    const { outerWidth: windowWidth, outerHeight: windowHeight } = window;
    const horizontal = windowWidth > windowHeight;
    return {
      windowWidth,
      windowHeight,
      horizontal,
    };
  } else {
    // const { availWidth: windowWidth, } = window.screen;
    // const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    // const { outerWidth: windowWidth, outerHeight: windowHeight } = window;
    // const { clientHeight: clientHeight } = document.body;ƒ
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const horizontal = windowWidth > windowHeight;

    return {
      windowWidth,
      windowHeight,
      horizontal,
    };
  }
  // const { outerWidth: windowWidth, outerHeight: windowHeight } = window;
  // const horizontal = windowWidth > windowHeight;
  // return {
  //   windowWidth,
  //   windowHeight,
  //   horizontal,
  // };
}
export function useWindowDimensions() {
  if (typeof window !== 'undefined') {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    var topInset,
      bottomInset,
      leftInset,
      rightInset,
      computed,
      div = document.createElement('div');
    div.style.padding = 'var(--sait) var(--sair) var(--saib) var(--sail)';
    document.body.appendChild(div);
    computed = getComputedStyle(div);
    topInset = parseInt(computed.paddingTop) || 0;
    bottomInset = parseInt(computed.paddingBottom) || 0;
    leftInset = parseInt(computed.paddingLeft) || 0;
    rightInset = parseInt(computed.paddingRight) || 0;
    document.body.removeChild(div);
    useEffect(() => {
      const handleResize = throttle(() => {
        setWindowDimensions(getWindowDimensions());
      }, 20);
      window.addEventListener('orientationchange', handleResize);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('orientationchange', handleResize);
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return { ...windowDimensions, topInset, bottomInset, leftInset, rightInset };
  } else {
    var windowDimensions = {
      windowWidth: 0,
      windowHeight: 0,
      horizontal: false,
    };
    let topInset = 0;
    let bottomInset = 0;
    let leftInset = 0;
    let rightInset = 0;
    return { ...windowDimensions, topInset, bottomInset, leftInset, rightInset };
  }
}
