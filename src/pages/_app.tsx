import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { RecoilRoot } from "recoil";
import "../styles/main.css";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getAndroidIsWifi,
  getAndroidPushMessage,
  getiOSIsWifi,
  getiOSPushMessage,
  sendMessage,
} from "../utils/sendMessage";
import { CacheProvider, EmotionCache, Global } from "@emotion/react";
import { createEmotionCache } from "../utils";
import App from "./components";
import reset from "../styles/reset";
import BottomNav from "../components/organisms/BottomNav";
import MainHeader from "../components/organisms/MainHeader";
import MainFab from "../components/organisms/MainFab";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const { library, config } = require("@fortawesome/fontawesome-svg-core");
library.add(fal, far, fas, fad);

declare global {
  interface Window {
    webkit?: any;
    Android: any;
    loginKakaoIOS: any;
    loginAppleIOS: any;
    deviceTokenUpdateToServer: any;
    getNotiData: any;
    isWifi: any;
    Hls: any;
    ChannelIO: any;
    onNotiPush: any;
    success?: boolean;
  }
}
function MyApp(props: MyAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  var target: any = { scrollTop: 0 };
  if (typeof document !== "undefined")
    target = document.querySelector("#__next");
  //#region 1.안드로이드 푸쉬알림 받으면 항상 아래로옴.
  //        2.안드로이드 백그라운드는 실행 안됨. (포그라운드일때만 옴.)
  // const getAndroidPushMessage: any = (event: androidPushEventType) => {
  //   console.debug(event.detail);
  // };

  // useEffect(() => {
  //   // FCM token 서버로 보내기
  //   const Window: any = window;
  //   Window.addEventListener('deviceTokenUpdateToServer', (d: any) => deviceTokenUpdateToServer(d, 'android')); //And
  //   Window.deviceTokenUpdateToServer = (d: any) => deviceTokenUpdateToServer(d, 'ios'); //iOS
  //   // postMessage;
  //   return () => {
  //     Window.removeEventListener('deviceTokenUpdateToServer', (d: any) => deviceTokenUpdateToServer(d, 'android'));
  //   };
  // }, []);
  //#endregion
  const goMessagesPush = (room_id: string, isPush: boolean) => {
    // router.push(`/home?page=${bottomNav.split('/')[1]}&slide=message&id=${room_id}`, `/message/${room_id}&isPush=${isPush}`, {
    //   shallow: false,
    // });
    // setMessageSlide({ open: true });
  };
  const [isWifi, setIsWifi] = useState<boolean>(false);
  // useEffect(() => {
  //   // 처음 앱 킬때마다 서버에 devicetoken fetch
  //   sendMessage({ name: "deviceTokenUpdateToServer", body: "" });
  //   sendMessage({ name: "getNotiData", body: "" });
  //   sendMessage({ name: "isWifi", body: "" });
  //   // 메세지 Noti Message 클릭해서 들어왔는지 체크
  //   window.isWifi = getiOSIsWifi; //iOS
  //   window.getNotiData = (d: any) => getiOSPushMessage(d, goMessagesPush); //iOS

  //   window.addEventListener("getNotiData", (d) =>
  //     getAndroidPushMessage(d, goMessagesPush)
  //   ); //And
  //   window.addEventListener("isWifi", (d) => getAndroidIsWifi(d, setIsWifi)); //And
  //   return () => {
  //     window.removeEventListener("getNotiData", (d) =>
  //       getAndroidPushMessage(d, goMessagesPush)
  //     );
  //     window.removeEventListener("isWifi", (d) =>
  //       getAndroidIsWifi(d, setIsWifi)
  //     );
  //   };
  // }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <title>KAABOOM!</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="keywords"
          content="jellysmack, 젤리스맥, youha, 유하, 펀딩, 크리에이터, 한도조회"
        />
        <meta name="description" content="KAABOOM!" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KAABOOM!" />
        <meta property="og:title" content="KAABOOM!" />
        <meta property="og:description" content="KAABOOM!" />
        {/* <meta property="og:image" content="/images/favicon/share.png" /> */}
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://youha-v6-demo.vercel.app/" />
        <meta name="twitter:card" content="summary" data-react-helmet="true" />
        <meta name="twitter:creator" content="" data-react-helmet="true" />
        <meta
          name="twitter:title"
          content="KAABOOM!"
          data-react-helmet="true"
        />
        <meta
          name="twitter:description"
          content="KAABOOM!"
          data-react-helmet="true"
        />
        {/* <meta name="twitter:image" content="/images/favicon/share.png" /> */}
        <meta name="HandheldFriendly" content="true" />
        <link
          rel="shortcut icon"
          href="/images/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicon/android-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
        <script src="https://js.pusher.com/3.2/pusher.min.js" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap" /> */}
        {/* "Mixed content blocked" when running an HTTP AJAX operation in an HTTPS page */}
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        ></script>
      </Head>
      <RecoilRoot>
        <App>
          <CssBaseline />
          <Global styles={reset} />
          <Component {...pageProps} key={router.route} />
          <BottomNav />
          <MainHeader />
          <MainFab />
        </App>
      </RecoilRoot>
    </CacheProvider>
  );
}

export default MyApp;
