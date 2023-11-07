import _ from "lodash";
import { useRouter } from "next/router";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { useState, useCallback, memo } from "react";
import { uploadDrawerState } from "../recoil/modal";
import { scrollToEl } from "../utils";
import { SomeoneProps } from "../types";
import { UserProps } from "../types/user";
export type SlideInputProps = {
  nav?: string;
  stack?: string;
  name?: string;
  title?: string;
  id?: any;
  tab?: number;
  slideTo?: number | string;
  targetUser?: SomeoneProps | null;
  url?: string;
  mode?: string;
  user?: UserProps;
};
export type SlideProps = {
  key: string;
  nav: string;
  stack: string;
  name: string;
  show: boolean;
  title: string;
  index: number;
  id: any;
  tab: number;
  slideTo: string | number;
  targetUser: SomeoneProps | null;
  url?: string;
  mode?: string;
  user?: UserProps;
};
export type NavigationProps = {
  goTo: (item: SlideInputProps) => void;
  goBack: (item: SlideProps) => void;
  closeNav: (item: SlideProps) => void;
  stackTo: (newValue: string, title?: string) => void;
  handleExited: (key: string) => void;
};
interface UseSlideProps {
  navigation: {
    goTo: (item: SlideInputProps) => void;
    goBack: (item: SlideProps) => void;
    closeNav: (item: SlideProps) => void;
    stackTo: (newValue: string, title?: string) => void;
    handleExited: (key: string) => void;
  };
  slides: SlideProps[];
}
const slidesState = atom<SlideProps[]>({
  key: "slidesState",
  default: [],
});
export function useNavigation(): UseSlideProps {
  const router = useRouter();
  // const [slides, setSlides] = useState<SlideProps[]>([]);
  const [slides, setSlides] = useRecoilState(slidesState);
  console.log("%c slides ", "background: #000000; color: #ff0000", slides);
  const setUploadDrawer = useSetRecoilState(uploadDrawerState);
  const goTo = useCallback((item: SlideInputProps) => {
    setSlides((prev) => {
      let slides: SlideProps[] = _.cloneDeep(prev);
      slides = _.filter(slides, (el) => el.show === true);
      let slide: SlideProps = slides[slides.length - 1];
      const nav = item.nav ?? slide.nav;
      const stack = item.stack ?? slide.stack;
      const name = item.name ?? "home";
      const title = item.title ?? "";
      let newSlide: SlideProps = {
        key: `${nav}_${stack}_${name}_${new Date().getTime()}`,
        nav: nav,
        stack: stack,
        name: name,
        title: title,
        show: true,
        index: slides.length,
        id: item.id ?? -1,
        tab: item.tab ?? 0,
        slideTo: item.slideTo ?? -1,
        targetUser: item.targetUser ?? null,
        url: item.url,
        mode: item.mode,
        user: item.user,
      };
      return [...slides, newSlide];
    });
  }, []);
  const stackTo = useCallback((newValue: string, title?: string) => {
    if (newValue === "upload") {
      setUploadDrawer((prev) => {
        return { ...prev, open: true };
      });
    } else {
      setSlides((prev) => {
        let slides: SlideProps[] = _.cloneDeep(prev);
        slides = _.filter(slides, (el) => el.show === true);
        let slide: SlideProps = slides[slides.length - 1];
        let prevSlides: SlideProps[] = _.filter(slides, (el) => el.stack !== newValue);
        let currentSlides: SlideProps[] = _.filter(slides, (el) => el.stack === newValue);
        if (newValue === slide.stack) {
          if (currentSlides.length === 1) {
            scrollToEl(currentSlides[0].key, 0);
            return prev;
          }
          slides = slides.map((el) => {
            return { ...el, show: el.name !== "home" && el.stack === newValue ? false : el.show };
          });
          return slides;
        }
        if (currentSlides.length === 0) {
          let newSlide: SlideProps = {
            key: `main_${newValue}_home_${new Date().getTime()}`,
            nav: "main",
            stack: newValue,
            name: "home",
            title: title ? title : "",
            show: true,
            index: 0,
            id: -1,
            tab: 0,
            slideTo: -1,
            targetUser: null,
          };
          slides = [...prevSlides, newSlide];
          return slides;
        }
        return [...prevSlides, ...currentSlides];
      });
    }
  }, []);
  const goBack = useCallback((item: SlideProps) => {
    if (item.index === 0) {
      setSlides((prev) => {
        if (prev.length === 1) {
          // router.push('auth');
          return prev;
        } //앱 종료
        let slides: SlideProps[] = _.cloneDeep(prev);
        slides = _.filter(slides, (el) => el.key !== item.key);
        let targetSlide = slides[slides.length - 1];
        let targetStack = targetSlide.stack;
        let prevSlides: SlideProps[] = _.filter(slides, (el) => el.stack !== targetStack);
        let currentSlides: SlideProps[] = _.filter(slides, (el) => el.stack === targetStack);
        return [...prevSlides, ...currentSlides];
      });
      return;
    }
    setSlides((prev) => {
      let slides: SlideProps[] = _.cloneDeep(prev);
      let slide: SlideProps | undefined = _.findLast(slides, { key: item.key });
      if (slide !== undefined) slide.show = false;
      return slides;
    });
  }, []);
  const handleExited = useCallback((key: string) => {
    setSlides((prev) => {
      let slides: SlideProps[] = _.cloneDeep(prev);
      slides = _.filter(slides, (el) => el.key !== key);
      return slides;
    });
  }, []);
  const closeNav = useCallback((item: SlideProps) => {
    setSlides((prev) => {
      let slides: SlideProps[] = _.cloneDeep(prev);
      slides = _.filter(slides, (el) => el.show === true);
      slides = slides.map((el) => {
        return { ...el, show: el.nav === item.nav ? false : el.show };
      });
      return slides;
    });
  }, []);
  const navigation = {
    goTo: goTo,
    goBack: goBack,
    closeNav: closeNav,
    stackTo: stackTo,
    handleExited: handleExited,
  };
  return { navigation, slides };
}
