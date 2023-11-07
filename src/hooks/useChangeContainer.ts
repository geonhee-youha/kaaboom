import { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";
import { SlideProps } from "./useNavigation";
import { useWindowDimensions } from "./useWindowDimensions";

export function useChangeContainer(item: SlideProps, triggers: any[]) {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  let innerEl: any = document.querySelector(`.Inner.${item.key}`);
  let containerEl: any = document.querySelector(`.Container.${item.key}`);
  useEffect(() => {
    let containerHeight = containerEl ? containerEl.offsetHeight : 0;
    let innerHeight = containerEl ? innerEl.scrollHeight : 0;
    setContainerHeight(containerHeight);
    setInnerHeight(innerHeight);
  }, [triggers]);
  return {
    containerHeight,
    innerHeight,
  };
}

export function changeViewport(item: SlideProps, heights: { containerHeight: number; innerHeight: number }) {
  let innerEl: any = document.querySelector(`.Inner.${item.key}`);
  let containerEl: any = document.querySelector(`.Container.${item.key}`);
  let testEl: any = document.querySelector(`.Test.${item.key}`);
  if (innerEl) {
    // (isIOS ? Math.min(window.visualViewport.height, windowHeight) : windowHeight) - topInset - bottomInset - 48 - 56;
    // let containerHeight = containerEl.offsetHeight
    if (testEl) testEl.textContent = `${heights.innerHeight} ${heights.containerHeight}`;
    if (heights.innerHeight >= heights.containerHeight) {
      containerEl.style.position = "relative";
      containerEl.style.top = "initial";
      containerEl.style.left = "initial";
      containerEl.style.height = "100%";
      containerEl.style.right = "initial";
      containerEl.style.zIndex = "initial";
      containerEl.style.overflowY = "scroll";
      containerEl.style.touchAction = "initial";
    } else {
      containerEl.style.position = "absolute";
      containerEl.style.top = "0";
      containerEl.style.left = "0";
      // containerEl.style.bottom = "0";
      containerEl.style.right = "0";
      containerEl.style.zIndex = "2";
      containerEl.style.overflowY = "visible";
      containerEl.style.touchAction = "none";
    }
  }
}
