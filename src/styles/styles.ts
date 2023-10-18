import { css } from "@emotion/react";

export const forArtistCss = css`
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
::-moz-scrollbar {
    display: none !important;
}
::-webkit-scrollbar {
display: none !important;
}
`

export const forFanCss = css`
html {
    background-color: #141A1F !important;
    /* background-color: #ffffff !important; */
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    text-size-adjust: 100%;
  }
  body {
    /* font-size: 17px;
  line-height: 1.5; */
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #ffffff;
    background-color: #101418 !important;
    scroll-behavior: smooth;
    letter-spacing: 0.15px !important;
    width: 100%;
    min-height: 100%;
    position: relative;
  }
`